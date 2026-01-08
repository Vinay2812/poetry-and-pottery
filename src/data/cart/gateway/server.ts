"use server";

import { isGraphQL } from "@/consts/env";

import type { CartResponse } from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

export async function getCart(): Promise<CartResponse> {
  if (isGraphQL) {
    return graphqlImpl.getCart();
  }
  return actionImpl.getCart();
}
