import { getEventById, getEventBySlug, getUpcomingEvents } from "@/actions";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PastWorkshopDetailClient } from "@/components/events";

interface PastWorkshopDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PastWorkshopDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const workshop = await getEventBySlug(id);

  if (!workshop) {
    return {
      title: "Workshop Not Found | Poetry & Pottery",
    };
  }

  return {
    title: `${workshop.title} | Past Workshop | Poetry & Pottery`,
    description: workshop.description,
    openGraph: {
      title: `${workshop.title} | Past Workshop | Poetry & Pottery`,
      description: workshop.description || undefined,
      type: "website",
      url: `/events/past/${workshop.slug}`,
      images: workshop.image
        ? [
            {
              url: workshop.image,
              width: 1200,
              height: 630,
              alt: workshop.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${workshop.title} | Past Workshop | Poetry & Pottery`,
      description: workshop.description || undefined,
    },
  };
}

export default async function PastWorkshopDetailPage({
  params,
}: PastWorkshopDetailPageProps) {
  const { id } = await params;

  // Try to fetch by slug first, then by ID
  let workshop = await getEventBySlug(id);
  if (!workshop) {
    workshop = await getEventById(id);
  }

  if (!workshop) {
    notFound();
  }

  // Get upcoming events for recommendations
  const upcomingEvents = await getUpcomingEvents(2);

  return (
    <PastWorkshopDetailClient
      workshop={workshop}
      upcomingEvents={upcomingEvents}
    />
  );
}
