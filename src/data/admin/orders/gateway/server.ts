"use server";

import { isGraphQL } from "@/consts/env";

import type { AdminOrderMutationResponse } from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

export async function updateOrderStatus(
  orderId: string,
  status: string,
): Promise<AdminOrderMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.updateOrderStatus(orderId, status);
  }
  return actionImpl.updateOrderStatus(orderId, status);
}

export async function updateOrderPrice(
  orderId: string,
  total: number,
): Promise<AdminOrderMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.updateOrderPrice(orderId, total);
  }
  return actionImpl.updateOrderPrice(orderId, total);
}

export async function updateOrderDiscount(
  orderId: string,
  discount: number,
): Promise<AdminOrderMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.updateOrderDiscount(orderId, discount);
  }
  return actionImpl.updateOrderDiscount(orderId, discount);
}

export async function updateOrderItemDiscount(
  itemId: number,
  discount: number,
): Promise<AdminOrderMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.updateOrderItemDiscount(itemId, discount);
  }
  return actionImpl.updateOrderItemDiscount(itemId, discount);
}

export async function updateOrderItemQuantity(
  itemId: number,
  quantity: number,
): Promise<AdminOrderMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.updateOrderItemQuantity(itemId, quantity);
  }
  return actionImpl.updateOrderItemQuantity(itemId, quantity);
}
