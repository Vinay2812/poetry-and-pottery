"use server";

import { isGraphQL } from "@/consts/env";

import type { CartItem, CartResponse } from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

// Types that match hook expectations
export type AddCartResult =
  | { success: true; data: CartItem }
  | { success: false; error: string };

export type UpdateCartResult =
  | { success: true; data: CartItem | null }
  | { success: false; error: string };

export type RemoveCartResult =
  | { success: true }
  | { success: false; error: string };

export type ClearCartResult =
  | { success: true }
  | { success: false; error: string };

export async function getCart(): Promise<CartResponse> {
  if (isGraphQL) {
    return graphqlImpl.getCart();
  }
  return actionImpl.getCart();
}

export async function addToCart(
  productId: number,
  quantity: number = 1,
): Promise<AddCartResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.addToCart(productId, quantity);
      if (result.success && result.item) {
        return { success: true, data: result.item };
      }
      return { success: false, error: "Failed to add to cart" };
    }
    const result = await actionImpl.addToCart(productId, quantity);
    if (result.success && result.item) {
      return { success: true, data: result.item };
    }
    return { success: false, error: "Failed to add to cart" };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add to cart",
    };
  }
}

export async function updateCartQuantity(
  productId: number,
  quantity: number,
): Promise<UpdateCartResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.updateCartQuantity(productId, quantity);
      if (result.success) {
        return { success: true, data: result.item ?? null };
      }
      return { success: false, error: "Failed to update cart" };
    }
    const result = await actionImpl.updateCartQuantity(productId, quantity);
    if (result.success) {
      return { success: true, data: result.item ?? null };
    }
    return { success: false, error: "Failed to update cart" };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update cart",
    };
  }
}

export async function removeFromCart(
  productId: number,
): Promise<RemoveCartResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.removeFromCart(productId);
      return result
        ? { success: true }
        : { success: false, error: "Failed to remove from cart" };
    }
    const result = await actionImpl.removeFromCart(productId);
    return result
      ? { success: true }
      : { success: false, error: "Failed to remove from cart" };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to remove from cart",
    };
  }
}

export async function clearCart(): Promise<ClearCartResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.clearCart();
      return result
        ? { success: true }
        : { success: false, error: "Failed to clear cart" };
    }
    const result = await actionImpl.clearCart();
    return result
      ? { success: true }
      : { success: false, error: "Failed to clear cart" };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to clear cart",
    };
  }
}
