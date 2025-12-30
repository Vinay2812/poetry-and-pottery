"use server";

import { getClient } from "@/lib/apollo";

import type {
  AddToWishlistMutation,
  AddToWishlistMutationVariables,
  MoveToCartMutation,
  MoveToCartMutationVariables,
  RemoveFromWishlistMutation,
  RemoveFromWishlistMutationVariables,
  ToggleWishlistMutation,
  ToggleWishlistMutationVariables,
  ToggleWishlistResponse,
  WishlistIdsQuery,
  WishlistMutationResponse,
  WishlistQuery,
  WishlistQueryVariables,
  WishlistResponse,
} from "@/graphql/generated/types";
import { ToggleAction } from "@/graphql/generated/types";
import {
  ADD_TO_WISHLIST_MUTATION,
  MOVE_TO_CART_MUTATION,
  REMOVE_FROM_WISHLIST_MUTATION,
  TOGGLE_WISHLIST_MUTATION,
} from "@/graphql/wishlist.mutation";
import { WISHLIST_IDS_QUERY, WISHLIST_QUERY } from "@/graphql/wishlist.query";

export async function getWishlist(
  page: number = 1,
  limit: number = 12,
): Promise<WishlistResponse> {
  const client = getClient();

  const result = await client.query<WishlistQuery, WishlistQueryVariables>({
    query: WISHLIST_QUERY,
    variables: { filter: { page, limit } },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.wishlist ?? { data: [], total: 0, page: 1, total_pages: 0 }
  );
}

export async function getWishlistIds(): Promise<number[]> {
  const client = getClient();

  const result = await client.query<WishlistIdsQuery>({
    query: WISHLIST_IDS_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.wishlistIds ?? [];
}

export async function addToWishlist(
  productId: number,
): Promise<WishlistMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AddToWishlistMutation,
    AddToWishlistMutationVariables
  >({
    mutation: ADD_TO_WISHLIST_MUTATION,
    variables: { productId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.addToWishlist ?? { success: false, item: null };
}

export async function removeFromWishlist(productId: number): Promise<boolean> {
  const client = getClient();

  const result = await client.mutate<
    RemoveFromWishlistMutation,
    RemoveFromWishlistMutationVariables
  >({
    mutation: REMOVE_FROM_WISHLIST_MUTATION,
    variables: { productId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.removeFromWishlist ?? false;
}

export async function toggleWishlist(
  productId: number,
): Promise<ToggleWishlistResponse> {
  const client = getClient();

  const result = await client.mutate<
    ToggleWishlistMutation,
    ToggleWishlistMutationVariables
  >({
    mutation: TOGGLE_WISHLIST_MUTATION,
    variables: { productId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.toggleWishlist ?? {
      success: false,
      action: ToggleAction.Removed,
      item: null,
    }
  );
}

export async function moveToCart(productId: number): Promise<boolean> {
  const client = getClient();

  const result = await client.mutate<
    MoveToCartMutation,
    MoveToCartMutationVariables
  >({
    mutation: MOVE_TO_CART_MUTATION,
    variables: { productId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.moveToCart ?? false;
}
