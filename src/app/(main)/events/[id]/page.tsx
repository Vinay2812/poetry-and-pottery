"use server";

import {
  getEventWithUserContext,
  getUpcomingEvents,
} from "@/data/events/gateway/server";
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
  const [eventContextResult, upcomingEventsResult] = await Promise.all([
    getEventWithUserContext(id),
    getUpcomingEvents({ page: 1, limit: 3 }),
  ]);

  if (!eventContextResult.success || !upcomingEventsResult.success) {
    notFound();
  }

  const eventContext = eventContextResult.data;

  // Fetch upcoming events for recommendations
  const upcomingEvents = upcomingEventsResult.success
    ? upcomingEventsResult.data.data.filter(
        (e) => e.id !== eventContext.event.id,
      )
    : [];

  return (
    <UnifiedEventDetailContainer
      event={eventContext.event}
      registration={eventContext.registration ?? null}
      isPastEvent={eventContext.is_past_event}
      currentUserId={eventContext.current_user_id ?? null}
      upcomingEvents={upcomingEvents}
    />
  );
}
