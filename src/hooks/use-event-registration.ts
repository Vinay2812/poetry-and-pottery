"use client";

import { registerForEvent as registerForEventAction } from "@/actions/event.actions";
import { useUIStore } from "@/store/ui.store";
import { useCallback, useState } from "react";

export function useEventRegistration() {
  const { addToast } = useUIStore();
  const [loadingEvents, setLoadingEvents] = useState<Set<string>>(new Set());

  const setLoading = useCallback((eventId: string, loading: boolean) => {
    setLoadingEvents((prev) => {
      const next = new Set(prev);
      if (loading) {
        next.add(eventId);
      } else {
        next.delete(eventId);
      }
      return next;
    });
  }, []);

  const isLoading = useCallback(
    (eventId: string) => loadingEvents.has(eventId),
    [loadingEvents],
  );

  const registerForEvent = useCallback(
    async (eventId: string, seats: number = 1) => {
      setLoading(eventId, true);

      try {
        const result = await registerForEventAction(eventId, seats);

        if (!result.success) {
          addToast({
            type: "error",
            message: result.error || "Failed to register for event",
          });
          setLoading(eventId, false);
          return { success: false, error: result.error };
        }

        addToast({
          type: "success",
          message:
            "Registration request submitted! Complete your booking via WhatsApp.",
          duration: 5000,
        });
        setLoading(eventId, false);
        return { success: true, data: result.data };
      } catch {
        addToast({
          type: "error",
          message: "Something went wrong. Please try again.",
        });
        setLoading(eventId, false);
        return { success: false, error: "Unknown error" };
      }
    },
    [addToast, setLoading],
  );

  return {
    registerForEvent,
    isLoading,
    isAnyLoading: loadingEvents.size > 0,
  };
}
