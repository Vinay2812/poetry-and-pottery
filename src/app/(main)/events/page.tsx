import { getPastEvents, getUpcomingEvents } from "@/actions";
import type { Metadata } from "next";

import { AllEventsClient } from "@/components/events";

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

export default async function EventsPage() {
  const [upcomingEvents, pastEventsResult] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ]);

  return (
    <AllEventsClient
      upcomingEvents={upcomingEvents}
      pastEvents={pastEventsResult.data}
    />
  );
}
