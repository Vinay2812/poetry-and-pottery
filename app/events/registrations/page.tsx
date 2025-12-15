"use client";

import { Calendar, Ticket } from "lucide-react";

import { RegisteredEventCard } from "@/components/cards";
import { EventsTabs } from "@/components/events-tabs";
import { MobileHeader, MobileNav, Navbar } from "@/components/layout";
import { EmptyState } from "@/components/sections";

import { EVENTS, REGISTERED_EVENTS } from "@/lib/constants";

export default function RegistrationsPage() {
  const registeredEventsData = REGISTERED_EVENTS.map((reg) => ({
    ...reg,
    event: EVENTS.find((e) => e.id === reg.eventId),
  })).filter((reg) => reg.event);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <MobileHeader title="Pottery Workshops" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-0 lg:pb-12">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="mb-2 text-2xl font-bold lg:text-3xl">
              Pottery Workshops
            </h1>
            <p className="text-muted-foreground">
              Join our hands-on pottery sessions and create something beautiful.
            </p>
          </div>

          {/* Tab Navigation */}
          <EventsTabs registeredCount={REGISTERED_EVENTS.length} />

          {/* Registered Events Content */}
          <div>
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
                  <p className="text-sm">
                    Your registered workshops and tickets.
                  </p>
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
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
