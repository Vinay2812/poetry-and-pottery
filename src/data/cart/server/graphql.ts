"use server";

import { getClient } from "@/lib/apollo";

import {
  ADD_TO_CART_MUTATION,
  CLEAR_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  UPDATE_CART_QUANTITY_MUTATION,
} from "@/graphql/cart.mutation";
import { CART_QUERY } from "@/graphql/cart.query";
import type {
  AddToCartMutation,
  AddToCartMutationVariables,
  CartMutationResponse,
  CartQuery,
  CartResponse,
  ClearCartMutation,
  RemoveFromCartMutation,
  RemoveFromCartMutationVariables,
  UpdateCartQuantityMutation,
  UpdateCartQuantityMutationVariables,
} from "@/graphql/generated/types";

export async function getCart(): Promise<CartResponse> {
  const client = getClient();

  const result = await client.query<CartQuery>({
    query: CART_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.cart ?? { items: [], total: 0, subtotal: 0 };
}

export async function addToCart(
  productId: number,
  quantity: number = 1,
): Promise<CartMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AddToCartMutation,
    AddToCartMutationVariables
  >({
    mutation: ADD_TO_CART_MUTATION,
    variables: {
      input: { product_id: productId, quantity },
    },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.addToCart ?? { success: false, item: null };
}

export async function updateCartQuantity(
  productId: number,
  quantity: number,
): Promise<CartMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    UpdateCartQuantityMutation,
    UpdateCartQuantityMutationVariables
  >({
    mutation: UPDATE_CART_QUANTITY_MUTATION,
    variables: {
      input: { product_id: productId, quantity },
    },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.updateCartQuantity ?? { success: false, item: null };
}

export async function removeFromCart(productId: number): Promise<boolean> {
  const client = getClient();

  const result = await client.mutate<
    RemoveFromCartMutation,
    RemoveFromCartMutationVariables
  >({
    mutation: REMOVE_FROM_CART_MUTATION,
    variables: { productId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.removeFromCart ?? false;
}

export async function clearCart(): Promise<boolean> {
  const client = getClient();

  const result = await client.mutate<ClearCartMutation>({
    mutation: CLEAR_CART_MUTATION,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.clearCart ?? false;
}
