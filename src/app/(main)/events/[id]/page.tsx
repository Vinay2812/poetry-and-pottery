"use server";

import { getEventWithUserContext, getUpcomingEvents } from "@/actions";
import { UnifiedEventDetailContainer } from "@/features/events/containers/unified-event-detail-container";
import { notFound } from "next/navigation";

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { id } = await params;

  // Fetch event with user context
  const eventContext = await getEventWithUserContext(id);

  if (!eventContext) {
    notFound();
  }

  // Fetch upcoming events for recommendations
  const upcomingEventsResult = await getUpcomingEvents(1, 3);
  const upcomingEvents = upcomingEventsResult.data.filter(
    (e) => e.id !== eventContext.event.id,
  );

  return (
    <UnifiedEventDetailContainer
      event={eventContext.event}
      registration={eventContext.registration}
      isPastEvent={eventContext.isPastEvent}
      currentUserId={eventContext.currentUserId}
      upcomingEvents={upcomingEvents}
    />
  );
}
