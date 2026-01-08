"use client";

import { isGraphQL } from "@/consts/env";
import { useCallback, useState } from "react";

import {
  useCreateEventReviewMutation as useCreateEventReviewGraphQL,
  useCreateProductReviewMutation as useCreateProductReviewGraphQL,
  useDeleteReviewMutation as useDeleteReviewGraphQL,
  useToggleReviewLikeMutation as useToggleReviewLikeGraphQL,
} from "@/graphql/generated/graphql";

import {
  createEventReview as createEventReviewAction,
  createProductReview as createProductReviewAction,
  deleteReview as deleteReviewAction,
  toggleReviewLike as toggleReviewLikeAction,
} from "../server/action";

// Result types
export type CreateReviewResult =
  | { success: true }
  | { success: false; error: string };

export type DeleteReviewResult =
  | { success: true }
  | { success: false; error: string };

export type ToggleReviewLikeResult =
  | { success: true; action: "liked" | "unliked"; likesCount: number }
  | { success: false; error: string };

// Hook return types
interface UseCreateProductReviewReturn {
  mutate: (data: {
    productId: number;
    rating: number;
    review?: string;
    imageUrls?: string[];
  }) => Promise<CreateReviewResult>;
  loading: boolean;
  error: Error | undefined;
}

interface UseCreateEventReviewReturn {
  mutate: (data: {
    eventId: string;
    rating: number;
    review?: string;
    imageUrls?: string[];
  }) => Promise<CreateReviewResult>;
  loading: boolean;
  error: Error | undefined;
}

interface UseDeleteReviewReturn {
  mutate: (reviewId: number) => Promise<DeleteReviewResult>;
  loading: boolean;
  error: Error | undefined;
}

interface UseToggleReviewLikeReturn {
  mutate: (reviewId: number) => Promise<ToggleReviewLikeResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useCreateProductReview(): UseCreateProductReviewReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useCreateProductReviewGraphQL();

  const mutate = useCallback(
    async (data: {
      productId: number;
      rating: number;
      review?: string;
      imageUrls?: string[];
    }): Promise<CreateReviewResult> => {
      if (isGraphQL) {
        try {
          const { data: result } = await graphqlMutate({
            variables: {
              input: {
                productId: data.productId,
                rating: data.rating,
                review: data.review ?? null,
                imageUrls: data.imageUrls ?? [],
              },
            },
          });
          if (result?.createProductReview.success) {
            return { success: true };
          }
          return {
            success: false,
            error:
              result?.createProductReview.error ?? "Failed to create review",
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
          const result = await createProductReviewAction(data);
          if (result.success) {
            return { success: true };
          }
          return {
            success: false,
            error: result.error ?? "Failed to create review",
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

export function useCreateEventReview(): UseCreateEventReviewReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useCreateEventReviewGraphQL();

  const mutate = useCallback(
    async (data: {
      eventId: string;
      rating: number;
      review?: string;
      imageUrls?: string[];
    }): Promise<CreateReviewResult> => {
      if (isGraphQL) {
        try {
          const { data: result } = await graphqlMutate({
            variables: {
              input: {
                eventId: data.eventId,
                rating: data.rating,
                review: data.review ?? null,
                imageUrls: data.imageUrls ?? [],
              },
            },
          });
          if (result?.createEventReview.success) {
            return { success: true };
          }
          return {
            success: false,
            error: result?.createEventReview.error ?? "Failed to create review",
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
          const result = await createEventReviewAction(data);
          if (result.success) {
            return { success: true };
          }
          return {
            success: false,
            error: result.error ?? "Failed to create review",
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

export function useDeleteReview(): UseDeleteReviewReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useDeleteReviewGraphQL();

  const mutate = useCallback(
    async (reviewId: number): Promise<DeleteReviewResult> => {
      if (isGraphQL) {
        try {
          const { data } = await graphqlMutate({
            variables: { reviewId },
          });
          if (data?.deleteReview.success) {
            return { success: true };
          }
          return {
            success: false,
            error: data?.deleteReview.error ?? "Failed to delete review",
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
          const result = await deleteReviewAction(reviewId);
          if (result.success) {
            return { success: true };
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

export function useToggleReviewLike(): UseToggleReviewLikeReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useToggleReviewLikeGraphQL();

  const mutate = useCallback(
    async (reviewId: number): Promise<ToggleReviewLikeResult> => {
      if (isGraphQL) {
        try {
          const { data } = await graphqlMutate({
            variables: { reviewId },
          });
          if (data?.toggleReviewLike.success) {
            return {
              success: true,
              action:
                data.toggleReviewLike.action === "LIKED" ? "liked" : "unliked",
              likesCount: data.toggleReviewLike.likes_count ?? 0,
            };
          }
          return {
            success: false,
            error: data?.toggleReviewLike.error ?? "Failed to toggle like",
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
          const result = await toggleReviewLikeAction(reviewId);
          if (
            result.success &&
            result.action &&
            result.likesCount !== undefined
          ) {
            return {
              success: true,
              action: result.action,
              likesCount: result.likesCount,
            };
          }
          return {
            success: false,
            error: result.error ?? "Failed to toggle like",
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
