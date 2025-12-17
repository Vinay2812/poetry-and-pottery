"use client";

import { History } from "lucide-react";

import { PastWorkshopCard } from "@/components/cards";
import { EventsListLayout } from "@/components/events-list-layout";

import { PAST_WORKSHOPS } from "@/lib/constants";

export default function PastWorkshopsPage() {
  return (
    <EventsListLayout>
      <div className="text-muted-foreground mb-6 flex items-center gap-2">
        <History className="h-5 w-5" />
        <p className="text-sm">
          Explore our previous workshops and the amazing pieces created by our
          community.
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
    </EventsListLayout>
  );
}
