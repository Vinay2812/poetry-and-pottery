"use server";

import type { UserCounts } from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

export type UserCountsResult =
  | { success: true; data: UserCounts }
  | { success: false; error: string };

export async function getUserCounts(): Promise<UserCountsResult> {
  try {
    const data = await graphqlImpl.getUserCounts();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch user counts",
    };
  }
}
