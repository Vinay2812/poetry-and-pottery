"use client";

import { useKanbanOptimisticBoard } from "@/hooks";
import { useCallback } from "react";

import { getOrderStatusColor } from "@/lib/status-utils";

import { useAdminUpdateOrderStatusMutation } from "@/graphql/generated/graphql";
import { OrderStatus } from "@/graphql/generated/types";

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
  const [updateOrderStatusMutation] = useAdminUpdateOrderStatusMutation();

  const handleUpdateStatus = useCallback(
    async (orderId: string, status: OrderStatus) => {
      try {
        const { data } = await updateOrderStatusMutation({
          variables: { orderId, status },
        });
        return data?.adminUpdateOrderStatus ?? { success: false, error: null };
      } catch (error) {
        console.error("Failed to update order status:", error);
        return { success: false, error: "Failed to update order status" };
      }
    },
    [updateOrderStatusMutation],
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
