"use client";

import { useCallback } from "react";

import type { EventRegistration } from "@/graphql/generated/graphql";
import { useRegisterForEventMutation as useRegisterForEventGraphQL } from "@/graphql/generated/graphql";

// Result types
export type RegisterForEventResult =
  | { success: true; data: EventRegistration }
  | { success: false; error: string };

// Hook return types
interface UseRegisterForEventReturn {
  mutate: (input: {
    eventId: string;
    seats?: number;
  }) => Promise<RegisterForEventResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useRegisterForEvent(): UseRegisterForEventReturn {
  const [graphqlMutate, { loading, error }] = useRegisterForEventGraphQL();

  const mutate = useCallback(
    async (input: {
      eventId: string;
      seats?: number;
    }): Promise<RegisterForEventResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: {
            input: {
              eventId: input.eventId,
              seats: input.seats ?? 1,
            },
          },
        });
        if (
          data?.registerForEvent.success &&
          data.registerForEvent.registration
        ) {
          return { success: true, data: data.registerForEvent.registration };
        }
        return {
          success: false,
          error: data?.registerForEvent.error ?? "Failed to register for event",
        };
      } catch (e) {
        return {
          success: false,
          error: e instanceof Error ? e.message : "Unknown error",
        };
      }
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
}
