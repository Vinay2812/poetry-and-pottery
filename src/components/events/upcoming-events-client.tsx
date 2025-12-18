"use client";

import type { EventWithRegistrationCount } from "@/types";
import { Sparkles } from "lucide-react";

import { EventCard } from "@/components/cards";
import { EventsListLayout } from "@/components/events";
import { EmptyState } from "@/components/sections";

interface UpcomingEventsClientProps {
  events: EventWithRegistrationCount[];
}

export function UpcomingEventsClient({ events }: UpcomingEventsClientProps) {
  return (
    <EventsListLayout>
      <div className="text-muted-foreground mb-6 flex items-center gap-2">
        <Sparkles className="h-5 w-5" />
        <p className="text-sm">
          Reserve your spot in one of our upcoming pottery sessions.
        </p>
      </div>
      {events.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Sparkles}
          title="No upcoming events"
          description="Check back soon for new workshops and events."
        />
      )}
    </EventsListLayout>
  );
}
