"use server";

import type { GlobalSearchResponse } from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

export async function globalSearch(
  query: string,
  limit: number = 5,
): Promise<GlobalSearchResponse> {
  try {
    return graphqlImpl.globalSearch(query, limit);
  } catch (error) {
    console.error("Global search error:", error);
    return {
      products: [],
      events: [],
      orders: [],
      counts: { products: 0, events: 0, orders: 0 },
    };
  }
}
