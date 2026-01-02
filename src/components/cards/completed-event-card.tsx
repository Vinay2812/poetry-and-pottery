"use client";

import { createEventReview } from "@/data/reviews/gateway/server";
import type { EventRegistration } from "@/data/events/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { ReviewForm } from "@/components/shared";

import { cn } from "@/lib/utils";

import {
  CompletedBadge,
  EventCardContent,
  EventCardDescription,
  EventCardFooter,
  EventCardImage,
  EventCardMeta,
  EventCardWrapperWithActions,
  PricePill,
} from "./event";

interface CompletedEventCardProps {
  registration: EventRegistration;
}

export function CompletedEventCard({ registration }: CompletedEventCardProps) {
  const { event, has_reviewed: hasReviewed } = registration;
  const router = useRouter();

  const eventDate = new Date(event.ends_at);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const imageUrl = event.image || "/placeholder.jpg";

  const handleReviewSubmit = useCallback(
    async (rating: number, review?: string, imageUrls?: string[]) => {
      const result = await createEventReview({
        eventId: event.id,
        rating,
        review,
        imageUrls,
      });

      if (result.success) {
        router.refresh();
      }

      return {
        success: result.success,
        error: result.success ? undefined : result.error,
      };
    },
    [event.id, router],
  );

  return (
    <EventCardWrapperWithActions>
      <Link
        href={`/events/${event.id}`}
        className="flex flex-col gap-3 lg:gap-4"
      >
        <EventCardImage
          src={imageUrl}
          alt={event.title}
          topLeftBadge={<CompletedBadge />}
          bottomRightBadge={<PricePill price={registration.price} />}
        />

        <EventCardContent>
          <EventCardMeta
            title={event.title}
            date={formattedDate}
            time={formattedTime}
          />
          <EventCardDescription description={event.description} />
          <EventCardFooter
            location={event.location}
            seatsReserved={registration.seats_reserved}
          />
        </EventCardContent>
      </Link>

      <div className={cn("px-5 pb-5", hasReviewed && "px-5")}>
        <div className="border-t border-neutral-100 pt-3 dark:border-neutral-800">
          <ReviewForm
            title={`Review ${event.title}`}
            hasReviewed={hasReviewed}
            onSubmit={handleReviewSubmit}
          />
        </div>
      </div>
    </EventCardWrapperWithActions>
  );
}
