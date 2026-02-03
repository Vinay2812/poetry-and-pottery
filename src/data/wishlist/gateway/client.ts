"use client";

import { useCallback } from "react";

import type { WishlistItem } from "@/graphql/generated/graphql";
import {
  useAddToWishlistMutation as useAddToWishlistGraphQL,
  useRemoveFromWishlistMutation as useRemoveFromWishlistGraphQL,
  useToggleWishlistMutation as useToggleWishlistGraphQL,
} from "@/graphql/generated/graphql";

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

export function useAddToWishlist(): UseAddToWishlistReturn {
  const [graphqlMutate, { loading, error }] = useAddToWishlistGraphQL();

  const mutate = useCallback(
    async (productId: number): Promise<AddWishlistResult> => {
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
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
}

export function useRemoveFromWishlist(): UseRemoveFromWishlistReturn {
  const [graphqlMutate, { loading, error }] = useRemoveFromWishlistGraphQL();

  const mutate = useCallback(
    async (productId: number): Promise<RemoveWishlistResult> => {
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
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
}

export function useToggleWishlist(): UseToggleWishlistReturn {
  const [graphqlMutate, { loading, error }] = useToggleWishlistGraphQL();

  const mutate = useCallback(
    async (productId: number): Promise<ToggleWishlistResult> => {
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
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
}
