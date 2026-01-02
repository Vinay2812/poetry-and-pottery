"use server";

import { getClient } from "@/lib/apollo";

import { GLOBAL_SEARCH_QUERY } from "@/graphql/search.query";
import type {
  GlobalSearchQuery,
  GlobalSearchQueryVariables,
  GlobalSearchResponse,
} from "@/graphql/generated/types";

export async function globalSearch(
  query: string,
  limit: number = 5,
): Promise<GlobalSearchResponse> {
  const client = getClient();

  const result = await client.query<GlobalSearchQuery, GlobalSearchQueryVariables>({
    query: GLOBAL_SEARCH_QUERY,
    variables: { input: { query, limit } },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.globalSearch ?? {
      products: [],
      events: [],
      orders: [],
      counts: { products: 0, events: 0, orders: 0 },
    }
  );
}
