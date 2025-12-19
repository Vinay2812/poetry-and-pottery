"use client";

import type { EventWithRegistrationCount } from "@/types";
import { Calendar, History, Sparkles } from "lucide-react";

import { EventCard, PastWorkshopCard } from "@/components/cards";
import { EventsListLayout } from "@/components/events";
import { EmptyState } from "@/components/sections";

interface AllEventsClientProps {
  upcomingEvents: EventWithRegistrationCount[];
  pastEvents: EventWithRegistrationCount[];
}

export function AllEventsClient({
  upcomingEvents,
  pastEvents,
}: AllEventsClientProps) {
  const hasUpcoming = upcomingEvents.length > 0;
  const hasPast = pastEvents.length > 0;
  const hasNoEvents = !hasUpcoming && !hasPast;

  return (
    <EventsListLayout>
      {hasNoEvents ? (
        <EmptyState
          icon={Calendar}
          title="No events available"
          description="Check back soon for new workshops and events."
        />
      ) : (
        <div className="space-y-10">
          {/* Upcoming Events Section */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="text-primary h-5 w-5" />
              <h2 className="text-lg font-semibold">Upcoming Events</h2>
            </div>
            {hasUpcoming ? (
              <>
                <p className="text-muted-foreground mb-4 text-sm">
                  Reserve your spot in one of our upcoming pottery sessions.
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-muted/50 rounded-xl border border-dashed p-8 text-center">
                <Sparkles className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                <p className="text-muted-foreground text-sm">
                  No upcoming events at the moment. Check back soon!
                </p>
              </div>
            )}
          </section>

          {/* Past Events Section */}
          {hasPast && (
            <section>
              <div className="mb-4 flex items-center gap-2">
                <History className="text-muted-foreground h-5 w-5" />
                <h2 className="text-muted-foreground text-lg font-semibold">
                  Past Events
                </h2>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">
                Explore our previous workshops and the amazing pieces created by
                our community.
              </p>
              <div className="grid gap-4 opacity-75 sm:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event) => (
                  <PastWorkshopCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </EventsListLayout>
  );
}
