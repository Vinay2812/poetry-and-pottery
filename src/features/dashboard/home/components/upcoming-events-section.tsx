import { ArrowRightIcon, CalendarIcon } from "lucide-react";
import Link from "next/link";

import type { UpcomingEventsSectionProps } from "../types";

export function UpcomingEventsSection({ events }: UpcomingEventsSectionProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-5 text-purple-600" />
          <h2 className="text-lg font-semibold">Upcoming Events</h2>
        </div>
        <Link
          href="/dashboard/events"
          className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
        >
          Manage <ArrowRightIcon className="size-3" />
        </Link>
      </div>
      {events.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center text-sm">
          No upcoming events
        </p>
      ) : (
        <div className="space-y-2">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between gap-4 rounded-xl bg-neutral-50 px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{event.title}</p>
                <p className="text-muted-foreground text-sm">
                  {new Date(event.starts_at).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
              <div className="text-right text-sm">
                <p className="font-medium">
                  {event.available_seats}/{event.total_seats} seats
                </p>
                {event._count.event_registrations > 0 && (
                  <p className="text-muted-foreground">
                    {event._count.event_registrations} registered
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
