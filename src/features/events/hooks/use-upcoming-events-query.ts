"use client";

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
    queryKey: ["upcoming-events-recommendation", limit, excludeEventId],
    queryFn: async (): Promise<EventBase[]> => {
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
    },
    staleTime: 5 * 60 * 1000, // 5 min cache
  });

  return {
    upcomingEvents: data ?? [],
    isLoading,
    error,
  };
}
