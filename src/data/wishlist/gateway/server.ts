"use server";

import { isGraphQL } from "@/consts/env";

import type { WishlistItem, WishlistResponse } from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

// Types that match hook expectations
export type AddWishlistResult =
  | { success: true; data: WishlistItem }
  | { success: false; error: string };

export type RemoveWishlistResult =
  | { success: true }
  | { success: false; error: string };

export type ToggleWishlistResult =
  | { success: true; action: "added" | "removed" }
  | { success: false; error: string };

export type MoveToCartResult =
  | { success: true }
  | { success: false; error: string };

export async function getWishlist(
  page: number = 1,
  limit: number = 12,
): Promise<WishlistResponse> {
  if (isGraphQL) {
    return graphqlImpl.getWishlist(page, limit);
  }
  return actionImpl.getWishlist(page, limit);
}

export async function getWishlistIds(): Promise<number[]> {
  if (isGraphQL) {
    return graphqlImpl.getWishlistIds();
  }
  return actionImpl.getWishlistIds();
}

export async function addToWishlist(
  productId: number,
): Promise<AddWishlistResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.addToWishlist(productId);
      if (result.success && result.item) {
        return { success: true, data: result.item };
      }
      return { success: false, error: "Failed to add to wishlist" };
    }
    const result = await actionImpl.addToWishlist(productId);
    if (result.success && result.item) {
      return { success: true, data: result.item };
    }
    return { success: false, error: "Failed to add to wishlist" };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to add to wishlist",
    };
  }
}

export async function removeFromWishlist(
  productId: number,
): Promise<RemoveWishlistResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.removeFromWishlist(productId);
      return result
        ? { success: true }
        : { success: false, error: "Failed to remove from wishlist" };
    }
    const result = await actionImpl.removeFromWishlist(productId);
    return result
      ? { success: true }
      : { success: false, error: "Failed to remove from wishlist" };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to remove from wishlist",
    };
  }
}

export async function toggleWishlist(
  productId: number,
): Promise<ToggleWishlistResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.toggleWishlist(productId);
      if (result.success) {
        return {
          success: true,
          action: result.action === "ADDED" ? "added" : "removed",
        };
      }
      return { success: false, error: "Failed to update wishlist" };
    }
    const result = await actionImpl.toggleWishlist(productId);
    if (result.success) {
      return {
        success: true,
        action: result.action === "ADDED" ? "added" : "removed",
      };
    }
    return { success: false, error: "Failed to update wishlist" };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update wishlist",
    };
  }
}

export async function moveToCart(productId: number): Promise<MoveToCartResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.moveToCart(productId);
      return result
        ? { success: true }
        : { success: false, error: "Failed to move to cart" };
    }
    const result = await actionImpl.moveToCart(productId);
    return result
      ? { success: true }
      : { success: false, error: "Failed to move to cart" };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to move to cart",
    };
  }
}
