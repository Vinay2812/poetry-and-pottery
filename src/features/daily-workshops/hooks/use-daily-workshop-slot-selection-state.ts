"use client";

import { useCallback, useState, useTransition } from "react";

type SlotSelectionUpdater = (current: string[]) => string[];

export function useDailyWorkshopSlotSelectionState() {
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [selectedSlotStartTimes, setSelectedSlotStartTimes] = useState<
    string[]
  >([]);
  const [isSlotSelectionPending, startSlotSelectionTransition] =
    useTransition();

  const replaceSelectedSlots = useCallback((next: string[]) => {
    setSelectedSlotStartTimes(next);
  }, []);

  const clearSelectedSlots = useCallback(() => {
    setSelectedSlotStartTimes([]);
  }, []);

  const clearBookingError = useCallback(() => {
    setBookingError(null);
  }, []);

  const resetSlotSelection = useCallback(() => {
    setSelectedSlotStartTimes([]);
    setBookingError(null);
  }, []);

  const runSlotSelectionTransition = useCallback(
    (updater: SlotSelectionUpdater) => {
      startSlotSelectionTransition(() => {
        setBookingError(null);
        setSelectedSlotStartTimes(updater);
      });
    },
    [],
  );

  return {
    bookingError,
    selectedSlotStartTimes,
    isSlotSelectionPending,
    setBookingError,
    clearBookingError,
    replaceSelectedSlots,
    clearSelectedSlots,
    resetSlotSelection,
    runSlotSelectionTransition,
  };
}
