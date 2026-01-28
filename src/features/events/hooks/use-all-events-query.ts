"use client";

import { isGraphQL } from "@/consts/env";
import { DEFAULT_EVENTS_LIMIT } from "@/consts/performance";
import { getUpcomingEvents } from "@/data/events/gateway/server";
import type { EventBase } from "@/data/events/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { useUpcomingEventsLazyQuery } from "@/graphql/generated/graphql";

interface PaginationData {
  total: number;
  totalPages: number;
}

interface UseAllEventsQueryOptions {
  initialUpcomingEvents: EventBase[];
  initialUpcomingPagination: PaginationData;
  searchQuery?: string;
}

export function useAllEventsQuery({
  initialUpcomingEvents,
  initialUpcomingPagination,
  searchQuery,
}: UseAllEventsQueryOptions) {
  const [fetchUpcomingGraphQL] = useUpcomingEventsLazyQuery({
    fetchPolicy: "network-only",
  });

  // Upcoming events infinite query
  const {
    data: upcomingData,
    fetchNextPage: fetchNextUpcoming,
    hasNextPage: hasNextUpcoming,
    isFetchingNextPage: isFetchingNextUpcoming,
  } = useInfiniteQuery({
    queryKey: ["all-events-upcoming", searchQuery, isGraphQL],
    queryFn: async ({ pageParam = 1 }) => {
      const limit = DEFAULT_EVENTS_LIMIT;

      if (isGraphQL) {
        const { data: gqlData, error: gqlError } = await fetchUpcomingGraphQL({
          variables: {
            filter: {
              page: pageParam,
              limit,
              search: searchQuery,
            },
          },
        });

        if (gqlError) {
          throw new Error(gqlError.message);
        }

        const events = gqlData?.upcomingEvents;

        return {
          data: (events?.data ?? []) as EventBase[],
          total: events?.total ?? 0,
          page: events?.page ?? pageParam,
          totalPages: events?.total_pages ?? 0,
        };
      } else {
        const result = await getUpcomingEvents({
          page: pageParam,
          limit,
          search: searchQuery,
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
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialData: {
      pages: [
        {
          data: initialUpcomingEvents,
          total: initialUpcomingPagination.total,
          page: 1,
          totalPages: initialUpcomingPagination.totalPages,
        },
      ],
      pageParams: [1],
    },
  });

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextUpcoming && !isFetchingNextUpcoming) {
      fetchNextUpcoming();
    }
  }, [inView, hasNextUpcoming, isFetchingNextUpcoming, fetchNextUpcoming]);

  // Flatten and dedupe upcoming events
  const upcomingEvents = useMemo(() => {
    const allEvents = upcomingData?.pages.flatMap((page) => page.data) ?? [];
    const seen = new Set<string>();
    return allEvents.filter((event) => {
      if (seen.has(event.id)) return false;
      seen.add(event.id);
      return true;
    });
  }, [upcomingData]);

  const total = upcomingData?.pages[0]?.total ?? 0;

  return {
    upcomingEvents,
    hasNextPage: hasNextUpcoming ?? false,
    isFetchingNextPage: isFetchingNextUpcoming,
    loadMoreRef,
    total,
  };
}
