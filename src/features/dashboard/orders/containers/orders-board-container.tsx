"use client";

import { updateOrderStatus } from "@/data/admin/orders/gateway/server";
import {
  useCallback,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";

import type { KanbanColumn } from "@/components/dashboard/kanban-board";

import { getOrderStatusColor } from "@/lib/status-utils";

import { OrderStatus } from "@/graphql/generated/types";
import type { AdminUserOrder } from "@/graphql/generated/types";

import { OrdersBoard } from "../components/orders-board";
import type { OrdersBoardContainerProps } from "../types";

// Define the columns for order status
const ORDER_COLUMNS: { id: OrderStatus; title: string }[] = [
  { id: OrderStatus.Pending, title: "Pending" },
  { id: OrderStatus.Processing, title: "Approved" },
  { id: OrderStatus.Paid, title: "Paid" },
  { id: OrderStatus.Shipped, title: "Shipped" },
  { id: OrderStatus.Delivered, title: "Delivered" },
  { id: OrderStatus.Cancelled, title: "Cancelled" },
];

type OrdersOptimisticAction = {
  type: "status";
  orderId: string;
  status: OrderStatus;
};

function applyOrdersOptimisticAction(
  state: AdminUserOrder[],
  action: OrdersOptimisticAction,
) {
  switch (action.type) {
    case "status":
      return state.map((order) =>
        order.id === action.orderId
          ? { ...order, status: action.status }
          : order,
      );
    default:
      return state;
  }
}

export function OrdersBoardContainer({ orders }: OrdersBoardContainerProps) {
  const [, startTransition] = useTransition();
  const [ordersState, setOrdersState] = useState(orders);
  const [optimisticOrders, setOptimisticOrders] = useOptimistic(
    ordersState,
    (state: AdminUserOrder[], action: OrdersOptimisticAction) =>
      applyOrdersOptimisticAction(state, action),
  );
  const [selectedOrder, setSelectedOrder] = useState<AdminUserOrder | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setOrdersState(orders);
  }, [orders]);

  const columns = useMemo((): KanbanColumn<AdminUserOrder>[] => {
    return ORDER_COLUMNS.map((col) => ({
      id: col.id,
      title: col.title,
      items: optimisticOrders.filter((order) => order.status === col.id),
      colorClass: getOrderStatusColor(col.id),
    }));
  }, [optimisticOrders]);

  const handleCardClick = useCallback((order: AdminUserOrder) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  }, []);

  const handleDialogOpenChange = useCallback((open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedOrder(null);
    }
  }, []);

  const handleMove = useCallback(
    async (orderId: string, fromColumn: string, toColumn: string) => {
      const newStatus = toColumn as OrderStatus;
      const optimisticAction: OrdersOptimisticAction = {
        type: "status",
        orderId,
        status: newStatus,
      };

      // Optimistic update (instant UI)
      setOptimisticOrders(optimisticAction);

      startTransition(async () => {
        try {
          const result = await updateOrderStatus(orderId, newStatus);

          if (!result.success) {
            console.error("Failed to update order status:", result.error);
            setOptimisticOrders({
              type: "status",
              orderId,
              status: fromColumn as OrderStatus,
            });
            setOrdersState((prev) =>
              applyOrdersOptimisticAction(prev, {
                type: "status",
                orderId,
                status: fromColumn as OrderStatus,
              }),
            );
            return;
          }

          setOrdersState((prev) =>
            applyOrdersOptimisticAction(prev, optimisticAction),
          );
        } catch (error) {
          console.error("Failed to update order status:", error);
          setOptimisticOrders({
            type: "status",
            orderId,
            status: fromColumn as OrderStatus,
          });
          setOrdersState((prev) =>
            applyOrdersOptimisticAction(prev, {
              type: "status",
              orderId,
              status: fromColumn as OrderStatus,
            }),
          );
        }
      });
    },
    [setOptimisticOrders, startTransition],
  );

  return (
    <OrdersBoard
      columns={columns}
      isLoading={false}
      selectedOrder={selectedOrder}
      dialogOpen={dialogOpen}
      onMove={handleMove}
      onCardClick={handleCardClick}
      onDialogOpenChange={handleDialogOpenChange}
    />
  );
}
