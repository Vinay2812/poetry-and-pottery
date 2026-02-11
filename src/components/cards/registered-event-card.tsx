"use client";

import {
  type EventRegistration,
  EventRegistrationStatus,
} from "@/data/events/types";
import { Calendar, MapPin, Mic, Palette, Ticket } from "lucide-react";
import Link from "next/link";

import { OptimizedImage } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { createDate } from "@/lib/date";
import { getEventTypeLabel } from "@/lib/event-utils";
import { cn } from "@/lib/utils";

interface RegisteredEventCardProps {
  registration: EventRegistration;
  onCancel?: (registrationId: string) => void;
}

function getStatusConfig(status: EventRegistrationStatus) {
  switch (status) {
    case EventRegistrationStatus.Pending:
      return {
        label: "Pending",
        className: "bg-amber-100 text-amber-800",
      };
    case EventRegistrationStatus.Approved:
      return {
        label: "Approved",
        className: "bg-blue-100 text-blue-800",
      };
    case EventRegistrationStatus.Paid:
      return {
        label: "Paid",
        className: "bg-teal-100 text-teal-800",
      };
    case EventRegistrationStatus.Confirmed:
      return {
        label: "Confirmed",
        className: "bg-emerald-100 text-emerald-800",
      };
    case EventRegistrationStatus.Cancelled:
      return {
        label: "Cancelled",
        className: "bg-neutral-100 text-neutral-500",
      };
    case EventRegistrationStatus.Rejected:
      return {
        label: "Rejected",
        className: "bg-red-100 text-red-800",
      };
    default:
      return {
        label: status,
        className: "bg-neutral-100 text-neutral-600",
      };
  }
}

// Option B: Horizontal Card Layout for Upcoming Registrations
// Horizontal card with square thumbnail, status badge, registration details, and action buttons.
export function RegisteredEventCard({
  registration,
  onCancel,
}: RegisteredEventCardProps) {
  const { event, status, id: registrationId } = registration;
  const statusConfig = getStatusConfig(status);

  const eventDate = createDate(event.starts_at);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const isOpenMic = event.event_type === "OPEN_MIC";
  const imageUrl = event.image || "/placeholder.jpg";
  const isConfirmed = status === EventRegistrationStatus.Confirmed;
  const isPaid = status === EventRegistrationStatus.Paid;
  const isCancelled = status === EventRegistrationStatus.Cancelled;
  const canCancel =
    status === EventRegistrationStatus.Pending ||
    status === EventRegistrationStatus.Approved;

  return (
    <div
      className={cn(
        "flex gap-4 rounded-2xl bg-white p-3 lg:p-4 dark:bg-neutral-900",
        isCancelled && "opacity-60",
      )}
    >
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

        {/* Level Badge - Only for workshops */}
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
          {/* Header: Title + Type + Status */}
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
                {isOpenMic ? (
                  <Mic className="h-3 w-3" />
                ) : (
                  <Palette className="h-3 w-3" />
                )}
                <span>{getEventTypeLabel(event.event_type)}</span>
              </span>
            </div>
            <Badge
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                statusConfig.className,
              )}
            >
              {statusConfig.label}
            </Badge>
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
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 lg:text-sm">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}
        </div>

        {/* Bottom row: Registration ID + Action Buttons */}
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[10px] text-neutral-400 lg:text-xs">
            Reg #{registrationId.toUpperCase().slice(0, 12)}
          </p>

          {/* Action Buttons - Bottom right */}
          <div className="flex shrink-0 gap-2">
            {isConfirmed || isPaid ? (
              <Link href={`/events/${event.id}`}>
                <Button
                  size="sm"
                  className="h-8 rounded-lg px-4 text-xs font-medium"
                >
                  <Ticket className="mr-1.5 h-3.5 w-3.5" />
                  View Ticket
                </Button>
              </Link>
            ) : (
              <>
                <Link href={`/events/${event.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-lg px-4 text-xs font-medium"
                  >
                    View Details
                  </Button>
                </Link>
                {canCancel && onCancel && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 rounded-lg px-3 text-xs font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => onCancel(registrationId)}
                  >
                    Cancel
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
