"use client";

import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useToggleWishlist,
} from "@/data/wishlist/gateway/client";
import { useLoadingTransition } from "@/hooks/use-loading-transition";
import { useUIStore } from "@/store";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useOptimistic, useState, useTransition } from "react";

type WishlistOptimisticAction =
  | { type: "toggle"; productId: number }
  | { type: "add"; productId: number }
  | { type: "remove"; productId: number };

function applyWishlistAction(
  state: Set<number>,
  action: WishlistOptimisticAction,
): Set<number> {
  const next = new Set(state);
  switch (action.type) {
    case "toggle":
      if (next.has(action.productId)) {
        next.delete(action.productId);
      } else {
        next.add(action.productId);
      }
      return next;
    case "add":
      next.add(action.productId);
      return next;
    case "remove":
      next.delete(action.productId);
      return next;
    default:
      return next;
  }
}

export function useWishlist() {
  const { isSignedIn } = useAuth();
  const {
    setWishlistCount,
    setCartCount,
    cartCount,
    addToast,
    setSignInModalOpen,
    setSignInRedirectUrl,
  } = useUIStore();
  const [wishlistIds, setWishlistIds] = useState<Set<number>>(new Set());
  const [optimisticWishlistIds, updateOptimisticWishlist] = useOptimistic(
    wishlistIds,
    (state: Set<number>, action: WishlistOptimisticAction) =>
      applyWishlistAction(state, action),
  );
  const { isLoading, isAnyLoading, runWithLoading } =
    useLoadingTransition<number>();

  const [, startTransition] = useTransition();

  // Use mutation hooks
  const { mutate: addToWishlistMutate } = useAddToWishlist();
  const { mutate: removeFromWishlistMutate } = useRemoveFromWishlist();
  const { mutate: toggleWishlistMutate } = useToggleWishlist();

  const isInWishlist = useCallback(
    (productId: number) => optimisticWishlistIds.has(productId),
    [optimisticWishlistIds],
  );

  const toggleWishlist = useCallback(
    (productId: number) => {
      if (!isSignedIn) {
        setSignInRedirectUrl(window.location.pathname);
        setSignInModalOpen(true);
        return false;
      }

      const optimisticAction: WishlistOptimisticAction = {
        type: "toggle",
        productId,
      };

      startTransition(async () => {
        // Update wishlist count optimistically
        const nextIds = applyWishlistAction(wishlistIds, optimisticAction);
        setWishlistCount(nextIds.size);
        updateOptimisticWishlist(optimisticAction);
        const actionResult = await runWithLoading(productId, () =>
          toggleWishlistMutate(productId),
        );

        if (!actionResult.success) {
          addToast({
            type: "error",
            message: actionResult.error || "Failed to update wishlist",
          });
          // Revert wishlist count
          setWishlistCount(wishlistIds.size);
        }

        // Update base state
        setWishlistIds(nextIds);
      });
    },
    [
      isSignedIn,
      wishlistIds,
      addToast,
      setSignInModalOpen,
      setSignInRedirectUrl,
      toggleWishlistMutate,
      runWithLoading,
      setWishlistCount,
      updateOptimisticWishlist,
      startTransition,
    ],
  );

  const addToWishlist = useCallback(
    (productId: number) => {
      if (wishlistIds.has(productId)) {
        return Promise.resolve(true);
      }

      if (!isSignedIn) {
        setSignInRedirectUrl(window.location.pathname);
        setSignInModalOpen(true);
        return Promise.resolve(false);
      }

      const optimisticAction: WishlistOptimisticAction = {
        type: "add",
        productId,
      };

      // Update wishlist count optimistically
      const nextIds = applyWishlistAction(wishlistIds, optimisticAction);
      setWishlistCount(nextIds.size);

      return new Promise<boolean>((resolve) => {
        startTransition(async () => {
          updateOptimisticWishlist(optimisticAction);

          const actionResult = await runWithLoading(productId, () =>
            addToWishlistMutate(productId),
          );

          if (!actionResult.success) {
            addToast({
              type: "error",
              message: actionResult.error || "Failed to add to wishlist",
            });
            // Revert wishlist count
            setWishlistCount(wishlistIds.size);
            resolve(false);
            return;
          }

          // Update base state
          setWishlistIds(nextIds);
          resolve(true);
        });
      });
    },
    [
      isSignedIn,
      wishlistIds,
      addToast,
      setSignInModalOpen,
      setSignInRedirectUrl,
      addToWishlistMutate,
      runWithLoading,
      setWishlistCount,
      updateOptimisticWishlist,
      startTransition,
    ],
  );

  const removeFromWishlist = useCallback(
    (productId: number) => {
      if (!isSignedIn) return Promise.resolve(false);

      const optimisticAction: WishlistOptimisticAction = {
        type: "remove",
        productId,
      };

      // Update wishlist count optimistically
      const nextIds = applyWishlistAction(wishlistIds, optimisticAction);
      setWishlistCount(nextIds.size);

      return new Promise<boolean>((resolve) => {
        startTransition(async () => {
          updateOptimisticWishlist(optimisticAction);

          const actionResult = await runWithLoading(productId, () =>
            removeFromWishlistMutate(productId),
          );

          if (!actionResult.success) {
            addToast({
              type: "error",
              message: actionResult.error || "Failed to remove from wishlist",
            });
            // Revert wishlist count
            setWishlistCount(wishlistIds.size);
            resolve(false);
            return;
          }

          // Update base state
          setWishlistIds(nextIds);
          resolve(true);
        });
      });
    },
    [
      isSignedIn,
      wishlistIds,
      addToast,
      removeFromWishlistMutate,
      runWithLoading,
      setWishlistCount,
      updateOptimisticWishlist,
      startTransition,
    ],
  );

  const moveToCart = useCallback(
    (productId: number) => {
      if (!isSignedIn) return Promise.resolve(false);

      const optimisticAction: WishlistOptimisticAction = {
        type: "remove",
        productId,
      };

      // Apply optimistic update
      const nextIds = applyWishlistAction(wishlistIds, optimisticAction);
      setWishlistIds(nextIds);
      setWishlistCount(nextIds.size);
      setCartCount(cartCount + 1);

      return Promise.resolve(true);
    },
    [isSignedIn, cartCount, setWishlistCount, setCartCount, wishlistIds],
  );

  // Hydrate wishlist IDs (called on mount with initial data)
  const hydrateIds = useCallback(
    (ids: number[]) => {
      const next = new Set(ids);
      setWishlistIds(next);
      setWishlistCount(next.size);
    },
    [setWishlistCount],
  );

  return {
    productIds: Array.from(optimisticWishlistIds),
    count: optimisticWishlistIds.size,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    moveToCart,
    isInWishlist,
    isLoading,
    isAnyLoading,
    hydrateIds,
  };
}
