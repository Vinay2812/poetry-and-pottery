"use client";

import { useAuthAction, useEventRegistration, useShare } from "@/hooks";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { useRouteAnimation } from "@/components/providers/route-animation-provider";

import { contactBusiness } from "@/lib/contact-business";

import { EventDetail } from "../components/event-detail";
import type { EventDetailContainerProps, EventDetailViewModel } from "../types";
import { calculateDuration, formatEventDate, formatEventTime } from "../types";

export function EventDetailContainer({
  event,
  otherEvents,
}: EventDetailContainerProps) {
  const router = useRouter();
  const { startNavigation } = useRouteAnimation();
  const [registered, setRegistered] = useState(false);

  const { requireAuth } = useAuthAction();
  const { registerForEvent, isLoading } = useEventRegistration();
  const { share } = useShare();

  const loading = isLoading(event.id);
  const soldOut = event.available_seats === 0;

  const handleShare = useCallback(() => {
    share({
      title: event.title,
      text: `Check out this workshop: ${event.title}`,
      url: window.location.href,
    });
  }, [share, event.title]);

  const handleReserveSeat = useCallback(() => {
    requireAuth(async () => {
      const result = await registerForEvent(event.id, 1);
      if (result.success && result.data) {
        setRegistered(true);

        // Send email and open WhatsApp
        await contactBusiness({
          type: "event",
          registrationId: result.data.id,
          eventTitle: event.title,
          eventDate: event.starts_at,
          seats: 1,
          amount: event.price,
          customerName: result.data.user.name || result.data.user.email,
          customerEmail: result.data.user.email,
        });

        // Redirect to registrations after a delay
        startNavigation(() => {
          router.push("/events/registrations");
        });
      }
    });
  }, [
    requireAuth,
    registerForEvent,
    event.id,
    event.title,
    event.starts_at,
    event.price,
    router,
    startNavigation,
  ]);

  // Build the view model
  const isWorkshop = event.event_type === "POTTERY_WORKSHOP";
  const isOpenMic = event.event_type === "OPEN_MIC";

  const viewModel: EventDetailViewModel = {
    id: event.id,
    title: event.title,
    description: event.description,
    price: event.price,
    level: event.level ?? null,
    eventType: event.event_type,
    imageUrl: event.image || "/placeholder.jpg",
    includes: event.includes || [],
    performers: event.performers || [],
    lineupNotes: event.lineup_notes ?? null,
    quickInfo: {
      formattedDate: formatEventDate(event.starts_at),
      formattedTime: formatEventTime(event.starts_at),
      duration: calculateDuration(event.starts_at, event.ends_at),
      availableSeats: event.available_seats,
      location: event.location,
      fullLocation: event.full_location,
      instructor: event.instructor ?? null,
    },
    soldOut,
    isLoading: loading,
    registered,
    isWorkshop,
    isOpenMic,
  };

  return (
    <EventDetail
      viewModel={viewModel}
      otherEvents={otherEvents}
      onReserveSeat={handleReserveSeat}
      onShare={handleShare}
    />
  );
}
