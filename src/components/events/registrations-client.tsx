"use client";

import type {
  EventWithRegistrationCount,
  RegistrationWithEvent,
} from "@/types";
import { Calendar, Ticket } from "lucide-react";

import { EventCard, RegisteredEventCard } from "@/components/cards";
import { EventsListLayout } from "@/components/events";
import { EmptyState } from "@/components/sections";

interface RegistrationsClientProps {
  registrations: RegistrationWithEvent[];
  upcomingEvents?: EventWithRegistrationCount[];
}

export function RegistrationsClient({
  registrations,
  upcomingEvents = [],
}: RegistrationsClientProps) {
  const hasUpcomingEvents = upcomingEvents.length > 0;

  return (
    <EventsListLayout>
      {registrations.length === 0 ? (
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Empty State */}
          <div
            className={hasUpcomingEvents ? "lg:col-span-2" : "lg:col-span-5"}
          >
            <div className="border-border bg-muted/30 flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed p-6">
              <EmptyState
                icon={Calendar}
                title="No Registrations Yet"
                description="You haven't registered for any workshops yet. Browse our upcoming sessions to get started!"
                actionText="Browse All Workshops"
                actionHref="/events/upcoming"
              />
            </div>
          </div>

          {/* Upcoming Events */}
          {hasUpcomingEvents && (
            <div className="lg:col-span-3">
              <h3 className="mb-4 text-lg font-semibold">Upcoming Workshops</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {upcomingEvents.slice(0, 4).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="text-muted-foreground mb-6 flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            <p className="text-sm">Your registered workshops and tickets.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {registrations.map((registration) => (
              <RegisteredEventCard
                key={registration.id}
                registration={registration}
              />
            ))}
          </div>
        </>
      )}
    </EventsListLayout>
  );
}
