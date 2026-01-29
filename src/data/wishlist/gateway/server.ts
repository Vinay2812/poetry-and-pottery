"use server";

import type { WishlistResponse } from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

export async function getWishlist(
  page: number = 1,
  limit: number = 12,
): Promise<WishlistResponse> {
  return graphqlImpl.getWishlist(page, limit);
}

export async function getWishlistIds(): Promise<number[]> {
  return graphqlImpl.getWishlistIds();
}
