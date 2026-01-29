"use client";

import { useCallback } from "react";

import {
  useAdminCreateEventMutation,
  useAdminDeleteEventMutation,
  useAdminDeleteEventReviewMutation,
  useAdminUpdateEventMutation,
  useAdminUpdateEventStatusMutation,
} from "@/graphql/generated/graphql";
import type {
  AdminEventMutationResponse,
  CreateEventInput,
  UpdateEventInput,
} from "@/graphql/generated/types";

// ============ CREATE EVENT ============

type CreateEventResult =
  | { success: true; data: AdminEventMutationResponse }
  | { success: false; error: string };

interface UseAdminCreateEventReturn {
  mutate: (input: CreateEventInput) => Promise<CreateEventResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminCreateEvent(): UseAdminCreateEventReturn {
  const [graphqlMutate, { loading, error }] = useAdminCreateEventMutation();

  const mutate = useCallback(
    async (input: CreateEventInput): Promise<CreateEventResult> => {
      try {
        const { data } = await graphqlMutate({ variables: { input } });
        if (data?.adminCreateEvent) {
          return { success: true, data: data.adminCreateEvent };
        }
        return { success: false, error: "Failed to create event" };
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

// ============ UPDATE EVENT ============

type UpdateEventResult =
  | { success: true; data: AdminEventMutationResponse }
  | { success: false; error: string };

interface UseAdminUpdateEventReturn {
  mutate: (id: string, input: UpdateEventInput) => Promise<UpdateEventResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminUpdateEvent(): UseAdminUpdateEventReturn {
  const [graphqlMutate, { loading, error }] = useAdminUpdateEventMutation();

  const mutate = useCallback(
    async (id: string, input: UpdateEventInput): Promise<UpdateEventResult> => {
      try {
        const { data } = await graphqlMutate({ variables: { id, input } });
        if (data?.adminUpdateEvent) {
          return { success: true, data: data.adminUpdateEvent };
        }
        return { success: false, error: "Failed to update event" };
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

// ============ DELETE EVENT ============

type DeleteEventResult =
  | { success: true; data: AdminEventMutationResponse }
  | { success: false; error: string };

interface UseAdminDeleteEventReturn {
  mutate: (id: string) => Promise<DeleteEventResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminDeleteEvent(): UseAdminDeleteEventReturn {
  const [graphqlMutate, { loading, error }] = useAdminDeleteEventMutation();

  const mutate = useCallback(
    async (id: string): Promise<DeleteEventResult> => {
      try {
        const { data } = await graphqlMutate({ variables: { id } });
        if (data?.adminDeleteEvent) {
          return { success: true, data: data.adminDeleteEvent };
        }
        return { success: false, error: "Failed to delete event" };
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

// ============ UPDATE EVENT STATUS ============

type UpdateEventStatusResult =
  | { success: true; data: AdminEventMutationResponse }
  | { success: false; error: string };

interface UseAdminUpdateEventStatusReturn {
  mutate: (id: string, status: string) => Promise<UpdateEventStatusResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminUpdateEventStatus(): UseAdminUpdateEventStatusReturn {
  const [graphqlMutate, { loading, error }] =
    useAdminUpdateEventStatusMutation();

  const mutate = useCallback(
    async (id: string, status: string): Promise<UpdateEventStatusResult> => {
      try {
        const { data } = await graphqlMutate({ variables: { id, status } });
        if (data?.adminUpdateEventStatus) {
          return { success: true, data: data.adminUpdateEventStatus };
        }
        return { success: false, error: "Failed to update event status" };
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

// ============ DELETE EVENT REVIEW ============

type DeleteEventReviewResult =
  | { success: true; data: AdminEventMutationResponse }
  | { success: false; error: string };

interface UseAdminDeleteEventReviewReturn {
  mutate: (reviewId: number) => Promise<DeleteEventReviewResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminDeleteEventReview(): UseAdminDeleteEventReviewReturn {
  const [graphqlMutate, { loading, error }] =
    useAdminDeleteEventReviewMutation();

  const mutate = useCallback(
    async (reviewId: number): Promise<DeleteEventReviewResult> => {
      try {
        const { data } = await graphqlMutate({ variables: { reviewId } });
        if (data?.adminDeleteEventReview) {
          return { success: true, data: data.adminDeleteEventReview };
        }
        return { success: false, error: "Failed to delete review" };
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
