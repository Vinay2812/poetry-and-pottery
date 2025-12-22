"use client";

import { getPastEvents, getUpcomingEvents } from "@/actions";
import type { EventWithRegistrationCount } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

interface PaginationData {
  total: number;
  totalPages: number;
}

interface UseAllEventsQueryOptions {
  initialUpcomingEvents: EventWithRegistrationCount[];
  initialUpcomingPagination: PaginationData;
  initialPastEvents: EventWithRegistrationCount[];
  initialPastPagination: PaginationData;
}

export function useAllEventsQuery({
  initialUpcomingEvents,
  initialUpcomingPagination,
  initialPastEvents,
  initialPastPagination,
}: UseAllEventsQueryOptions) {
  // Upcoming events infinite query
  const {
    data: upcomingData,
    fetchNextPage: fetchNextUpcoming,
    hasNextPage: hasNextUpcoming,
    isFetchingNextPage: isFetchingNextUpcoming,
  } = useInfiniteQuery({
    queryKey: ["all-events-upcoming"],
    queryFn: async ({ pageParam = 1 }) => {
      return getUpcomingEvents(pageParam);
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
    queryKey: ["all-events-past"],
    queryFn: async ({ pageParam = 1 }) => {
      return getPastEvents(pageParam);
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
