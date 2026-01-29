"use client";

import { useCallback } from "react";

import {
  useCreateEventReviewMutation as useCreateEventReviewGraphQL,
  useCreateProductReviewMutation as useCreateProductReviewGraphQL,
  useDeleteReviewMutation as useDeleteReviewGraphQL,
  useToggleReviewLikeMutation as useToggleReviewLikeGraphQL,
} from "@/graphql/generated/graphql";

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
  const [graphqlMutate, { loading, error }] = useCreateProductReviewGraphQL();

  const mutate = useCallback(
    async (data: {
      productId: number;
      rating: number;
      review?: string;
      imageUrls?: string[];
    }): Promise<CreateReviewResult> => {
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
          error: result?.createProductReview.error ?? "Failed to create review",
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

export function useCreateEventReview(): UseCreateEventReviewReturn {
  const [graphqlMutate, { loading, error }] = useCreateEventReviewGraphQL();

  const mutate = useCallback(
    async (data: {
      eventId: string;
      rating: number;
      review?: string;
      imageUrls?: string[];
    }): Promise<CreateReviewResult> => {
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
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
}

export function useDeleteReview(): UseDeleteReviewReturn {
  const [graphqlMutate, { loading, error }] = useDeleteReviewGraphQL();

  const mutate = useCallback(
    async (reviewId: number): Promise<DeleteReviewResult> => {
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
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
}

export function useToggleReviewLike(): UseToggleReviewLikeReturn {
  const [graphqlMutate, { loading, error }] = useToggleReviewLikeGraphQL();

  const mutate = useCallback(
    async (reviewId: number): Promise<ToggleReviewLikeResult> => {
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
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
}
