"use client";

import { useCallback } from "react";

import type { CartItem } from "@/graphql/generated/graphql";
import {
  useAddToCartMutation as useAddToCartGraphQL,
  useClearCartMutation as useClearCartGraphQL,
  useRemoveFromCartMutation as useRemoveFromCartGraphQL,
  useUpdateCartQuantityMutation as useUpdateCartQuantityGraphQL,
} from "@/graphql/generated/graphql";

// Result types
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

// Hook return types
interface UseAddToCartReturn {
  mutate: (productId: number, quantity?: number) => Promise<AddCartResult>;
  loading: boolean;
  error: Error | undefined;
}

interface UseUpdateCartQuantityReturn {
  mutate: (productId: number, quantity: number) => Promise<UpdateCartResult>;
  loading: boolean;
  error: Error | undefined;
}

interface UseRemoveFromCartReturn {
  mutate: (productId: number) => Promise<RemoveCartResult>;
  loading: boolean;
  error: Error | undefined;
}

interface UseClearCartReturn {
  mutate: () => Promise<ClearCartResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAddToCart(): UseAddToCartReturn {
  const [graphqlMutate, { loading, error }] = useAddToCartGraphQL();

  const mutate = useCallback(
    async (productId: number, quantity: number = 1): Promise<AddCartResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: { input: { product_id: productId, quantity } },
        });
        if (data?.addToCart.success && data.addToCart.item) {
          return { success: true, data: data.addToCart.item };
        }
        return { success: false, error: "Failed to add to cart" };
      } catch (e) {
        return {
          success: false,
          error: e instanceof Error ? e.message : "Unknown error",
        };
      }
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
}

export function useUpdateCartQuantity(): UseUpdateCartQuantityReturn {
  const [graphqlMutate, { loading, error }] = useUpdateCartQuantityGraphQL();

  const mutate = useCallback(
    async (productId: number, quantity: number): Promise<UpdateCartResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: { input: { product_id: productId, quantity } },
        });
        if (data?.updateCartQuantity.success) {
          return {
            success: true,
            data: data.updateCartQuantity.item ?? null,
          };
        }
        return { success: false, error: "Failed to update cart" };
      } catch (e) {
        return {
          success: false,
          error: e instanceof Error ? e.message : "Unknown error",
        };
      }
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
}

export function useRemoveFromCart(): UseRemoveFromCartReturn {
  const [graphqlMutate, { loading, error }] = useRemoveFromCartGraphQL();

  const mutate = useCallback(
    async (productId: number): Promise<RemoveCartResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: { productId },
        });
        return data?.removeFromCart
          ? { success: true }
          : { success: false, error: "Failed to remove from cart" };
      } catch (e) {
        return {
          success: false,
          error: e instanceof Error ? e.message : "Unknown error",
        };
      }
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
}

export function useClearCart(): UseClearCartReturn {
  const [graphqlMutate, { loading, error }] = useClearCartGraphQL();

  const mutate = useCallback(async (): Promise<ClearCartResult> => {
    try {
      const { data } = await graphqlMutate();
      return data?.clearCart
        ? { success: true }
        : { success: false, error: "Failed to clear cart" };
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : "Unknown error",
      };
    }
  }, [graphqlMutate]);

  return { mutate, loading, error };
}
