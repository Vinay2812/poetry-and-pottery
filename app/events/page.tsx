"use client";

import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Ticket,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { MobileHeader, MobileNav, Navbar } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { EVENTS, REGISTERED_EVENTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(EVENTS[0]?.id || "");
  const [activeTab, setActiveTab] = useState<"upcoming" | "registered">(
    "upcoming",
  );

  const selectedEventData = EVENTS.find((e) => e.id === selectedEvent);

  // Get registered events with full event data
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
                  : "bg-white border border-border text-foreground hover:bg-muted",
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
                  : "bg-white border border-border text-foreground hover:bg-muted",
              )}
            >
              My Registrations
              {registeredEventsData.length > 0 && (
                <span className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white/20 px-1.5 text-xs">
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
                  <div
                    key={event.id}
                    className={cn(
                      "w-full rounded-2xl bg-white p-4 text-left transition-all",
                      selectedEvent === event.id
                        ? "ring-primary shadow-card ring-2"
                        : "shadow-soft hover:shadow-card",
                    )}
                  >
                    <button
                      onClick={() => setSelectedEvent(event.id)}
                      className="w-full text-left"
                    >
                      <div className="flex gap-4">
                        <Link
                          href={`/events/${event.id}`}
                          className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl lg:h-32 lg:w-32"
                        >
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </Link>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <Link
                                href={`/events/${event.id}`}
                                className="text-primary mb-1 font-semibold hover:underline"
                              >
                                {event.title}
                              </Link>
                              <p className="text-muted-foreground mb-2 text-sm">
                                {event.date} • {event.time}
                              </p>
                            </div>
                            <div
                              className={cn(
                                "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2",
                                selectedEvent === event.id
                                  ? "border-primary bg-primary"
                                  : "border-muted-foreground/30",
                              )}
                            >
                              {selectedEvent === event.id && (
                                <div className="h-2 w-2 rounded-full bg-white" />
                              )}
                            </div>
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {event.spotsLeft && (
                                <Badge variant="outline" className="text-xs">
                                  {event.spotsLeft} spots left
                                </Badge>
                              )}
                              {event.level && (
                                <Badge variant="secondary" className="text-xs">
                                  {event.level}
                                </Badge>
                              )}
                            </div>
                            <span className="text-primary font-semibold">
                              ₹{event.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                    <div className="mt-3 border-t border-border pt-3">
                      <Link
                        href={`/events/${event.id}`}
                        className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Registration Summary - Sticky Sidebar */}
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
                <div className="rounded-2xl bg-white p-8 text-center shadow-soft">
                  <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 font-semibold">No Registrations Yet</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    You haven&apos;t registered for any workshops yet. Browse
                    our upcoming sessions to get started!
                  </p>
                  <Button
                    onClick={() => setActiveTab("upcoming")}
                    className="rounded-full"
                  >
                    Browse Workshops
                  </Button>
                </div>
              ) : (
                registeredEventsData.map(({ id, event, status, ticketNumber, registrationDate }) => (
                  <Link
                    key={id}
                    href={`/events/${event!.id}`}
                    className="block rounded-2xl bg-white p-4 shadow-soft transition-all hover:shadow-card"
                  >
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl lg:h-32 lg:w-32">
                        <Image
                          src={event!.image}
                          alt={event!.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="text-primary font-semibold">
                            {event!.title}
                          </h3>
                          {status === "confirmed" && (
                            <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                              <CheckCircle2 className="h-3 w-3" />
                              Confirmed
                            </span>
                          )}
                        </div>
                        <div className="text-muted-foreground mb-3 space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {event!.date} • {event!.time}
                            </span>
                          </div>
                          {event!.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{event!.location}</span>
                            </div>
                          )}
                          {event!.duration && (
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{event!.duration}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1 text-xs"
                          >
                            <Ticket className="h-3 w-3" />
                            {ticketNumber}
                          </Badge>
                          <span className="text-muted-foreground text-xs">
                            Registered on {registrationDate}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="text-muted-foreground h-5 w-5 flex-shrink-0 self-center" />
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </main>

      {/* Mobile Fixed Bottom CTA */}
      {activeTab === "upcoming" && selectedEventData && (
        <div className="border-border fixed right-0 bottom-16 left-0 z-40 border-t bg-white/95 p-4 backdrop-blur-md lg:hidden">
          <Button className="h-12 w-full rounded-xl" size="lg">
            Complete Registration
            <span className="ml-2 font-semibold">
              ₹{selectedEventData.price.toFixed(2)}
            </span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}

      <MobileNav />
    </div>
  );
}
