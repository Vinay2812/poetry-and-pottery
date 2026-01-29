"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import type { EventBase } from "@/graphql/generated/graphql";

import { OptimizedImage } from "../shared";

function formatEventDate(dateStr: Date | string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatEventLevel(level: string): string {
  return level.charAt(0) + level.slice(1).toLowerCase();
}

function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

interface WorkshopsSectionProps {
  events: EventBase[];
}

export function WorkshopsSection({ events }: WorkshopsSectionProps) {
  if (events.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between lg:mb-6">
        <h2 className="font-display text-xl font-bold tracking-tight lg:text-2xl">
          <span className="hidden lg:inline">Upcoming </span>Workshops
        </h2>
        <Link
          href="/events/upcoming"
          className="text-primary hover:text-primary-hover group flex items-center gap-1 text-sm font-medium transition-colors"
        >
          <span className="hidden lg:inline">View </span>All
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="space-y-3 lg:space-y-4">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.slug}`}
            className="group shadow-soft hover:shadow-card flex items-center gap-4 rounded-2xl bg-white p-4 transition-all duration-200 lg:p-5"
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
              <h3 className="font-display truncate text-sm font-semibold text-stone-900 lg:text-base">
                {event.title}
              </h3>
              <p className="text-muted-foreground mt-0.5 text-xs lg:text-sm">
                {formatEventDate(event.starts_at)} •{" "}
                {formatEventLevel(event.level)}
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
        ))}
      </div>
    </div>
  );
}
