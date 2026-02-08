import { getEventById } from "@/data/events/gateway/server";
import { UnifiedEventDetailContainer } from "@/features/events/containers/unified-event-detail-container";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { EventDetailSkeleton } from "@/components/skeletons";

import {
  DEFAULT_SOCIAL_IMAGE,
  absoluteUrl,
  resolveSocialImageUrl,
} from "@/lib/seo";

import type { EventDetail } from "@/graphql/generated/types";

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

// Generate dynamic metadata for SEO and social sharing
export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  const eventResult = await getEventById(id);

  if (!eventResult.success) {
    return {
      title: "Event Not Found | Poetry & Pottery",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const event = eventResult.data;
  const imageUrl = resolveSocialImageUrl(event.image ?? DEFAULT_SOCIAL_IMAGE);
  const canonicalUrl = absoluteUrl(`/events/${event.id}`);
  const description =
    event.description?.trim() ||
    `${event.title} pottery workshop by Poetry & Pottery.`;

  return {
    title: `${event.title} | Poetry & Pottery`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${event.title} | Poetry & Pottery`,
      description,
      type: "website",
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | Poetry & Pottery`,
      description,
      images: [imageUrl],
    },
  };
}

async function EventDetailContent({ params }: EventDetailPageProps) {
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

export default function EventDetailPage({ params }: EventDetailPageProps) {
  return (
    <Suspense fallback={<EventDetailSkeleton />}>
      <EventDetailContent params={params} />
    </Suspense>
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
