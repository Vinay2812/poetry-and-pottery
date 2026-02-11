"use client";

import {
  updateOrderDiscount,
  updateOrderItemDiscount,
  updateOrderItemQuantity,
} from "@/data/admin/orders/gateway/server";
import { useCallback, useEffect, useState, useTransition } from "react";

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

export function OrderDetailDialogContainer({
  order,
  open,
  onOpenChange,
}: OrderDetailDialogContainerProps) {
  const [isPending, startTransition] = useTransition();
  const [editedItems, setEditedItems] = useState<Record<number, EditedItem>>(
    {},
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
      // Save all changed items
      for (const item of order.ordered_products) {
        const edited = editedItems[item.id];
        if (!edited) continue;

        // Check if quantity changed
        if (edited.quantity !== item.quantity) {
          await updateOrderItemQuantity(item.id, edited.quantity);
        }

        // Check if discount changed
        if (edited.discount !== item.discount) {
          await updateOrderItemDiscount(item.id, edited.discount);
        }
      }

      // Calculate and save the final total discount
      const finalTotalDiscount = order.ordered_products.reduce((sum, item) => {
        const edited = editedItems[item.id];
        return sum + (edited?.discount ?? item.discount);
      }, 0);

      // Update order totals via the discount action (it recalculates everything)
      await updateOrderDiscount(order.id, finalTotalDiscount);

      onOpenChange(false);
    });
  }, [order, editedItems, onOpenChange]);

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
      onOpenChange={onOpenChange}
      onItemQuantityChange={handleItemQuantityChange}
      onItemDiscountChange={handleItemDiscountChange}
      onTotalDiscountChange={handleTotalDiscountChange}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
