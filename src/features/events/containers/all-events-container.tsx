"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useMemo, useState, useTransition } from "react";

import type { EventSortOption } from "@/components/events";
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
  const [, startTransition] = useTransition();
  const searchQuery = searchParams.get("search") || "";
  const [sortBy, setSortBy] = useState<EventSortOption>("soonest");

  // Upcoming events with initial data from server
  const {
    upcomingEvents: rawUpcomingEvents,
    hasNextPage: hasNextUpcoming,
    isFetchingNextPage: isFetchingNextUpcoming,
    loadMoreRef: upcomingLoadMoreRef,
    total: upcomingTotal,
  } = useAllEventsQuery({
    initialUpcomingEvents,
    initialUpcomingPagination,
    searchQuery: searchQuery || undefined,
  });

  const {
    pastEvents: rawPastEvents,
    hasNextPage: hasNextPast,
    isFetchingNextPage: isFetchingNextPast,
    isLoading: isPastEventsLoading,
    loadMoreRef: pastLoadMoreRef,
    total: pastTotal,
  } = usePastEventsQuery({
    searchQuery: searchQuery || undefined,
    enabled: !hasNextUpcoming && !isFetchingNextUpcoming,
  });

  // Sort events based on sortBy
  const upcomingEvents = useMemo(() => {
    const sorted = [...rawUpcomingEvents];
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "soonest":
      default:
        return sorted.sort(
          (a, b) =>
            new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime(),
        );
    }
  }, [rawUpcomingEvents, sortBy]);

  const pastEvents = useMemo(() => {
    const sorted = [...rawPastEvents];
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "soonest":
      default:
        // For past events, "soonest" means most recent first
        return sorted.sort(
          (a, b) =>
            new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime(),
        );
    }
  }, [rawPastEvents, sortBy]);

  // Build the view model
  const viewModel: AllEventsViewModel = useMemo(() => {
    const hasUpcoming = upcomingEvents.length > 0;
    const hasPast = pastEvents.length > 0;
    const totalEvents = (upcomingTotal ?? 0) + (pastTotal ?? 0);

    return {
      upcomingEvents,
      pastEvents,
      hasUpcoming,
      hasPast,
      hasNoEvents: !hasUpcoming && !hasPast && !isPastEventsLoading,
      hasMore: hasNextUpcoming || hasNextPast,
      isLoading: isFetchingNextUpcoming || isFetchingNextPast,
      searchQuery,
      totalEvents,
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
    upcomingTotal,
    pastTotal,
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
    <Suspense fallback={<PastEventsSkeleton />}>
      <AllEvents
        viewModel={viewModel}
        loadMoreRef={loadMoreRef}
        sortBy={sortBy}
        onSortChange={setSortBy}
        pastEventsLoading={isPastEventsLoading}
        pastEventsSkeleton={<PastEventsSkeleton />}
      />
    </Suspense>
  );
}
