"use client";

import {
  updateOrderDiscount,
  updateOrderItemDiscount,
  updateOrderItemQuantity,
} from "@/actions/admin";
import type { UserOrder } from "@/actions/admin";
import { PackageIcon } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";

import { OptimizedImage } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { EditablePrice } from "./editable-price";
import { EditableQuantity } from "./editable-quantity";

interface OrderDetailDialogProps {
  order: UserOrder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface EditedItem {
  quantity: number;
  discount: number;
}

export function OrderDetailDialog({
  order,
  open,
  onOpenChange,
}: OrderDetailDialogProps) {
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

  if (!order) return null;

  // Calculate display values from edited state
  const subtotal = order.ordered_products.reduce((sum, item) => {
    const edited = editedItems[item.id];
    const qty = edited?.quantity ?? item.quantity;
    return sum + item.price * qty;
  }, 0);

  const totalDiscount = order.ordered_products.reduce((sum, item) => {
    const edited = editedItems[item.id];
    return sum + (edited?.discount ?? item.discount);
  }, 0);

  const calculatedTotal = Math.max(
    0,
    subtotal + order.shipping_fee - totalDiscount,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col gap-0 p-0 sm:max-w-lg">
        {/* Fixed Header */}
        <DialogHeader className="shrink-0 border-b px-4 py-3">
          <DialogTitle className="text-base">Order Details</DialogTitle>
          <p className="font-mono text-xs text-neutral-400">#{order.id}</p>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Order Items */}
          <div className="divide-y">
            {order.ordered_products.map((item) => {
              const edited = editedItems[item.id];
              const qty = edited?.quantity ?? item.quantity;
              const discount = edited?.discount ?? item.discount;
              const itemTotal = item.price * qty;
              const itemFinal = itemTotal - discount;

              return (
                <div key={item.id} className="flex gap-3 px-4 py-3">
                  {/* Product Image */}
                  {item.product.image_urls[0] ? (
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                      <OptimizedImage
                        src={item.product.image_urls[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-neutral-100">
                      <PackageIcon className="size-5 text-neutral-400" />
                    </div>
                  )}

                  {/* Product Info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-neutral-900">
                      {item.product.name}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
                      <span>₹{item.price.toLocaleString("en-IN")} ×</span>
                      <EditableQuantity
                        quantity={qty}
                        onChange={(newQty) =>
                          handleItemQuantityChange(item.id, newQty)
                        }
                        disabled={isPending}
                      />
                    </div>
                    <EditablePrice
                      label="Discount:"
                      price={discount}
                      onChange={(newDiscount) =>
                        handleItemDiscountChange(item.id, newDiscount)
                      }
                      className="mt-1"
                      disabled={isPending}
                    />
                  </div>

                  {/* Item Total */}
                  <div className="shrink-0 text-right">
                    {discount > 0 && (
                      <p className="text-xs text-neutral-400 line-through">
                        ₹{itemTotal.toLocaleString("en-IN")}
                      </p>
                    )}
                    <p className="text-sm font-semibold text-neutral-900">
                      ₹{itemFinal.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="border-t bg-neutral-50 px-4 py-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-500">Shipping</span>
                <span>₹{order.shipping_fee.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Total Discount</span>
                <EditablePrice
                  price={totalDiscount}
                  onChange={handleTotalDiscountChange}
                  disabled={isPending}
                />
              </div>

              <div className="flex justify-between border-t border-neutral-200 pt-1.5">
                <span className="font-semibold text-neutral-900">Total</span>
                <span className="text-primary text-base font-bold">
                  ₹{calculatedTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div
            className="border-t px-4 py-2 text-xs text-neutral-400"
            suppressHydrationWarning
          >
            Created:{" "}
            {new Date(order.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        {/* Footer with Done and Cancel Buttons */}
        <div className="shrink-0 border-t bg-white px-4 py-3">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
              size="lg"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1"
              size="lg"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Done"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
