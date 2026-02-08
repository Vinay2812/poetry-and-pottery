import { DEFAULT_EVENTS_LIMIT } from "@/consts/performance";
import { getUpcomingEvents } from "@/data/events/gateway/server";
import { AllEventsContainer } from "@/features/events";

import { absoluteUrl, resolveSocialImageUrl } from "@/lib/seo";

import type { EventBase } from "@/graphql/generated/types";

export interface EventsPageSearchParams {
  search?: string;
}

interface EventsContentProps {
  searchParams: Promise<EventsPageSearchParams>;
}

export async function EventsContent({ searchParams }: EventsContentProps) {
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
