"use server";

import { isGraphQL } from "@/consts/env";

import type { UserCounts } from "@/graphql/generated/types";

import * as action from "../server/action";
import * as graphqlImpl from "../server/graphql";

export type UserCountsResult =
  | { success: true; data: UserCounts }
  | { success: false; error: string };

export async function getUserCounts(): Promise<UserCountsResult> {
  try {
    if (isGraphQL) {
      const data = await graphqlImpl.getUserCounts();
      return { success: true, data };
    }
    const data = await action.getUserCounts();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch user counts",
    };
  }
}
