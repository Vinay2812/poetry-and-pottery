"use client";

import { useCallback, useState } from "react";

interface UseDailyWorkshopActiveDayStateInput {
  initialDayKey: string;
}

export function useDailyWorkshopActiveDayState({
  initialDayKey,
}: UseDailyWorkshopActiveDayStateInput) {
  const [activeDayKey, setActiveDayKey] = useState(initialDayKey);

  const handleSelectDay = useCallback((dayKey: string) => {
    setActiveDayKey(dayKey);
  }, []);

  return {
    activeDayKey,
    handleSelectDay,
  };
}
