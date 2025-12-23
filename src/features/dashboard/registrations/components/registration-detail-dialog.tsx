"use client";

import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  TagIcon,
  UsersIcon,
} from "lucide-react";

import { EditableNumber } from "@/components/dashboard/editable-number";
import { EditablePrice } from "@/components/dashboard/editable-price";
import { OptimizedImage } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { RegistrationDetailDialogProps } from "../types";

export function RegistrationDetailDialog({
  open,
  viewModel,
  onOpenChange,
  onPriceChange,
  onDiscountChange,
  onSeatsChange,
  onSave,
  onCancel,
}: RegistrationDetailDialogProps) {
  if (!viewModel) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col gap-0 p-0 sm:max-w-lg">
        {/* Fixed Header */}
        <DialogHeader className="shrink-0 border-b px-4 py-3">
          <DialogTitle className="text-base">Registration Details</DialogTitle>
          <p className="font-mono text-xs text-neutral-400">#{viewModel.id}</p>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Event Image */}
          {viewModel.eventImage ? (
            <div className="relative aspect-video w-full bg-neutral-100">
              <OptimizedImage
                src={viewModel.eventImage}
                alt={viewModel.eventTitle}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex aspect-video w-full items-center justify-center bg-neutral-100">
              <CalendarIcon className="size-12 text-neutral-300" />
            </div>
          )}

          {/* Event Info */}
          <div className="border-b px-4 py-4">
            <h3 className="mb-2 text-lg font-semibold text-neutral-900">
              {viewModel.eventTitle}
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <CalendarIcon className="size-4 text-neutral-400" />
                <span suppressHydrationWarning>{viewModel.formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="size-4 text-neutral-400" />
                <span suppressHydrationWarning>{viewModel.formattedTime}</span>
              </div>
              {viewModel.eventLocation && (
                <div className="col-span-2 flex items-center gap-2">
                  <MapPinIcon className="size-4 text-neutral-400" />
                  <span>{viewModel.eventLocation}</span>
                </div>
              )}
            </div>
          </div>

          {/* Registration Summary */}
          <div className="bg-neutral-50 px-4 py-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-neutral-500">
                  <UsersIcon className="size-4" />
                  Seats Reserved
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400">
                    @ ₹{viewModel.eventPricePerSeat.toLocaleString("en-IN")}
                    /seat
                  </span>
                  <EditableNumber
                    value={viewModel.editedSeats}
                    onChange={onSeatsChange}
                    min={1}
                    disabled={viewModel.isPending}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Total Price</span>
                <EditablePrice
                  price={viewModel.editedPrice}
                  onChange={onPriceChange}
                  disabled={viewModel.isPending}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-neutral-500">
                  <TagIcon className="size-4" />
                  Discount
                </span>
                <EditablePrice
                  price={viewModel.editedDiscount}
                  onChange={onDiscountChange}
                  disabled={viewModel.isPending}
                />
              </div>

              {/* Final Amount */}
              <div className="flex items-center justify-between border-t border-neutral-200 pt-3">
                <span className="font-medium text-neutral-900">
                  Final Amount
                </span>
                <span className="text-primary text-lg font-bold">
                  ₹{viewModel.finalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Registration Info */}
          <div
            className="border-t px-4 py-2 text-xs text-neutral-400"
            suppressHydrationWarning
          >
            Registered: {viewModel.formattedCreatedAt}
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
