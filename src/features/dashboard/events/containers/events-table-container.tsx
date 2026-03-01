"use client";

import { useURLFilterHandlers } from "@/hooks/use-url-filter-handlers";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import {
  useAdminDeleteEventMutation,
  useAdminUpdateEventStatusMutation,
} from "@/graphql/generated/graphql";
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
  const [deleteEventMutation, { loading: deleteLoading }] =
    useAdminDeleteEventMutation();
  const [updateEventStatusMutation, { loading: statusLoading }] =
    useAdminUpdateEventStatusMutation();

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
    async (eventId: string, status: EventStatus) => {
      try {
        const { data } = await updateEventStatusMutation({
          variables: { id: eventId, status },
        });
        const result = data?.adminUpdateEventStatus;
        if (!result?.success) {
          alert(result?.error || "Failed to update event status");
        }
      } catch (error) {
        alert(
          error instanceof Error ? error.message : "Failed to update event",
        );
      } finally {
        router.refresh();
      }
    },
    [router, updateEventStatusMutation],
  );

  const handleDelete = useCallback(
    async (eventId: string) => {
      if (!confirm("Are you sure you want to delete this event?")) {
        return;
      }

      try {
        const { data } = await deleteEventMutation({
          variables: { id: eventId },
        });
        const result = data?.adminDeleteEvent;
        if (!result?.success) {
          alert(result?.error || "Failed to delete event");
        } else if (result.error) {
          alert(result.error);
        }
      } catch (error) {
        alert(
          error instanceof Error ? error.message : "Failed to delete event",
        );
      } finally {
        router.refresh();
      }
    },
    [deleteEventMutation, router],
  );

  return (
    <EventsTable
      viewModel={viewModel}
      statusOptions={statusOptions}
      levelOptions={levelOptions}
      isPending={isPending || deleteLoading || statusLoading}
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
