import { getEventById } from "@/data/events/gateway/server";
import type { Metadata } from "next";
import { Suspense } from "react";

import { EventDetailSkeleton } from "@/components/skeletons";

import {
  DEFAULT_SOCIAL_IMAGE,
  absoluteUrl,
  resolveSocialImageUrl,
} from "@/lib/seo";

import {
  EventDetailContent,
  type EventDetailPageParams,
} from "./event-detail-content";

interface EventDetailPageProps {
  params: Promise<EventDetailPageParams>;
}

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

export default function EventDetailPage({ params }: EventDetailPageProps) {
  return (
    <Suspense fallback={<EventDetailSkeleton />}>
      <EventDetailContent params={params} />
    </Suspense>
  );
}
