"use server";

import type { CartResponse } from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

export async function getCart(): Promise<CartResponse> {
  return graphqlImpl.getCart();
}
