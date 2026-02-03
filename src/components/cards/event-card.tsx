import type { EventBase, EventType } from "@/data/events/types";
import { Calendar, MapPin, Mic, Palette } from "lucide-react";
import Link from "next/link";

import { OptimizedImage } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

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

interface EventCardProps {
  event: EventBase;
}

// Option B: Horizontal Compact Card
// Horizontal layout with square image thumbnail. More compact, shows more events in less space.
// Good for mobile lists and sidebars. Image and content side by side.
export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.starts_at);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const availableSeats = event.available_seats;
  const isSoldOut = availableSeats === 0;
  const isLowStock =
    availableSeats != null && availableSeats <= 3 && !isSoldOut;

  return (
    <Link
      href={`/events/${event.id}`}
      className="group flex gap-4 rounded-2xl bg-white p-3 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] lg:p-4 dark:bg-neutral-900"
    >
      {/* Image Thumbnail */}
      <div
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100 lg:h-28 lg:w-28 dark:bg-neutral-800"
        style={{ viewTransitionName: `event-image-${event.id}` }}
      >
        <OptimizedImage
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Sold Out Overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="text-xs font-semibold text-white">SOLD OUT</span>
          </div>
        )}

        {/* Level Badge - Only for workshops, on image */}
        {!isSoldOut &&
          event.level &&
          event.event_type === "POTTERY_WORKSHOP" && (
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
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        {/* Header: Title + Type Badge */}
        <div className="mb-1.5 flex items-start justify-between gap-2">
          <h3 className="font-display line-clamp-2 text-sm leading-snug font-semibold text-neutral-900 lg:text-base dark:text-neutral-100">
            {event.title}
          </h3>
          {/* Event Type Badge */}
          <span className="text-primary flex shrink-0 items-center gap-1 text-[10px] font-medium lg:text-xs">
            {getEventTypeIcon(event.event_type)}
            <span className="hidden lg:inline">
              {getEventTypeLabel(event.event_type)}
            </span>
          </span>
        </div>

        {/* Date/Time */}
        <div className="mb-1 flex items-center gap-1.5 text-xs text-neutral-500 lg:text-sm">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span>
            {formattedDate} • {formattedTime}
          </span>
        </div>

        {/* Location */}
        {event.location && (
          <div className="mb-2 flex items-center gap-1.5 text-xs text-neutral-500 lg:text-sm">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        )}

        {/* Footer: Spots + Price */}
        <div className="mt-auto flex items-center justify-between">
          {/* Spots Remaining */}
          <span
            className={cn(
              "text-xs font-medium lg:text-sm",
              isSoldOut && "text-neutral-400",
              isLowStock && "text-amber-600",
              !isSoldOut && !isLowStock && "text-neutral-500",
            )}
          >
            {isSoldOut
              ? "No spots"
              : availableSeats != null
                ? `${availableSeats} spots`
                : ""}
          </span>

          {/* Price */}
          <span className="text-primary text-sm font-bold lg:text-base">
            ₹{event.price.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
