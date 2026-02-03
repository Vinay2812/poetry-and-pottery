"use client";

import type { EventRegistration, EventType } from "@/data/events/types";
import { useCreateEventReview } from "@/data/reviews/gateway/client";
import { Calendar, MapPin, Mic, Palette, Pencil, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { OptimizedImage, ReviewForm } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

function getEventTypeIcon(type: EventType) {
  switch (type) {
    case "OPEN_MIC":
      return <Mic className="h-3 w-3" />;
    case "POTTERY_WORKSHOP":
    default:
      return <Palette className="h-3 w-3" />;
  }
}

function getEventTypeLabel(type: EventType) {
  switch (type) {
    case "OPEN_MIC":
      return "Open Mic";
    case "POTTERY_WORKSHOP":
    default:
      return "Workshop";
  }
}

interface CompletedEventCardProps {
  registration: EventRegistration;
}

// Option B: Horizontal Card Layout for Completed Registrations
// Horizontal card with square thumbnail, completed badge, review status, and CTA.
export function CompletedEventCard({ registration }: CompletedEventCardProps) {
  const { event, has_reviewed: hasReviewed } = registration;
  const router = useRouter();
  const { mutate: createEventReviewMutate } = useCreateEventReview();
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const eventDate = new Date(event.ends_at);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const imageUrl = event.image || "/placeholder.jpg";

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

  return (
    <div className="flex gap-4 rounded-2xl bg-white p-3 lg:p-4 dark:bg-neutral-900">
      {/* Image Thumbnail */}
      <Link
        href={`/events/${event.id}`}
        className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100 lg:h-28 lg:w-28 dark:bg-neutral-800"
      >
        <OptimizedImage
          src={imageUrl}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Level Badge */}
        {event.level && (
          <div className="absolute top-2 left-2">
            <Badge
              className={cn(
                "rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase",
                event.level.toLowerCase() === "beginner" &&
                  "bg-primary text-white",
                event.level.toLowerCase() === "intermediate" &&
                  "bg-amber-500 text-white",
                event.level.toLowerCase() === "advanced" &&
                  "bg-red-500 text-white",
                event.level.toLowerCase() === "all_levels" &&
                  "bg-blue-500 text-white",
              )}
            >
              {event.level.replace("_", " ")}
            </Badge>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        {/* Top section */}
        <div>
          {/* Header: Title + Type + Completed Badge */}
          <div className="mb-1.5 flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <Link
                href={`/events/${event.id}`}
                className="font-display line-clamp-2 text-sm leading-snug font-semibold text-neutral-900 hover:underline lg:text-base dark:text-neutral-100"
              >
                {event.title}
              </Link>
              {/* Event Type */}
              <span className="text-primary mt-0.5 flex items-center gap-1 text-[10px] font-medium lg:text-xs">
                {getEventTypeIcon(event.event_type)}
                <span>{getEventTypeLabel(event.event_type)}</span>
              </span>
            </div>
            <Badge className="shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-600">
              Completed
            </Badge>
          </div>

          {/* Attended Date */}
          <div className="mb-1 flex items-center gap-1.5 text-xs text-neutral-500 lg:text-sm">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>Attended {formattedDate}</span>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 lg:text-sm">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}
        </div>

        {/* Bottom row: Review Status + Action Button */}
        <div className="flex items-center justify-between gap-2">
          {/* Review Status */}
          <div>
            {hasReviewed ? (
              <div className="flex items-center gap-1 text-xs text-amber-600 lg:text-sm">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
                <span className="ml-1 text-neutral-500">Reviewed</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 lg:text-sm">
                <Pencil className="h-3.5 w-3.5" />
                <span>Review pending</span>
              </div>
            )}
          </div>

          {/* Action Button - Bottom right */}
          <div className="shrink-0">
            {hasReviewed ? (
              <Link href={`/events/${event.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-lg px-4 text-xs font-medium"
                >
                  View Review
                </Button>
              </Link>
            ) : (
              <Dialog
                open={isReviewDialogOpen}
                onOpenChange={setIsReviewDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="h-8 rounded-lg px-4 text-xs font-medium"
                  >
                    <Pencil className="mr-1.5 h-3.5 w-3.5" />
                    Write a Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-display">
                      {event.title}
                    </DialogTitle>
                  </DialogHeader>
                  <ReviewForm
                    title="Rate your experience"
                    hasReviewed={hasReviewed}
                    defaultOpen
                    onSubmit={handleReviewSubmit}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
