"use server";

import { getClient } from "@/lib/apollo";

import { USER_COUNTS_QUERY } from "@/graphql/user.query";
import type { UserCounts, UserCountsQuery } from "@/graphql/generated/types";

export async function getUserCounts(): Promise<UserCounts> {
  const client = getClient();

  const result = await client.query<UserCountsQuery>({
    query: USER_COUNTS_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.userCounts ?? {
      cartCount: 0,
      wishlistCount: 0,
      eventRegistrationsCount: 0,
      pendingOrdersCount: 0,
    }
  );
}
