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
