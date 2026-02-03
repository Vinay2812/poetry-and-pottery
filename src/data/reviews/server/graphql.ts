"use server";

import { getClient } from "@/lib/apollo";

import type {
  CreateEventReviewMutation,
  CreateEventReviewMutationVariables,
  CreateProductReviewMutation,
  CreateProductReviewMutationVariables,
  EventReviewsQuery,
  EventReviewsQueryVariables,
  ProductReviewsQuery,
  ProductReviewsQueryVariables,
  ReviewsResponse,
  ToggleReviewLikeMutation,
  ToggleReviewLikeMutationVariables,
} from "@/graphql/generated/types";
import {
  CREATE_EVENT_REVIEW_MUTATION,
  CREATE_PRODUCT_REVIEW_MUTATION,
  TOGGLE_REVIEW_LIKE_MUTATION,
} from "@/graphql/reviews.mutation";
import {
  EVENT_REVIEWS_QUERY,
  PRODUCT_REVIEWS_QUERY,
} from "@/graphql/reviews.query";

export async function getProductReviews(
  productId: number,
  page: number = 1,
  limit: number = 10,
): Promise<ReviewsResponse> {
  const client = getClient();

  const result = await client.query<
    ProductReviewsQuery,
    ProductReviewsQueryVariables
  >({
    query: PRODUCT_REVIEWS_QUERY,
    variables: {
      productId,
      filter: { page, limit },
    },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  if (!result.data?.productReviews) {
    throw new Error("No reviews data returned from GraphQL");
  }

  return result.data.productReviews;
}

export async function getEventReviews(
  eventId: string,
  page: number = 1,
  limit: number = 10,
): Promise<ReviewsResponse> {
  const client = getClient();

  const result = await client.query<
    EventReviewsQuery,
    EventReviewsQueryVariables
  >({
    query: EVENT_REVIEWS_QUERY,
    variables: {
      eventId,
      filter: { page, limit },
    },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  if (!result.data?.eventReviews) {
    throw new Error("No reviews data returned from GraphQL");
  }

  return result.data.eventReviews;
}

export async function createProductReview(data: {
  productId: number;
  rating: number;
  review?: string;
  imageUrls?: string[];
}): Promise<{ success: boolean; error?: string }> {
  const client = getClient();

  const result = await client.mutate<
    CreateProductReviewMutation,
    CreateProductReviewMutationVariables
  >({
    mutation: CREATE_PRODUCT_REVIEW_MUTATION,
    variables: {
      input: {
        productId: data.productId,
        rating: data.rating,
        review: data.review,
        imageUrls: data.imageUrls,
      },
    },
  });

  if (result.error) {
    return { success: false, error: result.error.message };
  }

  if (!result.data?.createProductReview) {
    return { success: false, error: "No response from server" };
  }

  return {
    success: result.data.createProductReview.success,
    error: result.data.createProductReview.error ?? undefined,
  };
}

export async function createEventReview(data: {
  eventId: string;
  rating: number;
  review?: string;
  imageUrls?: string[];
}): Promise<{ success: boolean; error?: string }> {
  const client = getClient();

  const result = await client.mutate<
    CreateEventReviewMutation,
    CreateEventReviewMutationVariables
  >({
    mutation: CREATE_EVENT_REVIEW_MUTATION,
    variables: {
      input: {
        eventId: data.eventId,
        rating: data.rating,
        review: data.review,
        imageUrls: data.imageUrls,
      },
    },
  });

  if (result.error) {
    return { success: false, error: result.error.message };
  }

  if (!result.data?.createEventReview) {
    return { success: false, error: "No response from server" };
  }

  return {
    success: result.data.createEventReview.success,
    error: result.data.createEventReview.error ?? undefined,
  };
}

export async function toggleReviewLike(reviewId: number): Promise<{
  success: boolean;
  action?: "liked" | "unliked";
  likesCount?: number;
  error?: string;
}> {
  const client = getClient();

  const result = await client.mutate<
    ToggleReviewLikeMutation,
    ToggleReviewLikeMutationVariables
  >({
    mutation: TOGGLE_REVIEW_LIKE_MUTATION,
    variables: { reviewId },
  });

  if (result.error) {
    return { success: false, error: result.error.message };
  }

  if (!result.data?.toggleReviewLike) {
    return { success: false, error: "No response from server" };
  }

  const response = result.data.toggleReviewLike;
  return {
    success: response.success,
    action:
      response.action === "LIKED"
        ? "liked"
        : response.action === "UNLIKED"
          ? "unliked"
          : undefined,
    likesCount: response.likes_count ?? undefined,
    error: response.error ?? undefined,
  };
}
