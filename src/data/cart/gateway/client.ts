"use client";

import { isGraphQL } from "@/consts/env";
import { useCallback, useState } from "react";

import type { CartItem } from "@/graphql/generated/graphql";
import {
  useAddToCartMutation as useAddToCartGraphQL,
  useClearCartMutation as useClearCartGraphQL,
  useRemoveFromCartMutation as useRemoveFromCartGraphQL,
  useUpdateCartQuantityMutation as useUpdateCartQuantityGraphQL,
} from "@/graphql/generated/graphql";

import {
  addToCart as addToCartAction,
  clearCart as clearCartAction,
  removeFromCart as removeFromCartAction,
  updateCartQuantity as updateCartQuantityAction,
} from "../server/action";

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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAddToCartGraphQL();

  const mutate = useCallback(
    async (productId: number, quantity: number = 1): Promise<AddCartResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await addToCartAction(productId, quantity);
          if (result.success && result.item) {
            return { success: true, data: result.item };
          }
          return { success: false, error: "Failed to add to cart" };
        } catch (e) {
          const error = e instanceof Error ? e : new Error("Unknown error");
          setActionError(error);
          return { success: false, error: error.message };
        } finally {
          setActionLoading(false);
        }
      }
    },
    [graphqlMutate],
  );

  return {
    mutate,
    loading: isGraphQL ? graphqlLoading : actionLoading,
    error: isGraphQL ? graphqlError : actionError,
  };
}

export function useUpdateCartQuantity(): UseUpdateCartQuantityReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useUpdateCartQuantityGraphQL();

  const mutate = useCallback(
    async (productId: number, quantity: number): Promise<UpdateCartResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await updateCartQuantityAction(productId, quantity);
          if (result.success) {
            return { success: true, data: result.item ?? null };
          }
          return { success: false, error: "Failed to update cart" };
        } catch (e) {
          const error = e instanceof Error ? e : new Error("Unknown error");
          setActionError(error);
          return { success: false, error: error.message };
        } finally {
          setActionLoading(false);
        }
      }
    },
    [graphqlMutate],
  );

  return {
    mutate,
    loading: isGraphQL ? graphqlLoading : actionLoading,
    error: isGraphQL ? graphqlError : actionError,
  };
}

export function useRemoveFromCart(): UseRemoveFromCartReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useRemoveFromCartGraphQL();

  const mutate = useCallback(
    async (productId: number): Promise<RemoveCartResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await removeFromCartAction(productId);
          return result
            ? { success: true }
            : { success: false, error: "Failed to remove from cart" };
        } catch (e) {
          const error = e instanceof Error ? e : new Error("Unknown error");
          setActionError(error);
          return { success: false, error: error.message };
        } finally {
          setActionLoading(false);
        }
      }
    },
    [graphqlMutate],
  );

  return {
    mutate,
    loading: isGraphQL ? graphqlLoading : actionLoading,
    error: isGraphQL ? graphqlError : actionError,
  };
}

export function useClearCart(): UseClearCartReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useClearCartGraphQL();

  const mutate = useCallback(async (): Promise<ClearCartResult> => {
    if (isGraphQL) {
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
    } else {
      setActionLoading(true);
      setActionError(undefined);
      try {
        const result = await clearCartAction();
        return result
          ? { success: true }
          : { success: false, error: "Failed to clear cart" };
      } catch (e) {
        const error = e instanceof Error ? e : new Error("Unknown error");
        setActionError(error);
        return { success: false, error: error.message };
      } finally {
        setActionLoading(false);
      }
    }
  }, [graphqlMutate]);

  return {
    mutate,
    loading: isGraphQL ? graphqlLoading : actionLoading,
    error: isGraphQL ? graphqlError : actionError,
  };
}
