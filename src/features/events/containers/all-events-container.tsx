"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useCallback, useMemo } from "react";

import { AllEvents } from "../components/all-events";
import { useAllEventsQuery } from "../hooks/use-all-events-query";
import type { AllEventsContainerProps, AllEventsViewModel } from "../types";

export function AllEventsContainer({
  initialUpcomingEvents,
  initialUpcomingPagination,
  initialPastEvents,
  initialPastPagination,
}: AllEventsContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const { upcomingEvents, pastEvents, hasMore, isLoading, loadMoreRef } =
    useAllEventsQuery({
      initialUpcomingEvents,
      initialUpcomingPagination,
      initialPastEvents,
      initialPastPagination,
      searchQuery: searchQuery || undefined,
    });

  const handleSearchChange = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }
      startTransition(() => {
        router.push(`/events?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams],
  );

  // Build the view model
  const viewModel: AllEventsViewModel = useMemo(() => {
    const hasUpcoming = upcomingEvents.length > 0;
    const hasPast = pastEvents.length > 0;

    return {
      upcomingEvents,
      pastEvents,
      hasUpcoming,
      hasPast,
      hasNoEvents: !hasUpcoming && !hasPast,
      hasMore,
      isLoading,
      searchQuery,
    };
  }, [upcomingEvents, pastEvents, hasMore, isLoading, searchQuery]);

  return (
    <AllEvents
      viewModel={viewModel}
      loadMoreRef={loadMoreRef}
      onSearchChange={handleSearchChange}
    />
  );
}
