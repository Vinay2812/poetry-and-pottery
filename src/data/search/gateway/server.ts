"use server";

import { isGraphQL } from "@/consts/env";

import type { GlobalSearchResponse } from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

export type { GlobalSearchResponse };

export async function globalSearch(
  query: string,
  limit: number = 5,
): Promise<GlobalSearchResponse> {
  try {
    if (isGraphQL) {
      return graphqlImpl.globalSearch(query, limit);
    }
    return actionImpl.globalSearch(query, limit);
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
