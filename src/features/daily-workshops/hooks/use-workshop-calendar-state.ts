"use client";

import { useCallback, useState } from "react";

import {
  formatDateKeyInTimeZone,
  parseDateKey,
} from "../utils/calendar-utils";

interface UseWorkshopCalendarStateInput {
  initialDateKey: string;
  timeZone: string;
}

export function useWorkshopCalendarState({
  initialDateKey,
  timeZone,
}: UseWorkshopCalendarStateInput) {
  const [activeDateKey, setActiveDateKey] = useState(initialDateKey);
  const [calendarMonthDate, setCalendarMonthDate] = useState(() => {
    return parseDateKey(
      initialDateKey || formatDateKeyInTimeZone(new Date(), timeZone),
    );
  });

  const handlePreviousMonth = useCallback(() => {
    setCalendarMonthDate((current) => {
      return new Date(current.getFullYear(), current.getMonth() - 1, 1);
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    setCalendarMonthDate((current) => {
      return new Date(current.getFullYear(), current.getMonth() + 1, 1);
    });
  }, []);

  const handleSelectDate = useCallback((dateKey: string) => {
    setActiveDateKey(dateKey);
    setCalendarMonthDate(parseDateKey(dateKey));
  }, []);

  const resetCalendarToDateKey = useCallback(
    (dateKey: string) => {
      const nextDateKey = dateKey || formatDateKeyInTimeZone(new Date(), timeZone);
      setActiveDateKey(dateKey);
      setCalendarMonthDate(parseDateKey(nextDateKey));
    },
    [timeZone],
  );

  return {
    activeDateKey,
    setActiveDateKey,
    calendarMonthDate,
    setCalendarMonthDate,
    handlePreviousMonth,
    handleNextMonth,
    handleSelectDate,
    resetCalendarToDateKey,
  };
}
