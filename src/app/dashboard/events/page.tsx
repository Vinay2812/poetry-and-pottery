import {
  getEventLevelOptions,
  getEventStatusOptions,
  getEvents,
} from "@/data/admin/events/gateway/server";
import { EventsTableContainer } from "@/features/dashboard/events";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

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

function EventsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-36" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <div className="border-b border-neutral-100 bg-neutral-50/50 px-4 py-3">
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Skeleton key={i} className="h-4 w-20" />
            ))}
          </div>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-neutral-100 px-4 py-3"
          >
            <Skeleton className="h-16 w-24 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-6 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
