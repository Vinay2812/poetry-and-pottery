import type { EventWithRegistrationCount } from "@/types";
import { Calendar, Images, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Rating } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

interface PastWorkshopCardProps {
  event: EventWithRegistrationCount;
}

export function PastWorkshopCard({ event }: PastWorkshopCardProps) {
  const eventDate = new Date(event.ends_at);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const imageUrl = event.image || "/placeholder.jpg";
  const attendees = event._count?.event_registrations || 0;
  const highlights = event.highlights || [];
  const gallery = event.gallery || [];

  return (
    <Link
      href={`/events/past/${event.slug}`}
      className="group shadow-soft hover:shadow-card flex flex-col gap-2 overflow-hidden rounded-xl border border-gray-100 bg-white p-3 transition-shadow duration-200"
    >
      <div className="flex gap-4">
        {/* Image - Left Side */}
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Gallery Count Badge */}
          {gallery.length > 0 && (
            <div className="absolute top-1.5 left-1.5">
              <Badge className="flex items-center gap-0.5 border-0 bg-white/90 px-1.5 py-0.5 text-[10px] text-gray-700 shadow-sm backdrop-blur-sm">
                <Images className="h-2.5 w-2.5" />
                {gallery.length}
              </Badge>
            </div>
          )}
        </div>

        {/* Content - Right Side */}
        <div className="flex min-w-0 flex-1 flex-col py-0.5">
          {/* Title */}
          <h3 className="line-clamp-1 text-[15px] font-semibold text-gray-900">
            {event.title}
          </h3>

          {/* Description */}
          {event.description && (
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
              {event.description}
            </p>
          )}

          {/* Attendees and Rating Info */}
          <div className="mt-auto flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Users className="h-3.5 w-3.5" />
              <span>{attendees} attended</span>
            </div>
            {event.averageRating &&
              event._count?.reviews &&
              event._count.reviews > 0 && (
                <Rating
                  rating={event.averageRating}
                  reviewCount={event._count.reviews}
                  size="sm"
                />
              )}
          </div>
        </div>
      </div>

      {/* Bottom Row - Date and Highlights */}
      <div className="mt-2 flex items-center gap-3 border-t border-gray-100 pt-2">
        <div className="flex shrink-0 items-center gap-1 text-[12px] text-amber-600">
          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-amber-200 bg-amber-50">
            <Calendar className="h-2 w-2" />
          </div>
          <span className="whitespace-nowrap">{formattedDate}</span>
        </div>

        {/* Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="flex min-w-0 flex-1 gap-1 overflow-hidden">
            {highlights.slice(0, 2).map((highlight, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-primary/10 text-primary shrink-0 truncate px-1.5 py-0 text-[10px]"
              >
                {highlight.length > 20
                  ? `${highlight.slice(0, 20)}...`
                  : highlight}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
