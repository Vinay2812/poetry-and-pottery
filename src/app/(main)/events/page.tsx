import { DEFAULT_EVENTS_LIMIT } from "@/consts/performance";
import { getUpcomingEvents } from "@/data/events/gateway/server";
import { AllEventsContainer } from "@/features/events";
import type { Metadata } from "next";
import { Suspense } from "react";

import { EventsSkeleton } from "@/components/skeletons";

import { absoluteUrl, resolveSocialImageUrl } from "@/lib/seo";

import type { EventBase } from "@/graphql/generated/types";

export const metadata: Metadata = {
  title: "Pottery Workshops | Poetry & Pottery",
  description:
    "Explore our pottery workshops - upcoming sessions to join and past events from our community. From wheel throwing to glazing, discover hands-on experiences for all skill levels.",
  keywords: [
    "pottery workshops",
    "ceramic classes",
    "pottery events",
    "hands-on pottery training",
    "creative workshops",
  ],
  alternates: {
    canonical: absoluteUrl("/events"),
  },
  openGraph: {
    title: "Pottery Workshops | Poetry & Pottery",
    description:
      "Explore our pottery workshops - upcoming sessions to join and past events from our community.",
    type: "website",
    url: absoluteUrl("/events"),
    images: [
      {
        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Pottery Workshop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pottery Workshops | Poetry & Pottery",
    description:
      "Explore our pottery workshops - upcoming sessions and past events.",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=630&fit=crop",
    ],
  },
};

interface EventsPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

async function EventsContent({ searchParams }: EventsPageProps) {
  const params = await searchParams;
  const search = params.search || undefined;

  const upcomingEventsResult = await getUpcomingEvents({
    page: 1,
    limit: DEFAULT_EVENTS_LIMIT,
    search,
  });

  const upcomingEvents = upcomingEventsResult.success
    ? upcomingEventsResult.data.data
    : [];
  const upcomingPagination = upcomingEventsResult.success
    ? {
        total: upcomingEventsResult.data.total,
        totalPages: upcomingEventsResult.data.total_pages,
      }
    : { total: 0, totalPages: 0 };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildEventsStructuredData(upcomingEvents)),
        }}
      />
      <AllEventsContainer
        initialUpcomingEvents={upcomingEvents}
        initialUpcomingPagination={upcomingPagination}
      />
    </>
  );
}

export default function EventsPage({ searchParams }: EventsPageProps) {
  return (
    <Suspense fallback={<EventsSkeleton />}>
      <EventsContent searchParams={searchParams} />
    </Suspense>
  );
}

function buildEventsStructuredData(events: EventBase[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Pottery Workshops and Events",
    url: absoluteUrl("/events"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: events.slice(0, 24).map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/events/${event.id}`),
        item: {
          "@type": "Event",
          name: event.title,
          startDate: event.starts_at,
          endDate: event.ends_at,
          location: {
            "@type": "Place",
            name: event.location || "Poetry & Pottery",
            address: event.full_location || event.location || "Sangli, India",
          },
          image: [resolveSocialImageUrl(event.image)],
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: event.price,
          },
        },
      })),
    },
  };
}
