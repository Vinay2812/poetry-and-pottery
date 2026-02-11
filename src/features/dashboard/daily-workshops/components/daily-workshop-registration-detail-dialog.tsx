"use client";

import { CalendarClockIcon } from "lucide-react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { DailyWorkshopRegistrationDetailDialogProps } from "../types";
import { RegistrationEditableFields } from "./registration-editable-fields";
import { RegistrationTimeSlotsSection } from "./registration-time-slots-section";

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
          <RegistrationEditableFields
            participants={viewModel.participants}
            piecesPerPerson={viewModel.piecesPerPerson}
            pricePerPerson={viewModel.pricePerPerson}
            discount={viewModel.discount}
            isPending={viewModel.isPending}
            onParticipantsChange={onParticipantsChange}
            onPiecesPerPersonChange={onPiecesPerPersonChange}
            onPricePerPersonChange={onPricePerPersonChange}
            onDiscountChange={onDiscountChange}
          />

          <RegistrationTimeSlotsSection
            slots={viewModel.slots}
            isPending={viewModel.isPending}
            slotsListRef={slotsListRef}
            slotInputRefs={slotInputRefs}
            onSlotStartChange={onSlotStartChange}
            onAddSlot={onAddSlot}
            onRemoveSlot={onRemoveSlot}
          />

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
