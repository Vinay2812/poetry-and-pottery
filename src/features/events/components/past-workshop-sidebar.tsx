import type { EventBase } from "@/data/events/types";
import { CheckCircle2, Star } from "lucide-react";
import Link from "next/link";

import { OptimizedImage } from "@/components/shared";
import { Button } from "@/components/ui/button";

import type { FormattedReview, PastWorkshopDetailViewModel } from "../types";
import { formatEventDate } from "../types";

interface UpcomingEventCardProps {
  event: EventBase;
}

function UpcomingEventCard({ event }: UpcomingEventCardProps) {
  const formattedDate = formatEventDate(event.starts_at);
  const imageUrl = event.image || "/placeholder.jpg";

  return (
    <Link
      href={`/events/${event.id}`}
      className="group flex gap-3 py-2 transition-colors"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
        <OptimizedImage
          src={imageUrl}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="line-clamp-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {event.title}
        </h4>
        <p className="text-xs text-neutral-500">{formattedDate}</p>
      </div>
      <span className="text-primary shrink-0 text-sm font-semibold">
        ₹{event.price.toLocaleString()}
      </span>
    </Link>
  );
}

interface PastWorkshopSidebarProps {
  isOpenMic: boolean;
  attendees: number;
  reviews: FormattedReview[];
  averageRating: number;
  upcomingEvents: EventBase[];
}

export function PastWorkshopSidebar({
  isOpenMic,
  attendees,
  reviews,
  averageRating,
  upcomingEvents,
}: PastWorkshopSidebarProps) {
  return (
    <div className="hidden lg:block">
      <div className="sticky top-24">
        {/* Completed Status */}
        <div className="mb-4 flex items-center gap-2 text-emerald-600">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-semibold">
            {isOpenMic ? "Event Completed" : "Workshop Completed"}
          </span>
        </div>

        {/* Summary */}
        <div className="mb-5 space-y-2.5">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Attendees</span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {attendees}
            </span>
          </div>
          {reviews.length > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Rating</span>
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  {averageRating.toFixed(1)}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mb-5 border-t border-neutral-100 dark:border-neutral-800" />

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="mb-4 space-y-1">
            {upcomingEvents.map((event) => (
              <UpcomingEventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        <Link href="/events/upcoming">
          <Button className="h-12 w-full rounded-xl text-sm font-bold">
            View Upcoming →
          </Button>
        </Link>
      </div>
    </div>
  );
}
