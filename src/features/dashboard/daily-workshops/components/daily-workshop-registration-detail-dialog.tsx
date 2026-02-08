"use client";

import {
  CalendarClockIcon,
  Clock3Icon,
  PlusIcon,
  TagIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react";
import { useEffect, useRef } from "react";

import { EditablePrice } from "@/components/dashboard/editable-price";
import { EditableQuantity } from "@/components/dashboard/editable-quantity";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import type { DailyWorkshopRegistrationDetailDialogProps } from "../types";

export function DailyWorkshopRegistrationDetailDialog({
  open,
  viewModel,
  focusedSlotId,
  onOpenChange,
  onParticipantsChange,
  onPricePerPersonChange,
  onPiecesPerPersonChange,
  onDiscountChange,
  onSlotStartChange,
  onAddSlot,
  onRemoveSlot,
  onSave,
  onCancel,
}: DailyWorkshopRegistrationDetailDialogProps) {
  const slotsListRef = useRef<HTMLDivElement>(null);
  const slotInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  useEffect(() => {
    if (!open) return;
    const list = slotsListRef.current;
    if (!list) return;
    list.scrollTo({
      top: list.scrollHeight,
      behavior: "smooth",
    });
  }, [open, viewModel?.slots.length]);

  useEffect(() => {
    if (!open || focusedSlotId === null) return;
    const input = slotInputRefs.current[focusedSlotId];
    if (!input) return;

    input.focus();
    (
      input as HTMLInputElement & {
        showPicker?: () => void;
      }
    ).showPicker?.();
  }, [focusedSlotId, open, viewModel?.slots.length]);

  if (!viewModel) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col gap-0 p-0 sm:max-w-xl">
        <DialogHeader className="shrink-0 border-b px-4 py-3">
          <DialogTitle className="text-base">
            Daily Workshop Details
          </DialogTitle>
          <p className="font-mono text-xs text-neutral-400">#{viewModel.id}</p>
        </DialogHeader>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          <div className="grid gap-3 rounded-xl border bg-neutral-50 p-3 text-sm sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg bg-white p-2.5">
              <span className="flex items-center gap-1.5 text-neutral-500">
                <UsersIcon className="size-4" />
                Participants
              </span>
              <EditableQuantity
                quantity={viewModel.participants}
                onChange={onParticipantsChange}
                min={1}
                disabled={viewModel.isPending}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg bg-white p-2.5">
              <span className="flex items-center gap-1.5 text-neutral-500">
                <Clock3Icon className="size-4" />
                Pieces / Person
              </span>
              <EditableQuantity
                quantity={viewModel.piecesPerPerson}
                onChange={onPiecesPerPersonChange}
                min={0}
                disabled={viewModel.isPending}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg bg-white p-2.5">
              <span className="text-neutral-500">Price / Person</span>
              <EditablePrice
                price={viewModel.pricePerPerson}
                onChange={onPricePerPersonChange}
                disabled={viewModel.isPending}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg bg-white p-2.5">
              <span className="flex items-center gap-1.5 text-neutral-500">
                <TagIcon className="size-4" />
                Discount
              </span>
              <EditablePrice
                price={viewModel.discount}
                onChange={onDiscountChange}
                disabled={viewModel.isPending}
              />
            </div>
          </div>

          <section className="rounded-xl border bg-white">
            <div className="flex items-center justify-between border-b px-3 py-2.5">
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  Dates & Time Slots
                </p>
                <p className="text-xs text-neutral-500">
                  Edit booked slot starts directly.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onAddSlot();
                }}
                disabled={viewModel.isPending}
              >
                <PlusIcon className="mr-1.5 size-3.5" />
                Slot
              </Button>
            </div>

            <div
              ref={slotsListRef}
              className="max-h-64 space-y-2 overflow-y-auto p-3"
            >
              {viewModel.slots.map((slot) => (
                <div
                  key={slot.id}
                  className={cn(
                    "rounded-lg border bg-neutral-50 p-2.5 transition-colors",
                    slot.isNew &&
                      "border-primary/60 bg-primary/5 ring-primary/20 ring-2",
                  )}
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-neutral-600">
                        {slot.displayLabel}
                      </span>
                      {slot.isNew && (
                        <span className="bg-primary/15 text-primary rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase">
                          New
                        </span>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-7 text-red-500 hover:text-red-600"
                      onClick={() => onRemoveSlot(slot.id)}
                      disabled={
                        viewModel.isPending || viewModel.slots.length <= 1
                      }
                    >
                      <Trash2Icon className="size-3.5" />
                    </Button>
                  </div>
                  <Input
                    ref={(element) => {
                      slotInputRefs.current[slot.id] = element;
                    }}
                    type="datetime-local"
                    value={slot.startAt}
                    onChange={(event) =>
                      onSlotStartChange(slot.id, event.currentTarget.value)
                    }
                    disabled={viewModel.isPending}
                  />
                </div>
              ))}
            </div>
          </section>

          <div className="rounded-xl border bg-neutral-50 p-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Total Hours</span>
                <span>{viewModel.totalHours}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Total Slots</span>
                <span>{viewModel.slotsCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Base Amount</span>
                <span>₹{viewModel.baseAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Total Pieces</span>
                <span>{viewModel.totalPieces}</span>
              </div>
              <div className="flex justify-between border-t border-neutral-200 pt-2">
                <span className="font-semibold text-neutral-900">
                  Final Amount
                </span>
                <span className="text-primary font-bold">
                  ₹{viewModel.finalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-1.5 text-xs text-neutral-400"
            suppressHydrationWarning
          >
            <CalendarClockIcon className="size-3.5" />
            Registered: {viewModel.formattedCreatedAt}
          </div>
        </div>

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
