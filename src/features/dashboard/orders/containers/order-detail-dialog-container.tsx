"use client";

import { useUIStore } from "@/store/ui.store";
import { useCallback, useEffect, useState, useTransition } from "react";

import { getOrderStatusOptions } from "@/lib/status-utils";

import {
  useAdminUpdateOrderDiscountMutation,
  useAdminUpdateOrderItemDiscountMutation,
  useAdminUpdateOrderItemQuantityMutation,
  useAdminUpdateOrderStatusMutation,
} from "@/graphql/generated/graphql";

import { OrderDetailDialog } from "../components/order-detail-dialog";
import type {
  EditedItem,
  OrderDetailDialogContainerProps,
  OrderViewModel,
} from "../types";
import {
  buildOrderDetailViewModel,
  distributeDiscount,
} from "../utils/order-calculations";

const ORDER_STATUS_OPTIONS = getOrderStatusOptions();

export function OrderDetailDialogContainer({
  order,
  open,
  onOpenChange,
  onStatusChanged,
}: OrderDetailDialogContainerProps) {
  const { addToast } = useUIStore();
  const [isPending, startTransition] = useTransition();
  const [updateOrderDiscountMutation] = useAdminUpdateOrderDiscountMutation();
  const [updateOrderItemDiscountMutation] =
    useAdminUpdateOrderItemDiscountMutation();
  const [updateOrderItemQuantityMutation] =
    useAdminUpdateOrderItemQuantityMutation();
  const [updateOrderStatusMutation] = useAdminUpdateOrderStatusMutation();
  const [editedItems, setEditedItems] = useState<Record<number, EditedItem>>(
    {},
  );
  const [status, setStatus] = useState<string>(order?.status ?? "");
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);

  // Keep the local status in sync when a different order is opened.
  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  const handleStatusChange = useCallback(
    async (nextStatus: string) => {
      if (!order || nextStatus === status) return;

      const previousStatus = status;
      setStatus(nextStatus);
      setIsStatusUpdating(true);
      try {
        const { data } = await updateOrderStatusMutation({
          variables: { orderId: order.id, status: nextStatus },
        });
        if (data?.adminUpdateOrderStatus?.success) {
          onStatusChanged(order.id, nextStatus);
          addToast({ type: "success", message: "Order status updated." });
        } else {
          setStatus(previousStatus);
          addToast({
            type: "error",
            message:
              data?.adminUpdateOrderStatus?.error ||
              "Failed to update order status.",
          });
        }
      } catch {
        setStatus(previousStatus);
        addToast({
          type: "error",
          message: "Something went wrong. Please try again.",
        });
      } finally {
        setIsStatusUpdating(false);
      }
    },
    [order, status, updateOrderStatusMutation, onStatusChanged, addToast],
  );

  // Initialize edited items when order changes
  useEffect(() => {
    if (order) {
      startTransition(() => {
        const initial: Record<number, EditedItem> = {};
        order.ordered_products.forEach((item) => {
          initial[item.id] = {
            quantity: item.quantity,
            discount: item.discount,
          };
        });
        setEditedItems(initial);
      });
    }
  }, [order]);

  const handleItemQuantityChange = useCallback(
    (itemId: number, qty: number) => {
      setEditedItems((prev) => ({
        ...prev,
        [itemId]: { ...prev[itemId], quantity: qty },
      }));
    },
    [],
  );

  const handleItemDiscountChange = useCallback(
    (itemId: number, discount: number) => {
      setEditedItems((prev) => ({
        ...prev,
        [itemId]: { ...prev[itemId], discount },
      }));
    },
    [],
  );

  const handleTotalDiscountChange = useCallback(
    (newTotalDiscount: number) => {
      if (!order) return;

      const newEditedItems = distributeDiscount(
        order,
        editedItems,
        newTotalDiscount,
      );

      setEditedItems(newEditedItems);
    },
    [order, editedItems],
  );

  const handleSave = useCallback(async () => {
    if (!order) return;

    startTransition(async () => {
      try {
        // Save all changed items
        for (const item of order.ordered_products) {
          const edited = editedItems[item.id];
          if (!edited) continue;

          // Check if quantity changed
          if (edited.quantity !== item.quantity) {
            await updateOrderItemQuantityMutation({
              variables: {
                itemId: item.id,
                quantity: edited.quantity,
              },
            });
          }

          // Check if discount changed
          if (edited.discount !== item.discount) {
            await updateOrderItemDiscountMutation({
              variables: {
                itemId: item.id,
                discount: edited.discount,
              },
            });
          }
        }

        // Calculate and save the final total discount
        const finalTotalDiscount = order.ordered_products.reduce(
          (sum, item) => {
            const edited = editedItems[item.id];
            return sum + (edited?.discount ?? item.discount);
          },
          0,
        );

        // Update order totals via the discount action (it recalculates everything)
        await updateOrderDiscountMutation({
          variables: { orderId: order.id, discount: finalTotalDiscount },
        });

        onOpenChange(false);
      } catch (error) {
        console.error("Failed to update order:", error);
      }
    });
  }, [
    editedItems,
    onOpenChange,
    order,
    updateOrderDiscountMutation,
    updateOrderItemDiscountMutation,
    updateOrderItemQuantityMutation,
  ]);

  const handleCancel = useCallback(() => {
    // Reset to original values
    if (order) {
      const initial: Record<number, EditedItem> = {};
      order.ordered_products.forEach((item) => {
        initial[item.id] = {
          quantity: item.quantity,
          discount: item.discount,
        };
      });
      setEditedItems(initial);
    }
    onOpenChange(false);
  }, [order, onOpenChange]);

  // Build view model from state
  const viewModel: OrderViewModel | null = order
    ? buildOrderDetailViewModel(order, editedItems, isPending)
    : null;

  return (
    <OrderDetailDialog
      open={open}
      viewModel={viewModel}
      statusValue={status}
      statusOptions={ORDER_STATUS_OPTIONS}
      isStatusUpdating={isStatusUpdating}
      onStatusChange={handleStatusChange}
      onOpenChange={onOpenChange}
      onItemQuantityChange={handleItemQuantityChange}
      onItemDiscountChange={handleItemDiscountChange}
      onTotalDiscountChange={handleTotalDiscountChange}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
