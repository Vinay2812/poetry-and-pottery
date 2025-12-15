"use client";

import { History } from "lucide-react";

import { PastWorkshopCard } from "@/components/cards";
import { EventsTabs } from "@/components/events-tabs";
import { MobileHeader, MobileNav, Navbar } from "@/components/layout";

import { PAST_WORKSHOPS, REGISTERED_EVENTS } from "@/lib/constants";

export default function PastWorkshopsPage() {
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

          {/* Past Workshops Content */}
          <div>
            <div className="text-muted-foreground mb-6 flex items-center gap-2">
              <History className="h-5 w-5" />
              <p className="text-sm">
                Explore our previous workshops and the amazing pieces created by
                our community.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PAST_WORKSHOPS.map((workshop) => (
                <PastWorkshopCard
                  key={workshop.id}
                  id={workshop.id}
                  title={workshop.title}
                  date={workshop.date}
                  attendees={workshop.attendees}
                  image={workshop.image}
                  galleryCount={workshop.galleryImages?.length}
                  highlights={workshop.highlights}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
