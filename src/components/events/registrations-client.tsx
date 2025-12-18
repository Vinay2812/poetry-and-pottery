"use client";

import type { RegistrationWithEvent } from "@/types";
import { Calendar, Ticket } from "lucide-react";

import { RegisteredEventCard } from "@/components/cards";
import { EventsListLayout } from "@/components/events";
import { EmptyState } from "@/components/sections";

interface RegistrationsClientProps {
  registrations: RegistrationWithEvent[];
}

export function RegistrationsClient({
  registrations,
}: RegistrationsClientProps) {
  return (
    <EventsListLayout>
      {registrations.length === 0 ? (
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
