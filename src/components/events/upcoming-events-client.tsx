"use client";

import { DEFAULT_ROOT_MARGIN } from "@/consts/performance";
import { getUpcomingEvents } from "@/data/events/gateway/server";
import type { EventBase } from "@/data/events/types";
import { useEventFilters } from "@/features/events/hooks/use-event-filters";
import { useQuickReserve } from "@/features/events/hooks/use-quick-reserve";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2, Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

import { EventCard } from "@/components/cards";
import { EventsListLayout } from "@/components/events";
import { EmptyState } from "@/components/sections";
import { StaggeredGrid } from "@/components/shared";

import { EventType } from "@/graphql/generated/graphql";

interface UpcomingEventsClientProps {
  initialEvents: EventBase[];
  initialPagination: {
    total: number;
    totalPages: number;
  };
  registeredEventIds?: string[];
  excludeRegistered?: boolean;
}

export function UpcomingEventsClient({
  initialEvents,
  initialPagination,
  registeredEventIds = [],
  excludeRegistered = false,
}: UpcomingEventsClientProps) {
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
      ? undefined
      : eventTypeFilter === "workshop"
        ? EventType.PotteryWorkshop
        : EventType.OpenMic;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["upcoming-events", eventTypeForQuery, searchQuery],
      queryFn: async ({ pageParam = 1 }) => {
        const result = await getUpcomingEvents({
          page: pageParam,
          event_type: eventTypeForQuery,
          search: searchQuery || undefined,
        });
        if (!result.success) {
          throw new Error(result.error);
        }
        return {
          data: result.data.data,
          total: result.data.total,
          page: result.data.page,
          totalPages: result.data.total_pages,
        };
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      initialData:
        eventTypeFilter === "all" && !searchQuery
          ? {
              pages: [
                {
                  data: initialEvents,
                  total: initialPagination.total,
                  page: 1,
                  totalPages: initialPagination.totalPages,
                },
              ],
              pageParams: [1],
            }
          : undefined,
    });

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: DEFAULT_ROOT_MARGIN,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const events = useMemo(() => {
    const allEvents = data?.pages.flatMap((page) => page.data) ?? [];
    const seen = new Set<string>();
    const uniqueEvents = allEvents.filter((event) => {
      if (seen.has(event.id)) {
        return false;
      }
      seen.add(event.id);
      return true;
    });

    // Sort events based on sortBy
    const sorted = [...uniqueEvents].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "soonest":
        default:
          return (
            new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime()
          );
      }
    });

    if (!excludeRegistered) {
      return sorted;
    }

    return sorted.filter((event) => !registeredIds.has(event.id));
  }, [data, sortBy, excludeRegistered, registeredIds]);

  const totalEvents = data?.pages[0]?.total ?? initialPagination.total;
  const hasVisibleEvents = events.length > 0;
  const shouldAutoFetchMore =
    excludeRegistered &&
    !hasVisibleEvents &&
    hasNextPage &&
    !isFetchingNextPage;

  useEffect(() => {
    if (shouldAutoFetchMore) {
      fetchNextPage();
    }
  }, [shouldAutoFetchMore, fetchNextPage]);

  return (
    <EventsListLayout
      totalEvents={totalEvents}
      sortBy={sortBy}
      onSortChange={setSort}
      eventTypeFilter={eventTypeFilter}
      onEventTypeFilterChange={setEventType}
      searchQuery={searchQuery}
      onSearchChange={setSearch}
      queryString={getQueryString()}
    >
      {hasVisibleEvents ? (
        <>
          <StaggeredGrid className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </StaggeredGrid>
          {hasNextPage && (
            <div ref={loadMoreRef} className="flex justify-center py-8">
              {isFetchingNextPage && (
                <>
                  <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
                  Loading more events...
                </>
              )}
            </div>
          )}
        </>
      ) : shouldAutoFetchMore || isFetchingNextPage ? (
        <div className="flex items-center justify-center gap-2 py-12 text-sm text-neutral-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          Finding more events...
        </div>
      ) : (
        <EmptyState
          icon={Sparkles}
          title="No upcoming events"
          description="Check back soon for new workshops and events."
        />
      )}
    </EventsListLayout>
  );
}
