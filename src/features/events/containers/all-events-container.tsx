"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useCallback, useMemo } from "react";

import { PastEventsSkeleton } from "@/components/skeletons";

import { AllEvents } from "../components/all-events";
import { useAllEventsQuery } from "../hooks/use-all-events-query";
import { usePastEventsQuery } from "../hooks/use-past-events-query";
import type { AllEventsContainerProps, AllEventsViewModel } from "../types";

export function AllEventsContainer({
  initialUpcomingEvents,
  initialUpcomingPagination,
}: AllEventsContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // Upcoming events with initial data from server
  const {
    upcomingEvents,
    hasNextPage: hasNextUpcoming,
    isFetchingNextPage: isFetchingNextUpcoming,
    loadMoreRef: upcomingLoadMoreRef,
  } = useAllEventsQuery({
    initialUpcomingEvents,
    initialUpcomingPagination,
    searchQuery: searchQuery || undefined,
  });

  // Past events fetched client-side
  const {
    pastEvents,
    hasNextPage: hasNextPast,
    isFetchingNextPage: isFetchingNextPast,
    isLoading: isPastEventsLoading,
    loadMoreRef: pastLoadMoreRef,
  } = usePastEventsQuery({
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
      hasNoEvents: !hasUpcoming && !hasPast && !isPastEventsLoading,
      hasMore: hasNextUpcoming || hasNextPast,
      isLoading: isFetchingNextUpcoming || isFetchingNextPast,
      searchQuery,
    };
  }, [
    upcomingEvents,
    pastEvents,
    hasNextUpcoming,
    hasNextPast,
    isFetchingNextUpcoming,
    isFetchingNextPast,
    isPastEventsLoading,
    searchQuery,
  ]);

  // Combined load more ref - prioritize upcoming, then past
  const loadMoreRef = useCallback(
    (node?: Element | null) => {
      if (hasNextUpcoming) {
        upcomingLoadMoreRef(node);
      } else {
        pastLoadMoreRef(node);
      }
    },
    [hasNextUpcoming, upcomingLoadMoreRef, pastLoadMoreRef],
  );

  return (
    <AllEvents
      viewModel={viewModel}
      loadMoreRef={loadMoreRef}
      onSearchChange={handleSearchChange}
      pastEventsLoading={isPastEventsLoading}
      pastEventsSkeleton={<PastEventsSkeleton />}
    />
  );
}
