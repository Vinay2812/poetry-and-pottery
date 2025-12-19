"use client";

import type { RegistrationWithReviewStatus } from "@/actions";
import { createEventReview } from "@/actions";
import { Calendar, CheckCircle2, Clock, MapPin, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { ReviewForm } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

interface CompletedEventCardProps {
  registration: RegistrationWithReviewStatus;
}

export function CompletedEventCard({ registration }: CompletedEventCardProps) {
  const { event, hasReviewed } = registration;
  const router = useRouter();

  // Format date and time
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
    async (rating: number, review?: string) => {
      const result = await createEventReview({
        eventId: event.id,
        rating,
        review,
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
    <div className="shadow-soft flex flex-col gap-2 overflow-hidden rounded-xl border border-gray-100 bg-white p-3">
      <Link href={`/events/past/${event.slug}`} className="group flex gap-4">
        {/* Image - Left Side */}
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Completed Badge */}
          <div className="absolute top-1.5 left-1.5">
            <Badge className="flex items-center gap-0.5 border-0 bg-emerald-500 px-1.5 py-0.5 text-[10px] text-white shadow-sm">
              <CheckCircle2 className="h-2.5 w-2.5" />
              Completed
            </Badge>
          </div>
        </div>

        {/* Content - Right Side */}
        <div className="flex min-w-0 flex-1 flex-col py-0.5">
          {/* Title */}
          <h3 className="line-clamp-1 text-[15px] font-semibold text-gray-900">
            {event.title}
          </h3>

          {/* Description */}
          {event.description && (
            <p className="mt-1 line-clamp-4 text-xs leading-relaxed text-gray-500">
              {event.description}
            </p>
          )}

          {/* Seats and Price Info */}
          <div className="mt-auto flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Ticket className="h-3.5 w-3.5" />
              <span>
                {registration.seats_reserved} seat
                {registration.seats_reserved > 1 ? "s" : ""}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              ₹{registration.price.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>

      {/* Bottom Row - Location, Date, Time */}
      <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2 text-[12px]">
        <div className="flex items-center gap-1 text-rose-600">
          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-rose-200 bg-rose-50">
            <MapPin className="h-2 w-2" />
          </div>
          <span>{event.location ? event.location.split(",")[0] : "TBA"}</span>
        </div>
        <div className="flex items-center gap-1 text-amber-600">
          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-amber-200 bg-amber-50">
            <Calendar className="h-2 w-2" />
          </div>
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1 text-sky-600">
          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-50">
            <Clock className="h-2 w-2" />
          </div>
          <span>{formattedTime}</span>
        </div>
      </div>

      {/* Review Section */}
      <ReviewForm
        title={`Review ${event.title}`}
        hasReviewed={hasReviewed}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
}
