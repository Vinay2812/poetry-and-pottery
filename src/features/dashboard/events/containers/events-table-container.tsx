"use client";

import {
  deleteEvent,
  updateEventStatus,
} from "@/data/admin/events/gateway/server";
import { useURLFilterHandlers } from "@/hooks/use-url-filter-handlers";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";

import type { EventStatus } from "@/graphql/generated/types";

import { EventsTable } from "../components/events-table";
import type { EventsTableContainerProps } from "../types";
import { buildEventsTableViewModel } from "../types";

export function EventsTableContainer({
  data,
  statusOptions,
  levelOptions,
}: EventsTableContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const {
    createFilterHandler,
    createSearchHandler,
    handlePageChange,
    isPending,
  } = useURLFilterHandlers({
    basePath: "/dashboard/events",
  });

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const handleSearch = createSearchHandler(setSearch);
  const handleStatusFilter = createFilterHandler("status");
  const handleLevelFilter = createFilterHandler("level");
  const handleEventTypeFilter = createFilterHandler("eventType");
  const handleStartDateFilter = createFilterHandler("startDate");
  const handleEndDateFilter = createFilterHandler("endDate");

  const viewModel = useMemo(
    () =>
      buildEventsTableViewModel(
        data,
        search,
        searchParams.get("status") || "ALL",
        searchParams.get("level") || "ALL",
        searchParams.get("eventType") || "ALL",
        searchParams.get("startDate") || "",
        searchParams.get("endDate") || "",
      ),
    [data, search, searchParams],
  );

  const handleStatusChange = useCallback(
    (eventId: string, status: EventStatus) => {
      startTransition(async () => {
        const result = await updateEventStatus(eventId, status);
        if (!result.success) {
          alert(result.error || "Failed to update event status");
        }
        router.refresh();
      });
    },
    [router],
  );

  const handleDelete = useCallback(
    (eventId: string) => {
      if (!confirm("Are you sure you want to delete this event?")) {
        return;
      }

      startTransition(async () => {
        const result = await deleteEvent(eventId);
        if (!result.success) {
          alert(result.error || "Failed to delete event");
        } else if (result.error) {
          alert(result.error);
        }
        router.refresh();
      });
    },
    [router],
  );

  return (
    <EventsTable
      viewModel={viewModel}
      statusOptions={statusOptions}
      levelOptions={levelOptions}
      isPending={isPending}
      onSearch={handleSearch}
      onStatusFilter={handleStatusFilter}
      onLevelFilter={handleLevelFilter}
      onEventTypeFilter={handleEventTypeFilter}
      onStartDateFilter={handleStartDateFilter}
      onEndDateFilter={handleEndDateFilter}
      onPageChange={handlePageChange}
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
    />
  );
}
