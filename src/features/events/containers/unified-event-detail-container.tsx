"use client";

import type { EventDetail } from "@/data/events/types";
import { EventStatus } from "@/data/events/types";
import { useMemo } from "react";

import { RegistrationDetailClient } from "@/components/events/registration-detail-client";
import { EventDetailSkeleton } from "@/components/skeletons";

import { useUpcomingEventsQuery } from "../hooks/use-upcoming-events-query";
import { useEventWithUserContextQuery } from "../hooks/use-user-context-query";
import { EventDetailContainer } from "./event-detail-container";
import { PastWorkshopDetailContainer } from "./past-workshop-detail-container";

interface UnifiedEventDetailContainerProps {
  event: EventDetail;
}

export function UnifiedEventDetailContainer({
  event,
}: UnifiedEventDetailContainerProps) {
  // Fetch upcoming events client-side (recommendations)
  const { upcomingEvents } = useUpcomingEventsQuery({
    limit: 3,
    excludeEventId: event.id,
  });
  // Compute isPastEvent from event data directly (no API call needed)
  const isPastEvent = useMemo(() => {
    const now = new Date();
    const endsAt = new Date(event.ends_at);
    return event.status === EventStatus.Completed || endsAt < now;
  }, [event.ends_at, event.status]);

  const { registration, currentUserId, isLoading } =
    useEventWithUserContextQuery({
      eventId: event.id,
    });

  // Priority 1: If event is past, show past workshop detail view immediately
  // currentUserId loading state is handled inside PastWorkshopDetailContainer
  if (isPastEvent) {
    return (
      <PastWorkshopDetailContainer
        workshop={event}
        upcomingEvents={upcomingEvents}
        currentUserId={currentUserId}
      />
    );
  }

  // For upcoming events, we need to wait to know if user has a registration
  // to determine which view to show
  if (isLoading) {
    return <EventDetailSkeleton />;
  }

  // Priority 2: If user has a registration for upcoming event, show registration view
  if (registration) {
    return <RegistrationDetailClient registration={registration} />;
  }

  // Priority 3: Show upcoming event detail view (default)
  return <EventDetailContainer event={event} otherEvents={upcomingEvents} />;
}
