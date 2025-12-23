"use client";

import type {
  EventWithDetails,
  EventWithRegistrationCount,
  RegistrationWithEvent,
} from "@/types";

import { RegistrationDetailClient } from "@/components/events/registration-detail-client";

import { EventDetailContainer } from "./event-detail-container";
import { PastWorkshopDetailContainer } from "./past-workshop-detail-container";

interface UnifiedEventDetailContainerProps {
  event: EventWithDetails;
  registration: RegistrationWithEvent | null;
  isPastEvent: boolean;
  currentUserId: number | null;
  upcomingEvents: EventWithRegistrationCount[];
}

export function UnifiedEventDetailContainer({
  event,
  registration,
  isPastEvent,
  currentUserId,
  upcomingEvents,
}: UnifiedEventDetailContainerProps) {
  // Priority 1: If event is past, show past workshop detail view
  // (regardless of registration status - completed events show gallery/reviews)
  if (isPastEvent) {
    return (
      <PastWorkshopDetailContainer
        workshop={event}
        upcomingEvents={upcomingEvents}
        currentUserId={currentUserId}
      />
    );
  }

  // Priority 2: If user has a registration for upcoming event, show registration view
  if (registration) {
    return <RegistrationDetailClient registration={registration} />;
  }

  // Priority 3: Show upcoming event detail view (default)
  return <EventDetailContainer event={event} otherEvents={upcomingEvents} />;
}
