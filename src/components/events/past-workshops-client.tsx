"use client";

import { DEFAULT_ROOT_MARGIN } from "@/consts/performance";
import { getPastEvents } from "@/data/events/gateway/server";
import type { EventBase } from "@/data/events/types";
import { useEventFilters } from "@/features/events/hooks/use-event-filters";
import { useInfiniteQuery } from "@tanstack/react-query";
import { History, Loader2 } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { PastWorkshopCard } from "@/components/cards";
import { EventsListLayout } from "@/components/events";
import { EmptyState } from "@/components/sections";
import { StaggeredGrid } from "@/components/shared";

import { createDate } from "@/lib/date";

import { EventType } from "@/graphql/generated/graphql";

interface PastWorkshopsClientProps {
  initialEvents: EventBase[];
  initialPagination: {
    total: number;
    totalPages: number;
  };
}

export function PastWorkshopsClient({
  initialEvents,
  initialPagination,
}: PastWorkshopsClientProps) {
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
      queryKey: ["past-events", eventTypeForQuery, searchQuery],
      queryFn: async ({ pageParam = 1 }) => {
        const result = await getPastEvents({
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

    // Sort events based on sortBy (for past events, "soonest" means most recent)
    return [...uniqueEvents].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "soonest":
        default:
          // For past events, show most recent first
          return (
            createDate(b.starts_at).getTime() -
            createDate(a.starts_at).getTime()
          );
      }
    });
  }, [data, sortBy]);

  const totalEvents = data?.pages[0]?.total ?? initialPagination.total;

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
      {events.length > 0 ? (
        <>
          <StaggeredGrid className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
            {events.map((event) => (
              <PastWorkshopCard key={event.id} event={event} />
            ))}
          </StaggeredGrid>
          {hasNextPage && (
            <div ref={loadMoreRef} className="flex justify-center py-8">
              {isFetchingNextPage && (
                <>
                  <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
                  Loading more workshops...
                </>
              )}
            </div>
          )}
        </>
      ) : (
        <EmptyState
          icon={History}
          title="No past workshops"
          description="Check back later for gallery highlights from our workshops."
        />
      )}
    </EventsListLayout>
  );
}
