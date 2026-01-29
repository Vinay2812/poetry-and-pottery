"use client";

import { useQuery } from "@tanstack/react-query";

import { useEventReviewsLazyQuery } from "@/graphql/generated/graphql";
import type { Review } from "@/graphql/generated/types";

interface UseEventReviewsQueryOptions {
  eventId: string;
  limit?: number;
}

export function useEventReviewsQuery({
  eventId,
  limit = 10,
}: UseEventReviewsQueryOptions) {
  const [fetchGraphQL] = useEventReviewsLazyQuery({
    fetchPolicy: "network-only",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["event-reviews", eventId, limit],
    queryFn: async () => {
      const { data: gqlData, error: gqlError } = await fetchGraphQL({
        variables: {
          eventId,
          filter: { page: 1, limit },
        },
      });

      if (gqlError) {
        throw new Error(gqlError.message);
      }

      return {
        reviews: (gqlData?.eventReviews.data ?? []) as Review[],
        total: gqlData?.eventReviews.total ?? 0,
      };
    },
    staleTime: 2 * 60 * 1000, // 2 min cache - reviews change more frequently
    enabled: !!eventId,
  });

  return {
    reviews: data?.reviews ?? [],
    totalReviews: data?.total ?? 0,
    isLoading,
    error,
  };
}
