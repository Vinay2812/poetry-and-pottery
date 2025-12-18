"use client";

import type { EventWithRegistrationCount } from "@/types";
import { History } from "lucide-react";

import { PastWorkshopCard } from "@/components/cards";
import { EventsListLayout } from "@/components/events";
import { EmptyState } from "@/components/sections";

interface PastWorkshopsClientProps {
  events: EventWithRegistrationCount[];
}

export function PastWorkshopsClient({ events }: PastWorkshopsClientProps) {
  return (
    <EventsListLayout>
      <div className="text-muted-foreground mb-6 flex items-center gap-2">
        <History className="h-5 w-5" />
        <p className="text-sm">
          Explore our previous workshops and the amazing pieces created by our
          community.
        </p>
      </div>
      {events.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <PastWorkshopCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={History}
          title="No past workshops"
          description="Check back later for gallery highlights from our workshops."
        />
      )}
    </EventsListLayout>
  );
}
