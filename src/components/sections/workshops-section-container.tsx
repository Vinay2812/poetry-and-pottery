"use client";

import { EventType, useUpcomingEventsQuery } from "@/graphql/generated/graphql";

import { WorkshopsSection } from "./workshops-section";

function EventCategorySkeleton() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between lg:mb-4">
        <div className="h-5 w-32 animate-pulse rounded bg-stone-200" />
        <div className="h-4 w-16 animate-pulse rounded bg-stone-200" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="shadow-soft flex items-center gap-4 rounded-2xl bg-white p-4 lg:p-5"
          >
            <div className="aspect-4/3 w-16 animate-pulse rounded-lg bg-stone-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 animate-pulse rounded bg-stone-200" />
              <div className="h-3 w-32 animate-pulse rounded bg-stone-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkshopsSectionSkeleton() {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between lg:mb-6">
        <div className="h-7 w-32 animate-pulse rounded-lg bg-stone-200 lg:w-48" />
        <div className="h-5 w-16 animate-pulse rounded bg-stone-200" />
      </div>
      <div className="space-y-6">
        <EventCategorySkeleton />
        <EventCategorySkeleton />
      </div>
    </div>
  );
}

export function WorkshopsSectionContainer() {
  const { data: potteryData, loading: potteryLoading } = useUpcomingEventsQuery(
    {
      variables: {
        filter: { page: 1, limit: 2, event_type: EventType.PotteryWorkshop },
      },
    },
  );

  const { data: poetryData, loading: poetryLoading } = useUpcomingEventsQuery({
    variables: {
      filter: { page: 1, limit: 2, event_type: EventType.OpenMic },
    },
  });

  if (potteryLoading || poetryLoading || !potteryData || !poetryData) {
    return <WorkshopsSectionSkeleton />;
  }

  const potteryEvents = potteryData.upcomingEvents.data;
  const poetryEvents = poetryData.upcomingEvents.data;

  return (
    <WorkshopsSection
      potteryEvents={potteryEvents}
      poetryEvents={poetryEvents}
    />
  );
}
