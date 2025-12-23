import { getPastEvents, getUpcomingEvents } from "@/actions";
import { MAX_CART_QUANTITY } from "@/consts/performance";
import { AllEventsContainer } from "@/features/events";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pottery Workshops | Poetry & Pottery",
  description:
    "Explore our pottery workshops - upcoming sessions to join and past events from our community. From wheel throwing to glazing, discover hands-on experiences for all skill levels.",
  openGraph: {
    title: "Pottery Workshops | Poetry & Pottery",
    description:
      "Explore our pottery workshops - upcoming sessions to join and past events from our community.",
    type: "website",
    url: "/events",
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
  },
};

interface EventsPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams;
  const search = params.search || undefined;

  const [upcomingEventsResult, pastEventsResult] = await Promise.all([
    getUpcomingEvents(1, MAX_CART_QUANTITY, search),
    getPastEvents(1, 12, search),
  ]);

  return (
    <AllEventsContainer
      initialUpcomingEvents={upcomingEventsResult.data}
      initialUpcomingPagination={{
        total: upcomingEventsResult.total,
        totalPages: upcomingEventsResult.totalPages,
      }}
      initialPastEvents={pastEventsResult.data}
      initialPastPagination={{
        total: pastEventsResult.total,
        totalPages: pastEventsResult.totalPages,
      }}
    />
  );
}
