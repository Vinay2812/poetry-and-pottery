"use client";

import { isGraphQL } from "@/consts/env";
import { useCallback, useState } from "react";

import type { WishlistItem } from "@/graphql/generated/graphql";
import {
  useAddToWishlistMutation as useAddToWishlistGraphQL,
  useMoveToCartMutation as useMoveToCartGraphQL,
  useRemoveFromWishlistMutation as useRemoveFromWishlistGraphQL,
  useToggleWishlistMutation as useToggleWishlistGraphQL,
} from "@/graphql/generated/graphql";

import {
  addToWishlist as addToWishlistAction,
  moveToCart as moveToCartAction,
  removeFromWishlist as removeFromWishlistAction,
  toggleWishlist as toggleWishlistAction,
} from "../server/action";

// Result types
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

// Hook return types
interface UseAddToWishlistReturn {
  mutate: (productId: number) => Promise<AddWishlistResult>;
  loading: boolean;
  error: Error | undefined;
}

interface UseRemoveFromWishlistReturn {
  mutate: (productId: number) => Promise<RemoveWishlistResult>;
  loading: boolean;
  error: Error | undefined;
}

interface UseToggleWishlistReturn {
  mutate: (productId: number) => Promise<ToggleWishlistResult>;
  loading: boolean;
  error: Error | undefined;
}

interface UseMoveToCartReturn {
  mutate: (productId: number) => Promise<MoveToCartResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAddToWishlist(): UseAddToWishlistReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAddToWishlistGraphQL();

  const mutate = useCallback(
    async (productId: number): Promise<AddWishlistResult> => {
      if (isGraphQL) {
        try {
          const { data } = await graphqlMutate({
            variables: { productId },
          });
          if (data?.addToWishlist.success && data.addToWishlist.item) {
            return { success: true, data: data.addToWishlist.item };
          }
          return { success: false, error: "Failed to add to wishlist" };
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
          const result = await addToWishlistAction(productId);
          if (result.success && result.item) {
            return { success: true, data: result.item };
          }
          return { success: false, error: "Failed to add to wishlist" };
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

export function useRemoveFromWishlist(): UseRemoveFromWishlistReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useRemoveFromWishlistGraphQL();

  const mutate = useCallback(
    async (productId: number): Promise<RemoveWishlistResult> => {
      if (isGraphQL) {
        try {
          const { data } = await graphqlMutate({
            variables: { productId },
          });
          return data?.removeFromWishlist
            ? { success: true }
            : { success: false, error: "Failed to remove from wishlist" };
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
          const result = await removeFromWishlistAction(productId);
          return result
            ? { success: true }
            : { success: false, error: "Failed to remove from wishlist" };
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

export function useToggleWishlist(): UseToggleWishlistReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useToggleWishlistGraphQL();

  const mutate = useCallback(
    async (productId: number): Promise<ToggleWishlistResult> => {
      if (isGraphQL) {
        try {
          const { data } = await graphqlMutate({
            variables: { productId },
          });
          if (data?.toggleWishlist.success) {
            return {
              success: true,
              action:
                data.toggleWishlist.action === "ADDED" ? "added" : "removed",
            };
          }
          return { success: false, error: "Failed to toggle wishlist" };
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
          const result = await toggleWishlistAction(productId);
          if (result.success) {
            return {
              success: true,
              action: result.action === "ADDED" ? "added" : "removed",
            };
          }
          return { success: false, error: "Failed to toggle wishlist" };
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

export function useMoveToCart(): UseMoveToCartReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useMoveToCartGraphQL();

  const mutate = useCallback(
    async (productId: number): Promise<MoveToCartResult> => {
      if (isGraphQL) {
        try {
          const { data } = await graphqlMutate({
            variables: { productId },
          });
          return data?.moveToCart
            ? { success: true }
            : { success: false, error: "Failed to move to cart" };
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
          const result = await moveToCartAction(productId);
          return result
            ? { success: true }
            : { success: false, error: "Failed to move to cart" };
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
