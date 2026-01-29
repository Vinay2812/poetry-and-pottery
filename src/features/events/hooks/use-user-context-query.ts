"use client";

import { type UserEventContext } from "@/data/events/gateway/server";
import { useQuery } from "@tanstack/react-query";

import { useEventWithUserContextLazyQuery } from "@/graphql/generated/graphql";

interface UseUserContextQueryOptions {
  eventId: string;
  enabled?: boolean;
}

export function useEventWithUserContextQuery({
  eventId,
  enabled = true,
}: UseUserContextQueryOptions) {
  const [fetchGraphQL] = useEventWithUserContextLazyQuery({
    fetchPolicy: "network-only",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["user-event-context", eventId],
    queryFn: async (): Promise<UserEventContext> => {
      const { data: gqlData, error: gqlError } = await fetchGraphQL({
        variables: { eventId },
      });

      if (gqlError) {
        throw new Error(gqlError.message);
      }

      const context = gqlData?.eventWithUserContext;
      return {
        registration: context?.registration ?? null,
        currentUserId: context?.current_user_id ?? null,
        isPastEvent: context?.is_past_event ?? false,
      };
    },
    staleTime: 30 * 1000, // 30 seconds - user context can change
    enabled: enabled && !!eventId,
  });

  return {
    registration: data?.registration ?? null,
    currentUserId: data?.currentUserId ?? null,
    isPastEvent: data?.isPastEvent ?? false,
    isLoading,
    error,
  };
}
