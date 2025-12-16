"use client";

import { Calendar, Ticket } from "lucide-react";

import { RegisteredEventCard } from "@/components/cards";
import { EventsListLayout } from "@/components/events-list-layout";
import { EmptyState } from "@/components/sections";

import { EVENTS, REGISTERED_EVENTS } from "@/lib/constants";

export default function RegistrationsPage() {
  const registeredEventsData = REGISTERED_EVENTS.map((reg) => ({
    ...reg,
    event: EVENTS.find((e) => e.id === reg.eventId),
  })).filter((reg) => reg.event);

  return (
    <EventsListLayout>
      {registeredEventsData.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No Registrations Yet"
          description="You haven't registered for any workshops yet. Browse our upcoming sessions to get started!"
          actionText="Browse Workshops"
          actionHref="/events/upcoming"
        />
      ) : (
        <>
          <div className="text-muted-foreground mb-6 flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            <p className="text-sm">Your registered workshops and tickets.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {registeredEventsData.map(
              ({ id, event, status, ticketNumber, registrationDate }) => (
                <RegisteredEventCard
                  key={id}
                  registrationId={id}
                  event={event!}
                  status={status}
                  ticketNumber={ticketNumber}
                  registrationDate={registrationDate}
                />
              ),
            )}
          </div>
        </>
      )}
    </EventsListLayout>
  );
}
