"use client";

import { updateUserDailyWorkshopRegistrationDetails } from "@/data/admin/users/gateway/server";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";

import { createDate, formatCreatedAt, formatDateTimeLocal } from "@/lib/date";

import { DailyWorkshopRegistrationDetailDialog } from "../components/daily-workshop-registration-detail-dialog";
import type {
  DailyWorkshopRegistrationDetailDialogContainerProps,
  DailyWorkshopRegistrationDetailViewModel,
} from "../types";

type SlotDraft = {
  id: number;
  startAt: string;
};

function inferSlotDurationMinutes(
  totalHours: number,
  slotsCount: number,
  slots: { slot_start_at: Date | string; slot_end_at: Date | string }[],
): number {
  if (slots.length > 0) {
    const firstStart = createDate(slots[0].slot_start_at);
    const firstEnd = createDate(slots[0].slot_end_at);
    const diffMinutes = Math.round(
      (firstEnd.getTime() - firstStart.getTime()) / (1000 * 60),
    );
    if (diffMinutes > 0) {
      return diffMinutes;
    }
  }

  if (totalHours > 0 && slotsCount > 0) {
    const inferred = Math.round((totalHours * 60) / slotsCount);
    if (inferred > 0) {
      return inferred;
    }
  }

  return 60;
}

function getInitialSlots(
  slots: { id: number; slot_start_at: Date | string }[],
): SlotDraft[] {
  return slots.map((slot) => ({
    id: slot.id,
    startAt: formatDateTimeLocal(slot.slot_start_at),
  }));
}

