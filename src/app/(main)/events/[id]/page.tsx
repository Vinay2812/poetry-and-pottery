"use server";

import { getEventById } from "@/data/events/gateway/server";
import { UnifiedEventDetailContainer } from "@/features/events/containers/unified-event-detail-container";
import { notFound } from "next/navigation";

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { id } = await params;

  // Fetch event data server-side for SEO
  // User context and upcoming events will be fetched client-side
  const eventResult = await getEventById(id);

  if (!eventResult.success) {
    notFound();
  }

  return <UnifiedEventDetailContainer event={eventResult.data} />;
}
