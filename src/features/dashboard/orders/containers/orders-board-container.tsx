"use client";

import { updateOrderStatus } from "@/data/admin/orders/gateway/server";
import { OrderStatus } from "@/prisma/generated/enums";
import {
  useCallback,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";

import type { KanbanColumn } from "@/components/dashboard/kanban-board";

import { getOrderStatusColor } from "@/lib/status-utils";

import type { AdminUserOrder } from "@/graphql/generated/types";

import { OrdersBoard } from "../components/orders-board";
import type { OrdersBoardContainerProps } from "../types";

// Define the columns for order status
const ORDER_COLUMNS: { id: OrderStatus; title: string }[] = [
  { id: OrderStatus.PENDING, title: "Pending" },
  { id: OrderStatus.PROCESSING, title: "Approved" },
  { id: OrderStatus.PAID, title: "Paid" },
  { id: OrderStatus.SHIPPED, title: "Shipped" },
  { id: OrderStatus.DELIVERED, title: "Delivered" },
  { id: OrderStatus.CANCELLED, title: "Cancelled" },
];

export function OrdersBoardContainer({ orders }: OrdersBoardContainerProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticOrders, setOptimisticOrders] = useOptimistic(orders);
  const [selectedOrder, setSelectedOrder] = useState<AdminUserOrder | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

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

      // Optimistic update
      startTransition(async () => {
        setOptimisticOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order,
          ),
        );

        const result = await updateOrderStatus(orderId, newStatus);

        if (!result.success) {
          console.error("Failed to update order status:", result.error);
          // The page will revalidate and show the correct state
        }
      });
    },
    [setOptimisticOrders],
  );

  return (
    <OrdersBoard
      columns={columns}
      isLoading={isPending}
      selectedOrder={selectedOrder}
      dialogOpen={dialogOpen}
      onMove={handleMove}
      onCardClick={handleCardClick}
      onDialogOpenChange={handleDialogOpenChange}
    />
  );
}
