"use server";

import { isGraphQL } from "@/consts/env";

import type { WishlistResponse } from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

export async function getWishlist(
  page: number = 1,
  limit: number = 12,
): Promise<WishlistResponse> {
  if (isGraphQL) {
    return graphqlImpl.getWishlist(page, limit);
  }
  return actionImpl.getWishlist(page, limit);
}

export async function getWishlistIds(): Promise<number[]> {
  if (isGraphQL) {
    return graphqlImpl.getWishlistIds();
  }
  return actionImpl.getWishlistIds();
}
