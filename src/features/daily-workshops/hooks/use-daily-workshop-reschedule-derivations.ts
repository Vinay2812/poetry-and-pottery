"use client";

import type { DailyWorkshopAvailabilityResponse } from "@/data/daily-workshops/types";
import { useMemo } from "react";

import { createDate } from "@/lib/date";

import {
  buildCalendarDays,
  buildSelectedDateTabs,
  formatDateKeyInTimeZone,
} from "../utils/calendar-utils";

interface UseDailyWorkshopRescheduleDerivationsInput {
  availability: DailyWorkshopAvailabilityResponse;
  activeDateKey: string;
  calendarMonthDate: Date;
  selectedSlotStartTimes: string[];
  currentTimestamp: number;
}

export function useDailyWorkshopRescheduleDerivations({
  availability,
  activeDateKey,
  calendarMonthDate,
  selectedSlotStartTimes,
  currentTimestamp,
}: UseDailyWorkshopRescheduleDerivationsInput) {
  const availabilityByDate = useMemo(() => {
    const map = new Map<string, boolean>();
    availability.days.forEach((day) => {
      map.set(
        day.date_key,
        day.slots.some((slot) => slot.is_available),
      );
    });
    return map;
  }, [availability.days]);

  const dayLookup = useMemo(() => {
    return new Map(availability.days.map((day) => [day.date_key, day]));
  }, [availability.days]);

  const selectedDateKeys = useMemo(() => {
    const keys = new Set<string>();
    selectedSlotStartTimes.forEach((slotStartAt) => {
      keys.add(
        formatDateKeyInTimeZone(
          createDate(slotStartAt),
          availability.config.timezone,
        ),
      );
    });
    return keys;
  }, [availability.config.timezone, selectedSlotStartTimes]);

  const selectedDateTabs = useMemo(() => {
    return buildSelectedDateTabs(
      selectedDateKeys,
      selectedSlotStartTimes,
      availability.config.timezone,
      dayLookup,
    );
  }, [
    availability.config.timezone,
    dayLookup,
    selectedDateKeys,
    selectedSlotStartTimes,
  ]);

  const firstAvailableDateKey = useMemo(() => {
    return (
      availability.days.find((day) => availabilityByDate.get(day.date_key))
        ?.date_key ?? ""
    );
  }, [availability.days, availabilityByDate]);

  const resolvedActiveDateKey = useMemo(() => {
    if (availabilityByDate.get(activeDateKey)) {
      return activeDateKey;
    }

    if (firstAvailableDateKey) {
      return firstAvailableDateKey;
    }

    return activeDateKey;
  }, [activeDateKey, availabilityByDate, firstAvailableDateKey]);

  const activeDay = dayLookup.get(resolvedActiveDateKey);

  const activeDaySlots = useMemo(() => {
    if (!activeDay) return [];

    return [...activeDay.slots]
      .filter(
        (slot) => createDate(slot.slot_start_at).getTime() > currentTimestamp,
      )
      .sort((a, b) => {
        return (
          createDate(a.slot_start_at).getTime() -
          createDate(b.slot_start_at).getTime()
        );
      })
      .map((slot) => {
        const slotStartISO = createDate(slot.slot_start_at).toISOString();
        return {
          startAt: slot.slot_start_at,
          endAt: slot.slot_end_at,
          isAvailable: slot.is_available,
          remainingCapacity: slot.remaining_capacity,
          reason: slot.reason,
          isSelected: selectedSlotStartTimes.includes(slotStartISO),
        };
      });
  }, [activeDay, currentTimestamp, selectedSlotStartTimes]);

  const calendarDays = useMemo(() => {
    return buildCalendarDays(
      calendarMonthDate,
      availabilityByDate,
      resolvedActiveDateKey,
      selectedDateKeys,
      availability.config.timezone,
    );
  }, [
    availabilityByDate,
    availability.config.timezone,
    calendarMonthDate,
    resolvedActiveDateKey,
    selectedDateKeys,
  ]);

  return {
    activeDay,
    activeDaySlots,
    calendarDays,
    resolvedActiveDateKey,
    selectedDateTabs,
  };
}
