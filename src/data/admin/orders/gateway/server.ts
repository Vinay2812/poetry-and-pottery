"use server";

import type { AdminOrderMutationResponse } from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

export async function updateOrderStatus(
  orderId: string,
  status: string,
): Promise<AdminOrderMutationResponse> {
  return graphqlImpl.updateOrderStatus(orderId, status);
}

export async function updateOrderDiscount(
  orderId: string,
  discount: number,
): Promise<AdminOrderMutationResponse> {
  return graphqlImpl.updateOrderDiscount(orderId, discount);
}

export async function updateOrderItemDiscount(
  itemId: number,
  discount: number,
): Promise<AdminOrderMutationResponse> {
  return graphqlImpl.updateOrderItemDiscount(itemId, discount);
}

export async function updateOrderItemQuantity(
  itemId: number,
  quantity: number,
): Promise<AdminOrderMutationResponse> {
  return graphqlImpl.updateOrderItemQuantity(itemId, quantity);
}
