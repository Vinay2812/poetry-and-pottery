import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Event } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export function EventCard({ event, isSelected, onSelect }: EventCardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl bg-white p-4 text-left transition-all",
        isSelected
          ? "ring-primary shadow-card ring-2"
          : "shadow-soft hover:shadow-card"
      )}
    >
      <button
        onClick={() => onSelect?.(event.id)}
        className="w-full text-left"
      >
        <div className="flex gap-4">
          <Link
            href={`/events/${event.id}`}
            className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl lg:h-32 lg:w-32"
          >
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </Link>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <Link
                  href={`/events/${event.id}`}
                  className="text-primary mb-1 font-semibold hover:underline"
                >
                  {event.title}
                </Link>
                <p className="text-muted-foreground mb-2 text-sm">
                  {event.date} • {event.time}
                </p>
              </div>
              {onSelect && (
                <div
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30"
                  )}
                >
                  {isSelected && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {event.spotsLeft && (
                  <Badge variant="outline" className="text-xs">
                    {event.spotsLeft} spots left
                  </Badge>
                )}
                {event.level && (
                  <Badge variant="secondary" className="text-xs">
                    {event.level}
                  </Badge>
                )}
              </div>
              <span className="text-primary font-semibold">
                ₹{event.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </button>
      <div className="border-border mt-3 border-t pt-3">
        <Link
          href={`/events/${event.id}`}
          className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
