"use client";

import { isGraphQL } from "@/consts/env";
import { useCallback, useState } from "react";

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

import * as actionImpl from "../server/action";

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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminCreateEventMutation();

  const mutate = useCallback(
    async (input: CreateEventInput): Promise<CreateEventResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.createEvent(input);
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to create event",
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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminUpdateEventMutation();

  const mutate = useCallback(
    async (id: string, input: UpdateEventInput): Promise<UpdateEventResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.updateEvent(id, input);
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to update event",
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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminDeleteEventMutation();

  const mutate = useCallback(
    async (id: string): Promise<DeleteEventResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.deleteEvent(id);
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to delete event",
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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminUpdateEventStatusMutation();

  const mutate = useCallback(
    async (id: string, status: string): Promise<UpdateEventStatusResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.updateEventStatus(id, status);
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to update event status",
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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminDeleteEventReviewMutation();

  const mutate = useCallback(
    async (reviewId: number): Promise<DeleteEventReviewResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.deleteEventReview(reviewId);
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to delete review",
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
