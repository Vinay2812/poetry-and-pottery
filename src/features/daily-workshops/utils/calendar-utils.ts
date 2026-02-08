"use client";

import { createDate } from "@/lib/date";

import type { DailyWorkshopCalendarDayViewModel } from "../types";

export function formatDateKeyInTimeZone(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const map = new Map(parts.map((part) => [part.type, part.value]));
  const year = map.get("year") ?? "1970";
  const month = map.get("month") ?? "01";
  const day = map.get("day") ?? "01";
  return `${year}-${month}-${day}`;
}

export function parseDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  return createDate(year, (month ?? 1) - 1, day ?? 1);
}

export function getMinutesOfDayInTimeZone(
  date: Date | string,
  timeZone: string,
): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(createDate(date));
  const map = new Map(parts.map((part) => [part.type, part.value]));
  const hour = Number(map.get("hour") ?? "0");
  const minute = Number(map.get("minute") ?? "0");
  return hour * 60 + minute;
}

export function buildCalendarDays(
  monthDate: Date,
  availabilityByDate: Map<string, boolean>,
  activeDateKey: string,
  selectedDateKeys: Set<string>,
  timeZone: string,
): DailyWorkshopCalendarDayViewModel[] {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDayOfMonth = createDate(year, month, 1);
  const startDate = createDate(firstDayOfMonth);
  startDate.setDate(1 - firstDayOfMonth.getDay());
  const todayDateKey = formatDateKeyInTimeZone(createDate(), timeZone);

  const days: DailyWorkshopCalendarDayViewModel[] = [];

  for (let index = 0; index < 35; index += 1) {
    const date = createDate(startDate);
    date.setDate(startDate.getDate() + index);
    const dateKey = formatDateKeyInTimeZone(date, timeZone);
    const isInCurrentMonth = date.getMonth() === month;
    const hasAvailability = availabilityByDate.get(dateKey) ?? false;
    const isFutureDate = dateKey >= todayDateKey;
    const isSelectable = isFutureDate && hasAvailability;

    days.push({
      dateKey,
      date,
      dayOfMonth: date.getDate(),
      isSelected: dateKey === activeDateKey,
      isInCurrentMonth,
      isSelectable,
      hasSelectedSlots: selectedDateKeys.has(dateKey),
    });
  }

  return days;
}

export function buildSelectedDateTabs(
  selectedDateKeys: Set<string>,
  selectedSlotStartTimes: string[],
  timeZone: string,
  dayLookup: Map<string, { label: string }>,
): Array<{ dateKey: string; label: string; hours: number }> {
  return Array.from(selectedDateKeys)
    .sort()
    .map((dateKey) => {
      const day = dayLookup.get(dateKey);
      const hours = selectedSlotStartTimes.filter((slotStartAt) => {
        return (
          formatDateKeyInTimeZone(createDate(slotStartAt), timeZone) === dateKey
        );
      }).length;

      return {
        dateKey,
        label:
          day?.label ??
          parseDateKey(dateKey).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        hours,
      };
    });
}
