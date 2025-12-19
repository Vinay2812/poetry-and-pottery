"use client";

import type { RegistrationWithReviewStatus } from "@/actions";
import { createEventReview } from "@/actions";
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Star,
  Ticket,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface CompletedEventCardProps {
  registration: RegistrationWithReviewStatus;
}

export function CompletedEventCard({ registration }: CompletedEventCardProps) {
  const { event, hasReviewed } = registration;
  const router = useRouter();

  const [isReviewing, setIsReviewing] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmitReview = async () => {
    if (rating === 0 || !reviewText.trim()) return;

    setIsSubmitting(true);
    const result = await createEventReview({
      eventId: event.id,
      rating,
      review: reviewText.trim(),
    });

    if (result.success) {
      setIsReviewing(false);
      setRating(0);
      setReviewText("");
      router.refresh();
    }
    setIsSubmitting(false);
  };

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
            <Badge className="bg-primary-light flex items-center gap-0.5 border-0 px-1.5 py-0.5 text-[10px] text-white shadow-sm">
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
      <div className="flex items-center justify-end border-t border-gray-100 pt-2">
        {hasReviewed ? (
          <Badge
            variant="secondary"
            className="flex items-center gap-1 bg-amber-50 text-[10px] text-amber-600"
          >
            <Star className="h-2.5 w-2.5 fill-amber-500" />
            Reviewed
          </Badge>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:bg-primary/10 h-6 px-2 text-[11px]"
            onClick={(e) => {
              e.preventDefault();
              setIsReviewing(true);
            }}
          >
            <Star className="mr-1 h-3 w-3" />
            Add Review
          </Button>
        )}
      </div>

      {/* Review Form */}
      {isReviewing && (
        <div className="border-t border-gray-100 pt-3">
          {/* Star Rating */}
          <div className="mb-3 flex items-center gap-1">
            <span className="mr-2 text-xs text-gray-600">Your rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-0.5"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={cn(
                    "h-5 w-5 transition-colors",
                    (hoverRating || rating) >= star
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300",
                  )}
                />
              </button>
            ))}
          </div>

          {/* Review Text */}
          <textarea
            placeholder="Share your experience..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="focus:border-primary focus:ring-primary mb-3 w-full resize-none rounded-lg border border-gray-200 p-2 text-sm focus:ring-1 focus:outline-none"
            rows={3}
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsReviewing(false);
                setRating(0);
                setReviewText("");
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={rating === 0 || !reviewText.trim() || isSubmitting}
              onClick={handleSubmitReview}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
