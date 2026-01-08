"use client";

import { isGraphQL } from "@/consts/env";
import { useCallback, useState } from "react";

import type { EventRegistration } from "@/graphql/generated/graphql";
import {
  useCancelRegistrationMutation as useCancelRegistrationGraphQL,
  useRegisterForEventMutation as useRegisterForEventGraphQL,
} from "@/graphql/generated/graphql";

import {
  cancelRegistration as cancelRegistrationAction,
  registerForEvent as registerForEventAction,
} from "../server/action";

// Result types
export type RegisterForEventResult =
  | { success: true; data: EventRegistration }
  | { success: false; error: string };

export type CancelRegistrationResult =
  | { success: true }
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

interface UseCancelRegistrationReturn {
  mutate: (registrationId: string) => Promise<CancelRegistrationResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useRegisterForEvent(): UseRegisterForEventReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useRegisterForEventGraphQL();

  const mutate = useCallback(
    async (input: {
      eventId: string;
      seats?: number;
    }): Promise<RegisterForEventResult> => {
      if (isGraphQL) {
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
            error:
              data?.registerForEvent.error ?? "Failed to register for event",
          };
        } catch (e) {
          return {
            success: false,
            error: e instanceof Error ? e.message : "Unknown error",
          };
        }
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await registerForEventAction({
            eventId: input.eventId,
            seats: input.seats ?? 1,
          });
          if (result.success && result.registration) {
            return { success: true, data: result.registration };
          }
          return {
            success: false,
            error: result.error ?? "Failed to register for event",
          };
        } catch (e) {
          const error = e instanceof Error ? e : new Error("Unknown error");
          setActionError(error);
          return { success: false, error: error.message };
        } finally {
          setActionLoading(false);
        }
      }
    },
    [graphqlMutate],
  );

  return {
    mutate,
    loading: isGraphQL ? graphqlLoading : actionLoading,
    error: isGraphQL ? graphqlError : actionError,
  };
}

export function useCancelRegistration(): UseCancelRegistrationReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useCancelRegistrationGraphQL();

  const mutate = useCallback(
    async (registrationId: string): Promise<CancelRegistrationResult> => {
      if (isGraphQL) {
        try {
          const { data } = await graphqlMutate({
            variables: { registrationId },
          });
          if (data?.cancelRegistration.success) {
            return { success: true };
          }
          return {
            success: false,
            error:
              data?.cancelRegistration.error ?? "Failed to cancel registration",
          };
        } catch (e) {
          return {
            success: false,
            error: e instanceof Error ? e.message : "Unknown error",
          };
        }
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await cancelRegistrationAction(registrationId);
          if (result.success) {
            return { success: true };
          }
          return {
            success: false,
            error: result.error ?? "Failed to cancel registration",
          };
        } catch (e) {
          const error = e instanceof Error ? e : new Error("Unknown error");
          setActionError(error);
          return { success: false, error: error.message };
        } finally {
          setActionLoading(false);
        }
      }
    },
    [graphqlMutate],
  );

  return {
    mutate,
    loading: isGraphQL ? graphqlLoading : actionLoading,
    error: isGraphQL ? graphqlError : actionError,
  };
}