function toSlotLabel(value: string, index: number): string {
  const date = createDate(value);
  if (Number.isNaN(date.getTime())) {
    return `Slot ${index + 1}`;
  }

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function DailyWorkshopRegistrationDetailDialogContainer({
  registration,
  open,
  onOpenChange,
  onRegistrationUpdated,
}: DailyWorkshopRegistrationDetailDialogContainerProps) {
  const [isPending, startTransition] = useTransition();
  const [participants, setParticipants] = useState(1);
  const [pricePerPerson, setPricePerPerson] = useState(0);
  const [piecesPerPerson, setPiecesPerPerson] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [slots, setSlots] = useState<SlotDraft[]>([]);
  const [focusedSlotId, setFocusedSlotId] = useState<number | null>(null);
  const nextTempIdRef = useRef(-1);

  const resetDraft = useCallback(() => {
    if (!registration) return;
    setParticipants(registration.participants);
    setPricePerPerson(registration.price_per_person);
    setPiecesPerPerson(registration.pieces_per_person);
    setDiscount(registration.discount);
    setSlots(getInitialSlots(registration.slots));
    setFocusedSlotId(null);
    nextTempIdRef.current = -1;
  }, [registration]);

  useEffect(() => {
    if (registration) {
      resetDraft();
    } else {
      setSlots([]);
    }
  }, [registration, resetDraft]);

  const slotDurationMinutes = useMemo(() => {
    if (!registration) return 60;
    return inferSlotDurationMinutes(
      registration.total_hours,
      registration.slots_count,
      registration.slots,
    );
  }, [registration]);

  const handleParticipantsChange = useCallback((value: number) => {
    setParticipants(value);
  }, []);

  const handlePricePerPersonChange = useCallback((value: number) => {
    setPricePerPerson(value);
  }, []);

  const handlePiecesPerPersonChange = useCallback((value: number) => {
    setPiecesPerPerson(value);
  }, []);

  const handleDiscountChange = useCallback((value: number) => {
    setDiscount(value);
  }, []);

  const handleSlotStartChange = useCallback((slotId: number, value: string) => {
    setSlots((previous) =>
      previous.map((slot) =>
        slot.id === slotId ? { ...slot, startAt: value } : slot,
      ),
    );
  }, []);

  const handleAddSlot = useCallback(() => {
    const tempId = nextTempIdRef.current;
    nextTempIdRef.current -= 1;
    setFocusedSlotId(tempId);

    setSlots((previous) => {
      const fallbackStart = createDate();
      fallbackStart.setMinutes(
        fallbackStart.getMinutes() + slotDurationMinutes,
      );

      const lastSlot = previous[previous.length - 1];
      const lastSlotStart = lastSlot
        ? createDate(lastSlot.startAt)
        : fallbackStart;
      const nextStart = Number.isNaN(lastSlotStart.getTime())
        ? fallbackStart
        : createDate(lastSlotStart.getTime() + slotDurationMinutes * 60 * 1000);

      return [
        ...previous,
        { id: tempId, startAt: formatDateTimeLocal(nextStart) },
      ];
    });
  }, [slotDurationMinutes]);

  const handleRemoveSlot = useCallback((slotId: number) => {
    setSlots((previous) => {
      if (previous.length <= 1) return previous;
      return previous.filter((slot) => slot.id !== slotId);
    });
    setFocusedSlotId((previous) => (previous === slotId ? null : previous));
  }, []);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        resetDraft();
      }
      onOpenChange(nextOpen);
    },
    [onOpenChange, resetDraft],
  );

  const handleCancel = useCallback(() => {
    resetDraft();
    onOpenChange(false);
  }, [onOpenChange, resetDraft]);

  const handleSave = useCallback(async () => {
    if (!registration) return;

    const parsedSlotStarts = slots.map((slot) => createDate(slot.startAt));
    if (parsedSlotStarts.some((slot) => Number.isNaN(slot.getTime()))) {
      toast.error("Please enter valid date/time for all slots");
      return;
    }

    const slotStartTimes = parsedSlotStarts.map((slot) => slot.toISOString());
    if (new Set(slotStartTimes).size !== slotStartTimes.length) {
      toast.error("Duplicate slot times are not allowed");
      return;
    }

    startTransition(async () => {
      try {
        const result = await updateUserDailyWorkshopRegistrationDetails(
          registration.id,
          {
            participants,
            price_per_person: pricePerPerson,
            pieces_per_person: piecesPerPerson,
            discount,
            slot_start_times: slotStartTimes,
          },
        );

        if (!result.success || !result.registration) {
          toast.error(result.error ?? "Failed to update workshop registration");
          return;
        }

        onRegistrationUpdated(result.registration);
        toast.success("Workshop registration updated");
        onOpenChange(false);
      } catch (error) {
        console.error("Failed to update workshop registration:", error);
        toast.error("Failed to update workshop registration");
      }
    });
  }, [
    discount,
    onOpenChange,
    onRegistrationUpdated,
    participants,
    piecesPerPerson,
    pricePerPerson,
    registration,
    slots,
    startTransition,
  ]);

  const viewModel: DailyWorkshopRegistrationDetailViewModel | null =
    useMemo(() => {
      if (!registration) return null;

      const slotsCount = slots.length;
      const totalHours = Math.max(
        1,
        Math.round((slotsCount * slotDurationMinutes) / 60),
      );
      const baseAmount = participants * pricePerPerson;
      const normalizedDiscount = Math.min(Math.max(0, discount), baseAmount);
      const finalAmount = Math.max(0, baseAmount - normalizedDiscount);
      const totalPieces = participants * piecesPerPerson;

      return {
        id: registration.id,
        status: registration.status,
        formattedCreatedAt: formatCreatedAt(registration.created_at),
        participants,
        totalHours,
        slotsCount,
        pricePerPerson,
        piecesPerPerson,
        baseAmount,
        discount: normalizedDiscount,
        finalAmount,
        totalPieces,
        slots: slots.map((slot, index) => ({
          id: slot.id,
          startAt: slot.startAt,
          displayLabel: toSlotLabel(slot.startAt, index),
          isNew: slot.id === focusedSlotId,
        })),
        isPending,
      };
    }, [
      discount,
      isPending,
      participants,
      piecesPerPerson,
      pricePerPerson,
      registration,
      slotDurationMinutes,
      slots,
      focusedSlotId,
    ]);

  return (
    <DailyWorkshopRegistrationDetailDialog
      open={open}
      viewModel={viewModel}
      focusedSlotId={focusedSlotId}
      onOpenChange={handleOpenChange}
      onParticipantsChange={handleParticipantsChange}
      onPricePerPersonChange={handlePricePerPersonChange}
      onPiecesPerPersonChange={handlePiecesPerPersonChange}
      onDiscountChange={handleDiscountChange}
      onSlotStartChange={handleSlotStartChange}
      onAddSlot={handleAddSlot}
      onRemoveSlot={handleRemoveSlot}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
