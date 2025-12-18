import { EventService } from "@/services";
import type { Metadata } from "next";

import { PastWorkshopsClient } from "@/components/events";

export const metadata: Metadata = {
  title: "Past Workshops Gallery | Poetry & Pottery",
  description:
    "Explore our previous pottery workshops and see the amazing pieces created by our community. Browse photos and reviews from past sessions.",
  openGraph: {
    title: "Past Workshops Gallery | Poetry & Pottery",
    description:
      "Explore our previous pottery workshops and see the amazing pieces created by our community.",
    type: "website",
    url: "/events/past",
    images: [
      {
        url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Past Workshop Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Past Workshops Gallery | Poetry & Pottery",
    description:
      "Explore our previous pottery workshops and see the amazing pieces created by our community.",
  },
};

export default async function PastWorkshopsPage() {
  const { data: events } = await EventService.getPastEvents();

  return <PastWorkshopsClient events={events} />;
}
