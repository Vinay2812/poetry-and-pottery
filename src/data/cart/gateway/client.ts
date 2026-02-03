"use client";

import { useCallback } from "react";

import type {
  CartItem,
  ProductCustomizationData,
} from "@/graphql/generated/graphql";
import {
  useAddToCartMutation as useAddToCartGraphQL,
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

// Custom data input type for adding to cart
export type CustomDataInput = {
  options: Array<{
    type: string;
    optionId: number;
    name: string;
    value: string;
    priceModifier: number;
  }>;
  totalModifier: number;
};

// Hook return types
interface UseAddToCartReturn {
  mutate: (
    productId: number,
    quantity?: number,
    customData?: CustomDataInput | null,
  ) => Promise<AddCartResult>;
  loading: boolean;
  error: Error | undefined;
}

interface UseUpdateCartQuantityReturn {
  mutate: (
    productId: number,
    quantity: number,
    customDataHash?: string,
  ) => Promise<UpdateCartResult>;
  loading: boolean;
  error: Error | undefined;
}

interface UseRemoveFromCartReturn {
  mutate: (productId: number) => Promise<RemoveCartResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAddToCart(): UseAddToCartReturn {
  const [graphqlMutate, { loading, error }] = useAddToCartGraphQL();

  const mutate = useCallback(
    async (
      productId: number,
      quantity: number = 1,
      customData?: CustomDataInput | null,
    ): Promise<AddCartResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: {
            input: {
              product_id: productId,
              quantity,
              custom_data: customData ?? null,
            },
          },
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
    async (
      productId: number,
      quantity: number,
      customDataHash?: string,
    ): Promise<UpdateCartResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: {
            input: {
              product_id: productId,
              quantity,
              custom_data_hash: customDataHash ?? "",
            },
          },
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
