"use client";

import { useUpcomingEventsQuery } from "@/graphql/generated/graphql";

import { WorkshopsSection } from "./workshops-section";

function WorkshopsSectionSkeleton() {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between lg:mb-6">
        <div className="h-7 w-32 animate-pulse rounded-lg bg-stone-200 lg:w-48" />
        <div className="h-5 w-16 animate-pulse rounded bg-stone-200" />
      </div>
      <div className="space-y-3 lg:space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="shadow-soft flex items-center gap-4 rounded-2xl bg-white p-4 lg:p-5"
          >
            <div className="h-8 w-8 animate-pulse rounded-full bg-stone-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 animate-pulse rounded bg-stone-200" />
              <div className="h-3 w-56 animate-pulse rounded bg-stone-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorkshopsSectionContainer() {
  const { data, loading } = useUpcomingEventsQuery({
    variables: {
      filter: { page: 1, limit: 5 },
    },
  });

  if (loading || !data) {
    return <WorkshopsSectionSkeleton />;
  }

  return <WorkshopsSection events={data.upcomingEvents.data.slice()} />;
}
