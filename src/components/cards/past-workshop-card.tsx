import type { EventBase, EventType } from "@/data/events/types";
import {
  Calendar,
  Image as ImageIcon,
  MapPin,
  Mic,
  Palette,
  Star,
} from "lucide-react";
import Link from "next/link";

import { OptimizedImage } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

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

interface PastWorkshopCardProps {
  event: EventBase;
}

export function PastWorkshopCard({ event }: PastWorkshopCardProps) {
  const eventDate = new Date(event.ends_at);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const imageUrl = event.image || "/placeholder.jpg";
  const gallery = event.gallery || [];
  const hasGallery = gallery.length > 0;

  return (
    <Link
      href={`/events/${event.id}`}
      className="group flex gap-4 rounded-2xl bg-white p-3 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] lg:p-4 dark:bg-neutral-900"
    >
      {/* Image Thumbnail */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100 lg:h-28 lg:w-28 dark:bg-neutral-800">
        <OptimizedImage
          src={imageUrl}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gallery Badge */}
        {hasGallery && (
          <div className="absolute top-2 left-2">
            <Badge className="flex items-center gap-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
              <ImageIcon className="h-3 w-3" />
              {gallery.length}
            </Badge>
          </div>
        )}

        {/* Completed Overlay */}
        <div className="absolute inset-0 bg-black/20" />
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

        {/* Date */}
        <div className="mb-1 flex items-center gap-1.5 text-xs text-neutral-500 lg:text-sm">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span>Held on {formattedDate}</span>
        </div>

        {/* Location */}
        {event.location && (
          <div className="mb-2 flex items-center gap-1.5 text-xs text-neutral-500 lg:text-sm">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        )}

        {/* Footer: Attendees + Rating */}
        <div className="mt-auto flex items-center justify-between">
          {/* Attendees */}
          <span className="text-xs font-medium text-neutral-500 lg:text-sm">
            {event.registrations_count} attended
          </span>

          {/* Rating */}
          {event.avg_rating ? (
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium text-neutral-700 lg:text-sm">
                {event.avg_rating.toFixed(1)}
              </span>
              {event.reviews_count > 0 && (
                <span className="text-xs text-neutral-400">
                  ({event.reviews_count})
                </span>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
