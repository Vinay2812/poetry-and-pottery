"use client";

import { isGraphQL } from "@/consts/env";
import { getUpcomingEvents } from "@/data/events/gateway/server";
import type { EventBase } from "@/data/events/types";
import { useQuery } from "@tanstack/react-query";

import { useUpcomingEventsLazyQuery } from "@/graphql/generated/graphql";

interface UseUpcomingEventsQueryOptions {
  limit?: number;
  excludeEventId?: string;
}

export function useUpcomingEventsQuery({
  limit = 3,
  excludeEventId,
}: UseUpcomingEventsQueryOptions = {}) {
  const [fetchGraphQL] = useUpcomingEventsLazyQuery({
    fetchPolicy: "network-only",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "upcoming-events-recommendation",
      limit,
      excludeEventId,
      isGraphQL,
    ],
    queryFn: async (): Promise<EventBase[]> => {
      if (isGraphQL) {
        const { data: gqlData, error: gqlError } = await fetchGraphQL({
          variables: {
            filter: {
              page: 1,
              limit: limit + (excludeEventId ? 1 : 0), // Fetch one extra if we need to exclude
            },
          },
        });

        if (gqlError) {
          throw new Error(gqlError.message);
        }

        const events = (gqlData?.upcomingEvents.data ?? []) as EventBase[];
        return excludeEventId
          ? events.filter((e) => e.id !== excludeEventId).slice(0, limit)
          : events;
      }

      const result = await getUpcomingEvents({
        page: 1,
        limit: limit + (excludeEventId ? 1 : 0),
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      const events = result.data.data;
      return excludeEventId
        ? events.filter((e) => e.id !== excludeEventId).slice(0, limit)
        : events;
    },
    staleTime: 5 * 60 * 1000, // 5 min cache
  });

  return {
    upcomingEvents: data ?? [],
    isLoading,
    error,
  };
}
