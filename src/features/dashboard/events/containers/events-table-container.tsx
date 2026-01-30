"use client";

import {
  deleteEvent,
  updateEventStatus,
} from "@/data/admin/events/gateway/server";
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
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const viewModel = useMemo(
    () =>
      buildEventsTableViewModel(
        data,
        search,
        searchParams.get("status") || "ALL",
        searchParams.get("level") || "ALL",
        searchParams.get("startDate") || "",
        searchParams.get("endDate") || "",
      ),
    [data, search, searchParams],
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      startTransition(() => {
        router.push(`/dashboard/events?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  const handleStatusFilter = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "ALL") {
        params.set("status", value);
      } else {
        params.delete("status");
      }
      params.set("page", "1");
      startTransition(() => {
        router.push(`/dashboard/events?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  const handleLevelFilter = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "ALL") {
        params.set("level", value);
      } else {
        params.delete("level");
      }
      params.set("page", "1");
      startTransition(() => {
        router.push(`/dashboard/events?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  const handleStartDateFilter = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("startDate", value);
      } else {
        params.delete("startDate");
      }
      params.set("page", "1");
      startTransition(() => {
        router.push(`/dashboard/events?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  const handleEndDateFilter = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("endDate", value);
      } else {
        params.delete("endDate");
      }
      params.set("page", "1");
      startTransition(() => {
        router.push(`/dashboard/events?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      startTransition(() => {
        router.push(`/dashboard/events?${params.toString()}`);
      });
    },
    [router, searchParams],
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
      onStartDateFilter={handleStartDateFilter}
      onEndDateFilter={handleEndDateFilter}
      onPageChange={handlePageChange}
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
    />
  );
}
