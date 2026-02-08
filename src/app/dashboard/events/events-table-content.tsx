import {
  getEventLevelOptions,
  getEventStatusOptions,
  getEvents,
} from "@/data/admin/events/gateway/server";
import { EventsTableContainer } from "@/features/dashboard/events";

import { createDate } from "@/lib/date";

import { EventLevel, EventStatus } from "@/graphql/generated/types";

export interface DashboardEventsSearchParams {
  search?: string;
  status?: string;
  level?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
}

interface EventsTableContentProps {
  search?: string;
  status?: string;
  level?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
}

export async function EventsTableContent({
  search,
  status,
  level,
  startDate,
  endDate,
  page,
}: EventsTableContentProps) {
  const [data, statusOptions, levelOptions] = await Promise.all([
    getEvents({
      search,
      status: status && status !== "ALL" ? (status as EventStatus) : undefined,
      level: level && level !== "ALL" ? (level as EventLevel) : undefined,
      startDate: startDate ? createDate(startDate).toISOString() : undefined,
      endDate: endDate ? createDate(endDate).toISOString() : undefined,
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
