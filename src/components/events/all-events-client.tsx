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
        <div className="space-y-8 lg:space-y-16">
          {/* Upcoming Events Section */}
          <section>
            <div className="mb-3 flex items-center gap-2 lg:mb-6">
              <Sparkles className="text-primary h-5 w-5" />
              <h2 className="text-xl font-bold tracking-tight lg:text-3xl">
                Upcoming Events
              </h2>
            </div>
            {hasUpcoming ? (
              <>
                <p className="text-muted-foreground mb-4 text-sm lg:mb-8 lg:text-base">
                  Reserve your spot in one of our upcoming pottery sessions.
                </p>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
              <div className="mb-3 flex items-center gap-2 lg:mb-6">
                <History className="h-5 w-5 text-neutral-400" />
                <h2 className="text-xl font-bold tracking-tight text-neutral-400 lg:text-3xl">
                  Past Events
                </h2>
              </div>
              <p className="mb-4 text-sm text-neutral-400 lg:mb-8 lg:text-base">
                Explore our previous workshops and the amazing pieces created by
                our community.
              </p>
              <div className="grid grid-cols-1 gap-y-6 opacity-75 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
