"use client";

import type { EventRegistration } from "@/data/events/types";
import { useCreateEventReview } from "@/data/reviews/gateway/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { createDate } from "@/lib/date";
import { getEventTypeIcon, getEventTypeLabel } from "@/lib/event-utils";

import {
  CompletedEventCard,
  type CompletedEventCardViewModel,
} from "./completed-event-card";

interface CompletedEventCardContainerProps {
  registration: EventRegistration;
}

export function CompletedEventCardContainer({
  registration,
}: CompletedEventCardContainerProps) {
  const { event, has_reviewed: hasReviewed } = registration;
  const router = useRouter();
  const { mutate: createEventReviewMutate } = useCreateEventReview();
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const viewModel = useMemo<CompletedEventCardViewModel>(() => {
    const eventDate = createDate(event.ends_at);
    const formattedDate = eventDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const imageUrl = event.image || "/placeholder.jpg";
    const EventTypeIcon = getEventTypeIcon(event.event_type);
    const eventTypeLabel = getEventTypeLabel(event.event_type);

    return {
      eventId: event.id,
      title: event.title,
      imageUrl,
      formattedDate,
      location: event.location ?? null,
      level: event.level ?? null,
      EventTypeIcon,
      eventTypeLabel,
      hasReviewed: hasReviewed ?? false,
    };
  }, [event, hasReviewed]);

  const handleReviewSubmit = useCallback(
    async (rating: number, review?: string, imageUrls?: string[]) => {
      const result = await createEventReviewMutate({
        eventId: event.id,
        rating,
        review,
        imageUrls,
      });

      if (result.success) {
        setIsReviewDialogOpen(false);
        router.refresh();
      }

      return {
        success: result.success,
        error: result.success ? undefined : result.error,
      };
    },
    [event.id, router, createEventReviewMutate],
  );

  const handleReviewDialogOpenChange = useCallback((open: boolean) => {
    setIsReviewDialogOpen(open);
  }, []);

  return (
    <CompletedEventCard
      viewModel={viewModel}
      isReviewDialogOpen={isReviewDialogOpen}
      onReviewDialogOpenChange={handleReviewDialogOpenChange}
      onReviewSubmit={handleReviewSubmit}
    />
  );
}
