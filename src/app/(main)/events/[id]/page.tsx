import { getEventById } from "@/data/events/gateway/server";
import { UnifiedEventDetailContainer } from "@/features/events/containers/unified-event-detail-container";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

// Generate dynamic metadata for SEO and social sharing
export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  const eventResult = await getEventById(id);

  if (!eventResult.success) {
    return {
      title: "Event Not Found | Poetry & Pottery",
    };
  }

  const event = eventResult.data;
  const imageUrl =
    event.image ||
    "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=800&fit=crop";

  return {
    title: `${event.title} | Poetry & Pottery`,
    description: event.description,
    openGraph: {
      title: `${event.title} | Poetry & Pottery`,
      description: event.description ?? undefined,
      type: "website",
      url: `/events/${event.id}`,
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
      description: event.description ?? undefined,
      images: [imageUrl],
    },
  };
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { id } = await params;

  // Fetch event data server-side for SEO
  // User context and upcoming events will be fetched client-side
  const eventResult = await getEventById(id);

  if (!eventResult.success) {
    notFound();
  }

  return <UnifiedEventDetailContainer event={eventResult.data} />;
}
