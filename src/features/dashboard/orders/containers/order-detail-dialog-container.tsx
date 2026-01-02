"use client";

import {
  updateOrderDiscount,
  updateOrderItemDiscount,
  updateOrderItemQuantity,
} from "@/data/admin/orders/gateway/server";
import { useCallback, useEffect, useState, useTransition } from "react";

import { formatCreatedAt } from "@/lib/date";

import { OrderDetailDialog } from "../components/order-detail-dialog";
import type {
  EditedItem,
  OrderData,
  OrderDetailDialogContainerProps,
  OrderItemViewModel,
  OrderViewModel,
} from "../types";

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

      // Calculate current values
      const subtotal = order.ordered_products.reduce((sum, item) => {
        const edited = editedItems[item.id];
        const qty = edited?.quantity ?? item.quantity;
        return sum + item.price * qty;
      }, 0);

      const currentTotalDiscount = order.ordered_products.reduce(
        (sum, item) => {
          const edited = editedItems[item.id];
          return sum + (edited?.discount ?? item.discount);
        },
        0,
      );

      const delta = newTotalDiscount - currentTotalDiscount;
      if (delta === 0) return;

      // Distribute delta proportionally
      let distributed = 0;
      const newEditedItems = { ...editedItems };

      order.ordered_products.forEach((item, index) => {
        const edited = editedItems[item.id];
        const qty = edited?.quantity ?? item.quantity;
        const currentDiscount = edited?.discount ?? item.discount;
        const itemTotal = item.price * qty;

        const proportion =
          subtotal > 0
            ? itemTotal / subtotal
            : 1 / order.ordered_products.length;
        let itemDelta: number;

        if (index === order.ordered_products.length - 1) {
          itemDelta = delta - distributed;
        } else {
          itemDelta = Math.round(delta * proportion);
          distributed += itemDelta;
        }

        const newDiscount = Math.max(
          0,
          Math.min(itemTotal, currentDiscount + itemDelta),
        );

        newEditedItems[item.id] = {
          ...newEditedItems[item.id],
          discount: newDiscount,
        };
      });

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
    ? buildViewModel(order, editedItems, isPending)
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

function buildViewModel(
  order: OrderData,
  editedItems: Record<number, EditedItem>,
  isPending: boolean,
): OrderViewModel {
  const items: OrderItemViewModel[] = order.ordered_products.map((item) => {
    const edited = editedItems[item.id];
    const qty = edited?.quantity ?? item.quantity;
    const discount = edited?.discount ?? item.discount;
    const itemTotal = item.price * qty;
    const itemFinal = itemTotal - discount;

    return {
      id: item.id,
      productName: item.product.name,
      productImage: item.product.image_urls[0] || null,
      unitPrice: item.price,
      quantity: qty,
      discount,
      itemTotal,
      itemFinal,
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
  const totalDiscount = items.reduce((sum, item) => sum + item.discount, 0);
  const calculatedTotal = Math.max(
    0,
    subtotal + order.shipping_fee - totalDiscount,
  );

  return {
    id: order.id,
    formattedCreatedAt: formatCreatedAt(order.created_at),
    items,
    subtotal,
    shippingFee: order.shipping_fee,
    totalDiscount,
    calculatedTotal,
    isPending,
  };
}
