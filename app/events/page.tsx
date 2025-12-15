"use client";

import { ArrowRight, Calendar } from "lucide-react";
import { useState } from "react";

import { EventCard, RegisteredEventCard } from "@/components/cards";
import { MobileHeader, MobileNav, Navbar } from "@/components/layout";
import { MobileFixedCTA } from "@/components/mobile";
import { EmptyState } from "@/components/sections";
import { Button } from "@/components/ui/button";

import { EVENTS, REGISTERED_EVENTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(EVENTS[0]?.id || "");
  const [activeTab, setActiveTab] = useState<"upcoming" | "registered">(
    "upcoming",
  );

  const selectedEventData = EVENTS.find((e) => e.id === selectedEvent);

  const registeredEventsData = REGISTERED_EVENTS.map((reg) => ({
    ...reg,
    event: EVENTS.find((e) => e.id === reg.eventId),
  })).filter((reg) => reg.event);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <MobileHeader title="Pottery Workshops" showBack backHref="/" />

      <main className="pt-14 pb-32 lg:pt-0 lg:pb-0">
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
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeTab === "upcoming"
                  ? "bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:bg-muted border bg-white",
              )}
            >
              Upcoming Sessions
            </button>
            <button
              onClick={() => setActiveTab("registered")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeTab === "registered"
                  ? "bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:bg-muted border bg-white",
              )}
            >
              My Registrations
              {registeredEventsData.length > 0 && (
                <span className="bg-primary ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs text-white">
                  {registeredEventsData.length}
                </span>
              )}
            </button>
          </div>

          {activeTab === "upcoming" ? (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Events List */}
              <div className="space-y-4 lg:col-span-2">
                {EVENTS.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isSelected={selectedEvent === event.id}
                    onSelect={setSelectedEvent}
                  />
                ))}
              </div>

              {/* Desktop Registration Summary */}
              {selectedEventData && (
                <div className="hidden lg:block">
                  <div className="shadow-soft sticky top-24 rounded-2xl bg-white p-6">
                    <h2 className="mb-4 text-lg font-semibold">
                      Registration Summary
                    </h2>

                    <div className="mb-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Workshop</span>
                        <span className="text-right font-medium">
                          {selectedEventData.title}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Date</span>
                        <span>{selectedEventData.date}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Time</span>
                        <span>{selectedEventData.time}</span>
                      </div>
                      {selectedEventData.spotsLeft && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Availability
                          </span>
                          <span className="text-primary">
                            {selectedEventData.spotsLeft} spots left
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="border-border my-4 border-t" />

                    <div className="mb-6 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-primary text-xl font-bold">
                        ₹{selectedEventData.price.toFixed(2)}
                      </span>
                    </div>

                    <Button className="h-12 w-full rounded-xl" size="lg">
                      Complete Registration
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Registered Events Tab */
            <div className="space-y-4">
              {registeredEventsData.length === 0 ? (
                <EmptyState
                  icon={Calendar}
                  title="No Registrations Yet"
                  description="You haven't registered for any workshops yet. Browse our upcoming sessions to get started!"
                  actionText="Browse Workshops"
                  onAction={() => setActiveTab("upcoming")}
                />
              ) : (
                registeredEventsData.map(
                  ({ id, event, status, ticketNumber, registrationDate }) => (
                    <RegisteredEventCard
                      key={id}
                      event={event!}
                      status={status}
                      ticketNumber={ticketNumber}
                      registrationDate={registrationDate}
                    />
                  ),
                )
              )}
            </div>
          )}
        </div>
      </main>

      {/* Mobile Fixed Bottom CTA */}
      {activeTab === "upcoming" && selectedEventData && (
        <MobileFixedCTA
          buttonText="Complete Registration"
          price={selectedEventData.price}
        />
      )}

      <MobileNav />
    </div>
  );
}
