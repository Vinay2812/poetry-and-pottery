import { Suspense } from "react";

import { EventsTableSkeleton } from "@/components/skeletons";

import {
  type DashboardEventsSearchParams,
  EventsTableContent,
} from "./events-table-content";

interface EventsPageProps {
  searchParams: Promise<DashboardEventsSearchParams>;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Events</h1>
        <p className="text-muted-foreground">
          Manage workshops, classes, and event registrations.
        </p>
      </div>

      <Suspense fallback={<EventsTableSkeleton />}>
        <EventsTableContent
          search={params.search}
          status={params.status}
          level={params.level}
          startDate={params.startDate}
          endDate={params.endDate}
          page={params.page}
        />
      </Suspense>
    </div>
  );
}
