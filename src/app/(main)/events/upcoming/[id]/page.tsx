import { EventService } from "@/services";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventDetailClient } from "@/components/events";

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = await EventService.getEventBySlug(id);

  if (!event) {
    return {
      title: "Event Not Found | Poetry & Pottery",
    };
  }

  return {
    title: `${event.title} | Poetry & Pottery`,
    description: event.description,
    openGraph: {
      title: `${event.title} | Poetry & Pottery`,
      description: event.description || undefined,
      type: "website",
      url: `/events/upcoming/${event.slug}`,
      images: event.image
        ? [
            {
              url: event.image,
              width: 1200,
              height: 630,
              alt: event.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | Poetry & Pottery`,
      description: event.description || undefined,
    },
  };
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { id } = await params;

  // Try to fetch by slug first, then by ID
  let event = await EventService.getEventBySlug(id);
  if (!event) {
    event = await EventService.getEventById(id);
  }

  if (!event) {
    notFound();
  }

  // Get other upcoming events for recommendations (exclude current event)
  const allUpcomingEvents = await EventService.getUpcomingEvents(3);
  const otherEvents = allUpcomingEvents.filter((e) => e.id !== event.id);

  return <EventDetailClient event={event} otherEvents={otherEvents} />;
}
