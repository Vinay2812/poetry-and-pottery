import { DEFAULT_PAGE_SIZE } from "@/consts/performance";
import { getUpcomingEvents } from "@/data/events/gateway/server";
import type { Metadata } from "next";
import { Suspense } from "react";

import { UpcomingEventsClient } from "@/components/events";
import { EventsSkeleton } from "@/components/skeletons";

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

async function UpcomingEventsContent() {
  const result = await getUpcomingEvents({ page: 1, limit: DEFAULT_PAGE_SIZE });

  const events = result.success ? result.data.data : [];
  const pagination = result.success
    ? { total: result.data.total, totalPages: result.data.total_pages }
    : { total: 0, totalPages: 0 };

  return (
    <UpcomingEventsClient
      initialEvents={events}
      initialPagination={pagination}
    />
  );
}

export default function UpcomingEventsPage() {
  return (
    <Suspense fallback={<EventsSkeleton />}>
      <UpcomingEventsContent />
    </Suspense>
  );
}
