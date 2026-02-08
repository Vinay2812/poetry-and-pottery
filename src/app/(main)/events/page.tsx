import type { Metadata } from "next";
import { Suspense } from "react";

import { EventsSkeleton } from "@/components/skeletons";

import { absoluteUrl } from "@/lib/seo";

import { EventsContent, type EventsPageSearchParams } from "./events-content";

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
  searchParams: Promise<EventsPageSearchParams>;
}

export default function EventsPage({ searchParams }: EventsPageProps) {
  return (
    <Suspense fallback={<EventsSkeleton />}>
      <EventsContent searchParams={searchParams} />
    </Suspense>
  );
}
