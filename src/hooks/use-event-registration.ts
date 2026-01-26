"use client";

import { useRegisterForEvent } from "@/data/events/gateway/client";
import { useLoadingTransition } from "@/hooks/use-loading-transition";
import { useUIStore } from "@/store/ui.store";
import { useCallback } from "react";

export function useEventRegistration() {
  const { addToast } = useUIStore();
  const { mutate: registerForEventMutate } = useRegisterForEvent();
  const { isLoading, isAnyLoading, runWithLoading } =
    useLoadingTransition<string>();

  const registerForEvent = useCallback(
    async (eventId: string, seats: number = 1) => {
      try {
        const result = await runWithLoading(eventId, () =>
          registerForEventMutate({ eventId, seats }),
        );

        if (!result.success) {
          addToast({
            type: "error",
            message: result.error || "Failed to register for event",
          });
          return { success: false, error: result.error };
        }

        addToast({
          type: "success",
          message:
            "Registration request submitted! Complete your booking via WhatsApp.",
          duration: 5000,
        });
        return { success: true, data: result.data };
      } catch {
        addToast({
          type: "error",
          message: "Something went wrong. Please try again.",
        });
        return { success: false, error: "Unknown error" };
      }
    },
    [addToast, registerForEventMutate, runWithLoading],
  );

  return {
    registerForEvent,
    isLoading,
    isAnyLoading,
  };
}
