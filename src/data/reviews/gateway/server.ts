"use server";

import { isGraphQL } from "@/consts/env";

import type { ReviewsResponse } from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

export async function getProductReviews(
  productId: number,
  page: number = 1,
  limit: number = 10,
): Promise<ReviewsResponse> {
  if (isGraphQL) {
    return graphqlImpl.getProductReviews(productId, page, limit);
  }
  return actionImpl.getProductReviews(productId, page, limit);
}

export async function getEventReviews(
  eventId: string,
  page: number = 1,
  limit: number = 10,
): Promise<ReviewsResponse> {
  if (isGraphQL) {
    return graphqlImpl.getEventReviews(eventId, page, limit);
  }
  return actionImpl.getEventReviews(eventId, page, limit);
}

export async function createProductReview(data: {
  productId: number;
  rating: number;
  review?: string;
  imageUrls?: string[];
}): Promise<{ success: boolean; error?: string }> {
  if (isGraphQL) {
    return graphqlImpl.createProductReview(data);
  }
  return actionImpl.createProductReview(data);
}

export async function createEventReview(data: {
  eventId: string;
  rating: number;
  review?: string;
  imageUrls?: string[];
}): Promise<{ success: boolean; error?: string }> {
  if (isGraphQL) {
    return graphqlImpl.createEventReview(data);
  }
  return actionImpl.createEventReview(data);
}

export async function deleteReview(
  reviewId: number,
): Promise<{ success: boolean; error?: string }> {
  if (isGraphQL) {
    return graphqlImpl.deleteReview(reviewId);
  }
  return actionImpl.deleteReview(reviewId);
}

export async function toggleReviewLike(reviewId: number): Promise<{
  success: boolean;
  action?: "liked" | "unliked";
  likesCount?: number;
  error?: string;
}> {
  if (isGraphQL) {
    return graphqlImpl.toggleReviewLike(reviewId);
  }
  return actionImpl.toggleReviewLike(reviewId);
}
