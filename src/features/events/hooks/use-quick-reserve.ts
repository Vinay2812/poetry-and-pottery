"use client";

import type { EventBase } from "@/data/events/types";
import { useAuthAction, useEventRegistration } from "@/hooks";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { useRouteAnimation } from "@/components/providers/route-animation-provider";

import { contactBusiness } from "@/lib/contact-business";

export function useQuickReserve() {
  const router = useRouter();
  const { startNavigation } = useRouteAnimation();
  const { requireAuth } = useAuthAction();
  const { registerForEvent, isLoading } = useEventRegistration();

  const reserveSeat = useCallback(
    async (event: EventBase) => {
      const result = await requireAuth(async () => {
        const response = await registerForEvent(event.id, 1);
        if (!response.success || !response.data) {
          return false;
        }

        await contactBusiness({
          type: "event",
          registrationId: response.data.id,
          eventTitle: event.title,
          eventDate: event.starts_at,
          seats: 1,
          amount: event.price,
          customerName: response.data.user.name || response.data.user.email,
          customerEmail: response.data.user.email,
        });

        startNavigation(() => {
          router.push("/events/registrations");
        });

        return true;
      });

      return Boolean(result);
    },
    [
      requireAuth,
      registerForEvent,
      router,
      startNavigation,
    ],
  );

  return { reserveSeat, isLoading };
}
