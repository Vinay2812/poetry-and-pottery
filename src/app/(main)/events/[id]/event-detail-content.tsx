import { getEventById } from "@/data/events/gateway/server";
import { UnifiedEventDetailContainer } from "@/features/events/containers/unified-event-detail-container";
import { notFound } from "next/navigation";

import {
  DEFAULT_SOCIAL_IMAGE,
  absoluteUrl,
  resolveSocialImageUrl,
} from "@/lib/seo";

import type { EventDetail } from "@/graphql/generated/types";

export interface EventDetailPageParams {
  id: string;
}

interface EventDetailContentProps {
  params: Promise<EventDetailPageParams>;
}

export async function EventDetailContent({ params }: EventDetailContentProps) {
  const { id } = await params;

  const eventResult = await getEventById(id);

  if (!eventResult.success) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildEventStructuredData(eventResult.data)),
        }}
      />
      <UnifiedEventDetailContainer event={eventResult.data} />
    </>
  );
}

function buildEventStructuredData(event: EventDetail) {
  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description:
      event.description?.trim() ||
      "Join this event hosted by Poetry & Pottery.",
    startDate: event.starts_at,
    endDate: event.ends_at,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location || "Poetry & Pottery",
      address: event.full_location || event.location || "Sangli, Maharashtra",
    },
    image: [resolveSocialImageUrl(event.image ?? DEFAULT_SOCIAL_IMAGE)],
    organizer: {
      "@type": "Organization",
      name: "Poetry & Pottery",
      url: absoluteUrl("/"),
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/events/${event.id}`),
      priceCurrency: "INR",
      price: event.price ?? 0,
      availability:
        event.available_seats > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
    },
  };

  return structuredData;
}
