"use server";

import type { ReviewsResponse } from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

export async function getProductReviews(
  productId: number,
  page: number = 1,
  limit: number = 10,
): Promise<ReviewsResponse> {
  return graphqlImpl.getProductReviews(productId, page, limit);
}

export async function getEventReviews(
  eventId: string,
  page: number = 1,
  limit: number = 10,
): Promise<ReviewsResponse> {
  return graphqlImpl.getEventReviews(eventId, page, limit);
}
