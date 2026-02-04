import {
  getEventLevelOptions,
  getEventStatusOptions,
  getEvents,
} from "@/data/admin/events/gateway/server";
import { EventsTableContainer } from "@/features/dashboard/events";
import { Suspense } from "react";

import { EventsTableSkeleton } from "@/components/skeletons";

import { EventLevel, EventStatus } from "@/graphql/generated/types";

interface EventsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    level?: string;
    startDate?: string;
    endDate?: string;
    page?: string;
  }>;
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

async function EventsTableContent({
  search,
  status,
  level,
  startDate,
  endDate,
  page,
}: {
  search?: string;
  status?: string;
  level?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
}) {
  const [data, statusOptions, levelOptions] = await Promise.all([
    getEvents({
      search,
      status: status && status !== "ALL" ? (status as EventStatus) : undefined,
      level: level && level !== "ALL" ? (level as EventLevel) : undefined,
      startDate: startDate ? new Date(startDate).toISOString() : undefined,
      endDate: endDate ? new Date(endDate).toISOString() : undefined,
      page: page ? parseInt(page) : 1,
      limit: 20,
    }),
    Promise.resolve(getEventStatusOptions()),
    Promise.resolve(getEventLevelOptions()),
  ]);

  return (
    <EventsTableContainer
      data={data}
      statusOptions={statusOptions}
      levelOptions={levelOptions}
    />
  );
}
