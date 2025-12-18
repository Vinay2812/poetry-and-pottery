import { EventService } from "@/services";
import type { Metadata } from "next";

import { UpcomingEventsClient } from "@/components/events";

export const metadata: Metadata = {
  title: "Upcoming Pottery Workshops | Poetry & Pottery",
  description:
    "Join our upcoming pottery workshops and learn the art of ceramics. From wheel throwing to glazing, discover hands-on experiences for all skill levels.",
  openGraph: {
    title: "Upcoming Pottery Workshops | Poetry & Pottery",
    description:
      "Join our upcoming pottery workshops and learn the art of ceramics. From wheel throwing to glazing, discover hands-on experiences for all skill levels.",
    type: "website",
    url: "/events/upcoming",
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
    title: "Upcoming Pottery Workshops | Poetry & Pottery",
    description:
      "Join our upcoming pottery workshops and learn the art of ceramics.",
  },
};

export default async function UpcomingEventsPage() {
  const events = await EventService.getUpcomingEvents();

  return <UpcomingEventsClient events={events} />;
}
