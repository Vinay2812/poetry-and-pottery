"use client";

import { useRescheduleDailyWorkshopRegistration } from "@/data/daily-workshops/gateway/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { createDate } from "@/lib/date";

import { DailyWorkshopReschedule } from "../components/daily-workshop-reschedule";
import { useCurrentTimestamp } from "../hooks/use-current-timestamp";
import { useDailyWorkshopRescheduleDerivations } from "../hooks/use-daily-workshop-reschedule-derivations";
import { useDailyWorkshopSlotSelectionState } from "../hooks/use-daily-workshop-slot-selection-state";
import { useWorkshopCalendarState } from "../hooks/use-workshop-calendar-state";
import type {
  DailyWorkshopRescheduleContainerProps,
  DailyWorkshopRescheduleViewModel,
} from "../types";
import {
  getSlotDurationMinutesFromSnapshot,
  inferPartialRecoverySlotCountFromReason,
  parseBlackoutRecoveryMetadata,
} from "../utils/blackout-recovery-utils";
import { formatDateKeyInTimeZone, parseDateKey } from "../utils/calendar-utils";

export function DailyWorkshopRescheduleContainer({
  registration,
  initialAvailability,
}: DailyWorkshopRescheduleContainerProps) {
  const router = useRouter();
  const { mutate: reschedule, loading: isSubmitting } =
    useRescheduleDailyWorkshopRegistration();

  const {
    activeDateKey,
    calendarMonthDate,
    handlePreviousMonth,
    handleNextMonth,
    handleSelectDate,
  } = useWorkshopCalendarState({
    initialDateKey: initialAvailability.days[0]?.date_key ?? "",
    timeZone: initialAvailability.config.timezone,
  });

  const currentTimestamp = useCurrentTimestamp();

  const {
    bookingError,
    selectedSlotStartTimes,
    isSlotSelectionPending,
    setBookingError,
    runSlotSelectionTransition,
  } = useDailyWorkshopSlotSelectionState();

  const blackoutRecovery = useMemo(
    () => parseBlackoutRecoveryMetadata(registration.pricing_snapshot),
    [registration.pricing_snapshot],
  );
  const inferredRequiredSlots = useMemo(
    () =>
      inferPartialRecoverySlotCountFromReason(registration.cancelled_reason),
    [registration.cancelled_reason],
  );

  const requiredSlots = Math.max(
    1,
    blackoutRecovery
      ? Math.max(
          blackoutRecovery.requiredSlots,
          blackoutRecovery.pendingSlotStartTimes.length,
          inferredRequiredSlots,
        )
      : inferredRequiredSlots > 0
        ? inferredRequiredSlots
        : registration.slots_count,
  );

  const slotDurationMinutes =
    getSlotDurationMinutesFromSnapshot(registration.pricing_snapshot) ||
    initialAvailability.config.slot_duration_minutes;
  const requiredHours = Math.max(
    1,
    Math.round((requiredSlots * slotDurationMinutes) / 60),
  );

  const {
    activeDay,
    activeDaySlots,
    calendarDays,
    resolvedActiveDateKey,
    selectedDateTabs,
  } = useDailyWorkshopRescheduleDerivations({
    availability: initialAvailability,
    activeDateKey,
    calendarMonthDate,
    selectedSlotStartTimes,
    currentTimestamp,
  });

  const handleToggleSlot = useCallback(
    (slotStartAt: Date | string) => {
      const slotStartISO = createDate(slotStartAt).toISOString();

      runSlotSelectionTransition((current) => {
        const isAlreadySelected = current.includes(slotStartISO);
        if (!isAlreadySelected && current.length >= requiredSlots) {
          setBookingError(
            `You can only select ${requiredSlots} session${requiredSlots > 1 ? "s" : ""}.`,
          );
          return current;
        }
        return isAlreadySelected
          ? current.filter((value) => value !== slotStartISO)
          : [...current, slotStartISO];
      });
    },
    [requiredSlots, runSlotSelectionTransition, setBookingError],
  );

  const handleReschedule = useCallback(async () => {
    if (selectedSlotStartTimes.length !== requiredSlots) {
      setBookingError(
        `Please select exactly ${requiredSlots} session${requiredSlots > 1 ? "s" : ""}.`,
      );
      return;
    }

    setBookingError(null);

    const result = await reschedule({
      registrationId: registration.id,
      slotStartTimes: selectedSlotStartTimes,
    });

    if (!result.success) {
      setBookingError(result.error);
      return;
    }

    router.push(`/events/daily-workshops/${registration.id}`);
  }, [
    registration.id,
    requiredSlots,
    reschedule,
    router,
    selectedSlotStartTimes,
    setBookingError,
  ]);

  const viewModel: DailyWorkshopRescheduleViewModel = {
    registrationId: registration.id,
    monthLabel: calendarMonthDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: initialAvailability.config.timezone,
    }),
    activeDateKey: resolvedActiveDateKey,
    activeDateLabel:
      activeDay?.label ??
      parseDateKey(
        resolvedActiveDateKey ||
          formatDateKeyInTimeZone(
            createDate(),
            initialAvailability.config.timezone,
          ),
      ).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        timeZone: initialAvailability.config.timezone,
      }),
    selectedDateTabs,
    calendarDays,
    activeDaySlots,
    requiredSlots,
    requiredHours,
    selectedSlotsCount: selectedSlotStartTimes.length,
    bookingError,
  };

  return (
    <DailyWorkshopReschedule
      viewModel={viewModel}
      onPreviousMonth={handlePreviousMonth}
      onNextMonth={handleNextMonth}
      onSelectDate={handleSelectDate}
      onToggleSlot={handleToggleSlot}
      onReschedule={handleReschedule}
      isSubmitting={isSubmitting}
      isSlotSelectionPending={isSlotSelectionPending}
    />
  );
}
