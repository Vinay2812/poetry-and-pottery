"use client";

import { Sparkles } from "lucide-react";

import { EventCard } from "@/components/cards";
import { EventsListLayout } from "@/components/events-list-layout";

import { EVENTS } from "@/lib/constants";

export default function UpcomingEventsPage() {
  return (
    <EventsListLayout>
      <div className="text-muted-foreground mb-6 flex items-center gap-2">
        <Sparkles className="h-5 w-5" />
        <p className="text-sm">
          Reserve your spot in one of our upcoming pottery sessions.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EVENTS.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </EventsListLayout>
  );
}
