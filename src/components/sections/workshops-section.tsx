"use client";

import { ArrowRight, Mic, Palette } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { type EventBase, EventType } from "@/graphql/generated/graphql";

import { OptimizedImage } from "../shared";

function formatEventDate(dateStr: Date | string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatEventLevel(level: string | null | undefined): string {
  if (!level) return "";
  return level.charAt(0) + level.slice(1).toLowerCase();
}

function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

function getEventTypeIcon(type: EventType) {
  switch (type) {
    case EventType.OpenMic:
      return <Mic className="h-3 w-3" />;
    case EventType.PotteryWorkshop:
    default:
      return <Palette className="h-3 w-3" />;
  }
}

interface EventCardProps {
  event: EventBase;
}

function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="bg-primary-lighter group shadow-soft hover:shadow-card flex items-center gap-4 rounded-2xl p-4 transition-all duration-200 lg:p-5"
    >
      <span className="relative aspect-4/3 w-16 overflow-hidden text-2xl lg:text-3xl">
        <OptimizedImage
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="rounded-lg object-cover"
        />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-primary">
            {getEventTypeIcon(event.event_type)}
          </span>
          <h3 className="font-display truncate text-sm font-semibold text-stone-900 lg:text-base">
            {event.title}
          </h3>
        </div>
        <p className="text-muted-foreground mt-0.5 text-xs lg:text-sm">
          {formatEventDate(event.starts_at)}
          {event.level && <> • {formatEventLevel(event.level)}</>}
          <span className="hidden lg:inline">
            {" "}
            • {formatPrice(event.price)}
          </span>
        </p>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="border-primary/20 text-primary hover:bg-primary hidden shrink-0 rounded-lg transition-colors hover:text-white lg:inline-flex"
        asChild
      >
        <span>Book</span>
      </Button>
    </Link>
  );
}

interface EventCategoryProps {
  title: string;
  events: EventBase[];
  viewAllHref: string;
}

function EventCategory({ title, events, viewAllHref }: EventCategoryProps) {
  if (events.length === 0) return null;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between lg:mb-4">
        <h3 className="text-sm font-semibold text-stone-700 lg:text-base">
          {title}
        </h3>
        <Link
          href={viewAllHref}
          className="text-primary hover:text-primary-hover text-xs font-medium transition-colors"
        >
          View All →
        </Link>
      </div>
      <div className="space-y-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

interface WorkshopsSectionProps {
  potteryEvents: EventBase[];
  poetryEvents: EventBase[];
}

export function WorkshopsSection({
  potteryEvents,
  poetryEvents,
}: WorkshopsSectionProps) {
  if (potteryEvents.length === 0 && poetryEvents.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between lg:mb-6">
        <h2 className="font-display text-xl font-bold tracking-tight lg:text-2xl">
          <span className="hidden lg:inline">Upcoming </span>Events
        </h2>
      </div>

      <div className="space-y-6">
        <EventCategory
          title="Pottery Workshops"
          events={potteryEvents}
          viewAllHref={`/events/upcoming?type=workshop`}
        />
        <EventCategory
          title="Poetry Open Mics"
          events={poetryEvents}
          viewAllHref={`/events/upcoming?type=open_mic`}
        />
      </div>
    </div>
  );
}
