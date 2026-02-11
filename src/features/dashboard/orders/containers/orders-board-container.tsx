"use client";

import { updateOrderStatus } from "@/data/admin/orders/gateway/server";
import { useKanbanOptimisticBoard } from "@/hooks";
import { useCallback } from "react";

import { getOrderStatusColor } from "@/lib/status-utils";

import { OrderStatus } from "@/graphql/generated/types";
import type { AdminUserOrder } from "@/graphql/generated/types";

import { OrdersBoard } from "../components/orders-board";
import type { OrdersBoardContainerProps } from "../types";

const ORDER_COLUMNS: { id: OrderStatus; title: string }[] = [
  { id: OrderStatus.Pending, title: "Pending" },
  { id: OrderStatus.Processing, title: "Approved" },
  { id: OrderStatus.Paid, title: "Paid" },
  { id: OrderStatus.Shipped, title: "Shipped" },
  { id: OrderStatus.Delivered, title: "Delivered" },
  { id: OrderStatus.Cancelled, title: "Cancelled" },
];

export function OrdersBoardContainer({ orders }: OrdersBoardContainerProps) {
  const handleUpdateStatus = useCallback(
    async (orderId: string, status: OrderStatus) => {
      return updateOrderStatus(orderId, status);
    },
    [],
  );

  const {
    columns,
    selectedItem: selectedOrder,
    dialogOpen,
    handleMove,
    handleCardClick,
    handleDialogOpenChange,
  } = useKanbanOptimisticBoard({
    items: orders,
    columns: ORDER_COLUMNS,
    getItemId: (order) => order.id,
    getItemStatus: (order) => order.status,
    getStatusColor: getOrderStatusColor,
    updateStatus: handleUpdateStatus,
  });

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
