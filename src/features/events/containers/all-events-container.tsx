"use client";

import { Suspense, useCallback, useMemo, useState } from "react";

import { PastEventsSkeleton } from "@/components/skeletons";

import { EventType } from "@/graphql/generated/graphql";
import type { EventBase } from "@/data/events/types";

import { AllEvents } from "../components/all-events";
import { useAllEventsQuery } from "../hooks/use-all-events-query";
import { useEventFilters } from "../hooks/use-event-filters";
import { usePastEventsQuery } from "../hooks/use-past-events-query";
import { useQuickReserve } from "../hooks/use-quick-reserve";
import type { AllEventsContainerProps, AllEventsViewModel } from "../types";

export function AllEventsContainer({
  initialUpcomingEvents,
  initialUpcomingPagination,
  registeredEventIds = [],
}: AllEventsContainerProps) {
  const [registeredIds, setRegisteredIds] = useState(
    () => new Set(registeredEventIds),
  );
  const { reserveSeat, isLoading } = useQuickReserve();
  const { filters, setSearch, setEventType, setSort, getQueryString } =
    useEventFilters();

  const {
    search: searchQuery,
    eventType: eventTypeFilter,
    sort: sortBy,
  } = filters;

  // Convert UI filter to GraphQL enum
  const eventTypeForQuery =
    eventTypeFilter === "all"
      ? null
      : eventTypeFilter === "workshop"
        ? EventType.PotteryWorkshop
        : EventType.OpenMic;

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
    eventType: eventTypeForQuery,
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
    eventType: eventTypeForQuery,
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

  const handleQuickReserve = useCallback(
    async (event: EventBase) => {
      const success = await reserveSeat(event);
      if (success) {
        setRegisteredIds((prev) => {
          const next = new Set(prev);
          next.add(event.id);
          return next;
        });
      }
    },
    [reserveSeat],
  );

  return (
    <Suspense fallback={<PastEventsSkeleton />}>
      <AllEvents
        viewModel={viewModel}
        loadMoreRef={loadMoreRef}
        sortBy={sortBy}
        onSortChange={setSort}
        eventTypeFilter={eventTypeFilter}
        onEventTypeFilterChange={setEventType}
        searchQuery={searchQuery}
        onSearchChange={setSearch}
        queryString={getQueryString()}
        pastEventsLoading={isPastEventsLoading}
        pastEventsSkeleton={<PastEventsSkeleton />}
        registeredEventIds={registeredIds}
        showQuickReserve
        onQuickReserve={handleQuickReserve}
        isQuickReserveLoading={isLoading}
      />
    </Suspense>
  );
}
