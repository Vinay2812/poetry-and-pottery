"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useMemo, useTransition } from "react";

import { PastEventsSkeleton } from "@/components/skeletons";

import { createDate } from "@/lib/date";

import { EventType } from "@/graphql/generated/graphql";

import { AllEvents } from "../components/all-events";
import { useAllEventsQuery } from "../hooks/use-all-events-query";
import { useEventFilters } from "../hooks/use-event-filters";
import { usePastEventsQuery } from "../hooks/use-past-events-query";
import type {
  AllEventsContainerProps,
  AllEventsSubTab,
  AllEventsViewModel,
} from "../types";

export function AllEventsContainer({
  initialUpcomingEvents,
  initialUpcomingPagination,
}: AllEventsContainerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSubTabPending, startSubTabTransition] = useTransition();
  const { filters, setSearch, setEventType, setSort, getQueryString } =
    useEventFilters();

  const {
    search: searchQuery,
    eventType: eventTypeFilter,
    sort: sortBy,
  } = filters;

  const activeSubTab = useMemo<AllEventsSubTab>(() => {
    const tab = searchParams.get("event_tab");
    return tab === "past" ? "past" : "upcoming";
  }, [searchParams]);

  const handleSubTabChange = useCallback(
    (tab: AllEventsSubTab) => {
      startSubTabTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (tab === "upcoming") {
          params.delete("event_tab");
        } else {
          params.set("event_tab", tab);
        }

        const query = params.toString();
        const nextUrl = query ? `${pathname}?${query}` : pathname;
        router.replace(nextUrl, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  const eventTypeForQuery =
    eventTypeFilter === "all"
      ? null
      : eventTypeFilter === "workshop"
        ? EventType.PotteryWorkshop
        : EventType.OpenMic;

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
    enabled: true,
  });

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
            createDate(a.starts_at).getTime() -
            createDate(b.starts_at).getTime(),
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
        return sorted.sort(
          (a, b) =>
            createDate(b.starts_at).getTime() -
            createDate(a.starts_at).getTime(),
        );
    }
  }, [rawPastEvents, sortBy]);

  const viewModel: AllEventsViewModel = useMemo(() => {
    const isUpcomingTab = activeSubTab === "upcoming";
    const totalEvents = isUpcomingTab ? (upcomingTotal ?? 0) : (pastTotal ?? 0);

    return {
      upcomingEvents,
      pastEvents,
      activeSubTab,
      hasNoEvents: isUpcomingTab
        ? upcomingEvents.length === 0
        : pastEvents.length === 0 && !isPastEventsLoading,
      hasMore: isUpcomingTab ? hasNextUpcoming : hasNextPast,
      isLoading: isUpcomingTab
        ? isFetchingNextUpcoming || isSubTabPending
        : isFetchingNextPast || isPastEventsLoading || isSubTabPending,
      searchQuery,
      totalEvents,
    };
  }, [
    activeSubTab,
    upcomingEvents,
    pastEvents,
    hasNextUpcoming,
    hasNextPast,
    isFetchingNextUpcoming,
    isFetchingNextPast,
    isPastEventsLoading,
    isSubTabPending,
    searchQuery,
    upcomingTotal,
    pastTotal,
  ]);

  const loadMoreRef = useCallback(
    (node?: Element | null) => {
      if (activeSubTab === "upcoming") {
        upcomingLoadMoreRef(node);
      } else {
        pastLoadMoreRef(node);
      }
    },
    [activeSubTab, upcomingLoadMoreRef, pastLoadMoreRef],
  );

  return (
    <Suspense fallback={<PastEventsSkeleton />}>
      <AllEvents
        viewModel={viewModel}
        loadMoreRef={loadMoreRef}
        activeSubTab={activeSubTab}
        onSubTabChange={handleSubTabChange}
        sortBy={sortBy}
        onSortChange={setSort}
        eventTypeFilter={eventTypeFilter}
        onEventTypeFilterChange={setEventType}
        searchQuery={searchQuery}
        onSearchChange={setSearch}
        queryString={getQueryString()}
        pastEventsLoading={isPastEventsLoading}
        pastEventsSkeleton={<PastEventsSkeleton />}
      />
    </Suspense>
  );
}
