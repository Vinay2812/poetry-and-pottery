"use client";

import { useAuthAction, useEventRegistration, useShare } from "@/hooks";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { contactBusiness } from "@/lib/contact-business";

import { EventDetail } from "../components/event-detail";
import type { EventDetailContainerProps, EventDetailViewModel } from "../types";
import { calculateDuration, formatEventDate, formatEventTime } from "../types";

export function EventDetailContainer({
  event,
  otherEvents,
}: EventDetailContainerProps) {
  const router = useRouter();
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
        router.push("/events/registrations");
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
  ]);

  // Build the view model
  const viewModel: EventDetailViewModel = {
    id: event.id,
    title: event.title,
    description: event.description,
    price: event.price,
    level: event.level,
    imageUrl: event.image || "/placeholder.jpg",
    includes: event.includes || [],
    quickInfo: {
      formattedDate: formatEventDate(event.starts_at),
      formattedTime: formatEventTime(event.starts_at),
      duration: calculateDuration(event.starts_at, event.ends_at),
      availableSeats: event.available_seats,
      location: event.location,
      fullLocation: event.full_location,
      instructor: event.instructor,
    },
    soldOut,
    isLoading: loading,
    registered,
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
