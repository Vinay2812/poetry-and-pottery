"use client";

import {
  DEFAULT_EVENTS_LIMIT,
  DEFAULT_ROOT_MARGIN,
} from "@/consts/performance";
import type { EventBase } from "@/data/events/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import {
  type EventType,
  usePastEventsLazyQuery,
} from "@/graphql/generated/graphql";

interface UsePastEventsQueryOptions {
  searchQuery?: string;
  eventType?: EventType | null;
  enabled?: boolean;
}

export function usePastEventsQuery({
  searchQuery,
  eventType,
  enabled = true,
}: UsePastEventsQueryOptions = {}) {
  const [fetchGraphQL] = usePastEventsLazyQuery({
    fetchPolicy: "network-only",
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["past-events", searchQuery, eventType],
      queryFn: async ({ pageParam = 1 }) => {
        const limit = DEFAULT_EVENTS_LIMIT;

        const { data: gqlData, error: gqlError } = await fetchGraphQL({
          variables: {
            filter: {
              page: pageParam,
              limit,
              search: searchQuery,
              event_type: eventType ?? undefined,
            },
          },
        });

        if (gqlError) {
          throw new Error(gqlError.message);
        }

        const events = gqlData?.pastEvents;
        return {
          data: (events?.data ?? []) as EventBase[],
          total: events?.total ?? 0,
          page: events?.page ?? pageParam,
          totalPages: events?.total_pages ?? 0,
        };
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      enabled,
    });

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: DEFAULT_ROOT_MARGIN,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  const pastEvents = useMemo(() => {
    const allEvents = data?.pages.flatMap((page) => page.data) ?? [];
    const seen = new Set<string>();
    return allEvents.filter((event) => {
      if (seen.has(event.id)) return false;
      seen.add(event.id);
      return true;
    });
  }, [data]);

  const pagination = data?.pages[0]
    ? { total: data.pages[0].total, totalPages: data.pages[0].totalPages }
    : { total: 0, totalPages: 0 };

  return {
    pastEvents,
    pagination,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    isLoading,
    loadMoreRef,
    total: pagination.total,
  };
}
