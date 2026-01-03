"use client";

import { isGraphQL } from "@/consts/env";
import { DEFAULT_EVENTS_LIMIT } from "@/consts/performance";
import { getPastEvents } from "@/data/events/gateway/server";
import type { EventBase } from "@/data/events/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { usePastEventsLazyQuery } from "@/graphql/generated/graphql";

interface UsePastEventsQueryOptions {
  searchQuery?: string;
  enabled?: boolean;
}

export function usePastEventsQuery({
  searchQuery,
  enabled = true,
}: UsePastEventsQueryOptions = {}) {
  const [fetchGraphQL] = usePastEventsLazyQuery({
    fetchPolicy: "network-only",
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["past-events", searchQuery, isGraphQL],
      queryFn: async ({ pageParam = 1 }) => {
        const limit = DEFAULT_EVENTS_LIMIT;

        if (isGraphQL) {
          const { data: gqlData, error: gqlError } = await fetchGraphQL({
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

          const events = gqlData?.pastEvents;
          return {
            data: (events?.data ?? []) as EventBase[],
            total: events?.total ?? 0,
            page: events?.page ?? pageParam,
            totalPages: events?.total_pages ?? 0,
          };
        } else {
          const result = await getPastEvents({
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
      enabled,
    });

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
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
  };
}
