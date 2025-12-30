"use client";

import { DEFAULT_PAGE_SIZE } from "@/consts/performance";
import { getPastEvents, getUpcomingEvents } from "@/data/events/gateway/server";
import type { EventBase } from "@/data/events/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

interface PaginationData {
  total: number;
  totalPages: number;
}

interface UseAllEventsQueryOptions {
  initialUpcomingEvents: EventBase[];
  initialUpcomingPagination: PaginationData;
  initialPastEvents: EventBase[];
  initialPastPagination: PaginationData;
  searchQuery?: string;
}

export function useAllEventsQuery({
  initialUpcomingEvents,
  initialUpcomingPagination,
  initialPastEvents,
  initialPastPagination,
  searchQuery,
}: UseAllEventsQueryOptions) {
  // Upcoming events infinite query
  const {
    data: upcomingData,
    fetchNextPage: fetchNextUpcoming,
    hasNextPage: hasNextUpcoming,
    isFetchingNextPage: isFetchingNextUpcoming,
  } = useInfiniteQuery({
    queryKey: ["all-events-upcoming", searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getUpcomingEvents({
        page: pageParam,
        limit: DEFAULT_PAGE_SIZE,
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

  // Past events infinite query
  const {
    data: pastData,
    fetchNextPage: fetchNextPast,
    hasNextPage: hasNextPast,
    isFetchingNextPage: isFetchingNextPast,
  } = useInfiniteQuery({
    queryKey: ["all-events-past", searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getPastEvents({
        page: pageParam,
        limit: DEFAULT_PAGE_SIZE,
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
          data: initialPastEvents,
          total: initialPastPagination.total,
          page: 1,
          totalPages: initialPastPagination.totalPages,
        },
      ],
      pageParams: [1],
    },
  });

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  // Sequential loading: upcoming first, then past
  useEffect(() => {
    if (inView) {
      if (hasNextUpcoming && !isFetchingNextUpcoming) {
        fetchNextUpcoming();
      } else if (!hasNextUpcoming && hasNextPast && !isFetchingNextPast) {
        fetchNextPast();
      }
    }
  }, [
    inView,
    hasNextUpcoming,
    hasNextPast,
    isFetchingNextUpcoming,
    isFetchingNextPast,
    fetchNextUpcoming,
    fetchNextPast,
  ]);

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

  // Flatten and dedupe past events
  const pastEvents = useMemo(() => {
    const allEvents = pastData?.pages.flatMap((page) => page.data) ?? [];
    const seen = new Set<string>();
    return allEvents.filter((event) => {
      if (seen.has(event.id)) return false;
      seen.add(event.id);
      return true;
    });
  }, [pastData]);

  const hasMore = hasNextUpcoming || hasNextPast;
  const isLoading = isFetchingNextUpcoming || isFetchingNextPast;

  return {
    upcomingEvents,
    pastEvents,
    hasMore,
    isLoading,
    loadMoreRef,
  };
}
