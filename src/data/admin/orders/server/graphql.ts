"use server";

import { getClient } from "@/lib/apollo";

import {
  ADMIN_UPDATE_ORDER_DISCOUNT_MUTATION,
  ADMIN_UPDATE_ORDER_ITEM_DISCOUNT_MUTATION,
  ADMIN_UPDATE_ORDER_ITEM_QUANTITY_MUTATION,
  ADMIN_UPDATE_ORDER_PRICE_MUTATION,
  ADMIN_UPDATE_ORDER_STATUS_MUTATION,
} from "@/graphql/admin/orders.mutation";
import type {
  AdminOrderMutationResponse,
  AdminUpdateOrderDiscountMutation,
  AdminUpdateOrderDiscountMutationVariables,
  AdminUpdateOrderItemDiscountMutation,
  AdminUpdateOrderItemDiscountMutationVariables,
  AdminUpdateOrderItemQuantityMutation,
  AdminUpdateOrderItemQuantityMutationVariables,
  AdminUpdateOrderPriceMutation,
  AdminUpdateOrderPriceMutationVariables,
  AdminUpdateOrderStatusMutation,
  AdminUpdateOrderStatusMutationVariables,
} from "@/graphql/generated/types";

export async function updateOrderStatus(
  orderId: string,
  status: string,
): Promise<AdminOrderMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateOrderStatusMutation,
    AdminUpdateOrderStatusMutationVariables
  >({
    mutation: ADMIN_UPDATE_ORDER_STATUS_MUTATION,
    variables: { orderId, status },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateOrderStatus;
}

export async function updateOrderPrice(
  orderId: string,
  total: number,
): Promise<AdminOrderMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateOrderPriceMutation,
    AdminUpdateOrderPriceMutationVariables
  >({
    mutation: ADMIN_UPDATE_ORDER_PRICE_MUTATION,
    variables: { orderId, total },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateOrderPrice;
}

export async function updateOrderDiscount(
  orderId: string,
  discount: number,
): Promise<AdminOrderMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateOrderDiscountMutation,
    AdminUpdateOrderDiscountMutationVariables
  >({
    mutation: ADMIN_UPDATE_ORDER_DISCOUNT_MUTATION,
    variables: { orderId, discount },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateOrderDiscount;
}

export async function updateOrderItemDiscount(
  itemId: number,
  discount: number,
): Promise<AdminOrderMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateOrderItemDiscountMutation,
    AdminUpdateOrderItemDiscountMutationVariables
  >({
    mutation: ADMIN_UPDATE_ORDER_ITEM_DISCOUNT_MUTATION,
    variables: { itemId, discount },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateOrderItemDiscount;
}

export async function updateOrderItemQuantity(
  itemId: number,
  quantity: number,
): Promise<AdminOrderMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateOrderItemQuantityMutation,
    AdminUpdateOrderItemQuantityMutationVariables
  >({
    mutation: ADMIN_UPDATE_ORDER_ITEM_QUANTITY_MUTATION,
    variables: { itemId, quantity },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateOrderItemQuantity;
}
