import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

import { Event } from "@/lib/constants";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={`/events/upcoming/${event.id}`}
      className="group shadow-soft hover:shadow-card block overflow-hidden rounded-2xl bg-white transition-shadow duration-200"
    >
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="text-foreground bg-white/90 backdrop-blur-sm hover:bg-white">
            ₹{event.price.toFixed(0)}
          </Badge>
        </div>

        {/* Title and Date on Image */}
        <div className="absolute right-0 bottom-0 left-0 p-4">
          <h3 className="mb-1 text-lg font-semibold text-white">
            {event.title}
          </h3>
          <div className="flex items-center gap-1 text-sm text-white/90">
            <Calendar className="h-3.5 w-3.5" />
            {event.date}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Time and Duration */}
        <div className="text-muted-foreground mb-3 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
          {event.duration && (
            <div className="flex items-center gap-1.5">
              <span>•</span>
              <span>{event.duration}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {event.spotsLeft && (
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary text-xs"
            >
              {event.spotsLeft} spots left
            </Badge>
          )}
          {event.level && (
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary text-xs"
            >
              {event.level}
            </Badge>
          )}
          {event.location && (
            <Badge
              variant="secondary"
              className="text-muted-foreground text-xs"
            >
              <MapPin className="mr-1 h-3 w-3" />
              {event.location.split(",")[0]}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
