"use client";

import { useCallback, useState } from "react";

interface UseDailyWorkshopParticipantsStateInput {
  initialParticipants?: number;
}

export function useDailyWorkshopParticipantsState({
  initialParticipants = 1,
}: UseDailyWorkshopParticipantsStateInput = {}) {
  const [participants, setParticipants] = useState(initialParticipants);

  const resetParticipants = useCallback(() => {
    setParticipants(initialParticipants);
  }, [initialParticipants]);

  const adjustParticipants = useCallback(
    (delta: -1 | 1, maxParticipants: number) => {
      setParticipants((current) => {
        const next = current + delta;
        return Math.max(1, Math.min(maxParticipants, next));
      });
    },
    [],
  );

  return {
    participants,
    resetParticipants,
    adjustParticipants,
  };
}
