"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { MobileHeader, MobileNav, Navbar } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { EVENTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(EVENTS[0]?.id || "");

  const selectedEventData = EVENTS.find((e) => e.id === selectedEvent);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <MobileHeader title="Pottery Workshops" showBack backHref="/" />

      <main className="pt-14 pb-32 md:pt-0 md:pb-0">
        <div className="container mx-auto px-4 py-6 md:px-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="mb-2 text-2xl font-bold md:text-3xl">
              Upcoming Sessions
            </h1>
            <p className="text-muted-foreground">
              Select a workshop to reserve your wheel.
            </p>
          </div>

          {/* Events List */}
          <div className="mb-8 space-y-4">
            {EVENTS.map((event) => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event.id)}
                className={cn(
                  "w-full rounded-2xl bg-white p-4 text-left transition-all",
                  selectedEvent === event.id
                    ? "ring-primary shadow-card ring-2"
                    : "shadow-soft hover:shadow-card",
                )}
              >
                <div className="flex gap-4">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl md:h-32 md:w-32">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-primary mb-1 font-semibold">
                          {event.title}
                        </h3>
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
            ))}
          </div>

          {/* Desktop CTA */}
          {selectedEventData && (
            <div className="hidden md:block">
              <div className="shadow-soft mx-auto max-w-md rounded-2xl bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{selectedEventData.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {selectedEventData.date} • {selectedEventData.time}
                    </p>
                  </div>
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
      </main>

      {/* Mobile Fixed Bottom CTA */}
      {selectedEventData && (
        <div className="border-border fixed right-0 bottom-16 left-0 z-40 border-t bg-white/95 p-4 backdrop-blur-md md:hidden">
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
