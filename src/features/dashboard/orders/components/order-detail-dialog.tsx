"use client";

import { PackageIcon } from "lucide-react";
import Image from "next/image";

import { EditablePrice } from "@/components/dashboard/editable-price";
import { EditableQuantity } from "@/components/dashboard/editable-quantity";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { OrderDetailDialogProps } from "../types";

export function OrderDetailDialog({
  open,
  viewModel,
  onOpenChange,
  onItemQuantityChange,
  onItemDiscountChange,
  onTotalDiscountChange,
  onSave,
  onCancel,
}: OrderDetailDialogProps) {
  if (!viewModel) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col gap-0 p-0 sm:max-w-lg">
        {/* Fixed Header */}
        <DialogHeader className="shrink-0 border-b px-4 py-3">
          <DialogTitle className="text-base">Order Details</DialogTitle>
          <p className="font-mono text-xs text-neutral-400">#{viewModel.id}</p>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Order Items */}
          <div className="divide-y">
            {viewModel.items.map((item) => (
              <div key={item.id} className="flex gap-3 px-4 py-3">
                {/* Product Image */}
                {item.productImage ? (
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                    <Image
                      src={item.productImage}
                      alt={item.productName}
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
                    {item.productName}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
                    <span>₹{item.unitPrice.toLocaleString("en-IN")} ×</span>
                    <EditableQuantity
                      quantity={item.quantity}
                      onChange={(newQty) =>
                        onItemQuantityChange(item.id, newQty)
                      }
                      disabled={viewModel.isPending}
                    />
                  </div>
                  <EditablePrice
                    label="Discount:"
                    price={item.discount}
                    onChange={(newDiscount) =>
                      onItemDiscountChange(item.id, newDiscount)
                    }
                    className="mt-1"
                    disabled={viewModel.isPending}
                  />
                </div>

                {/* Item Total */}
                <div className="shrink-0 text-right">
                  {item.discount > 0 && (
                    <p className="text-xs text-neutral-400 line-through">
                      ₹{item.itemTotal.toLocaleString("en-IN")}
                    </p>
                  )}
                  <p className="text-sm font-semibold text-neutral-900">
                    ₹{item.itemFinal.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border-t bg-neutral-50 px-4 py-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Subtotal</span>
                <span>₹{viewModel.subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-500">Shipping</span>
                <span>₹{viewModel.shippingFee.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Total Discount</span>
                <EditablePrice
                  price={viewModel.totalDiscount}
                  onChange={onTotalDiscountChange}
                  disabled={viewModel.isPending}
                />
              </div>

              <div className="flex justify-between border-t border-neutral-200 pt-1.5">
                <span className="font-semibold text-neutral-900">Total</span>
                <span className="text-primary text-base font-bold">
                  ₹{viewModel.calculatedTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div
            className="border-t px-4 py-2 text-xs text-neutral-400"
            suppressHydrationWarning
          >
            Created: {viewModel.formattedCreatedAt}
          </div>
        </div>

        {/* Footer with Done and Cancel Buttons */}
        <div className="shrink-0 border-t bg-white px-4 py-3">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1"
              size="lg"
              disabled={viewModel.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={onSave}
              className="flex-1"
              size="lg"
              disabled={viewModel.isPending}
            >
              {viewModel.isPending ? "Saving..." : "Done"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
