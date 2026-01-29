"use client";

import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useToggleWishlist,
} from "@/data/wishlist/gateway/client";
import { useLoadingTransition } from "@/hooks/use-loading-transition";
import { useUIStore } from "@/store";
import { useAuth } from "@clerk/nextjs";
import { useCallback } from "react";

export function useWishlist() {
  const { isSignedIn } = useAuth();
  const {
    wishlistIds,
    isWishlistHydrated,
    addWishlistId,
    removeWishlistId,
    toggleWishlistId,
    isInWishlist: storeIsInWishlist,
    setCartCount,
    cartCount,
    addToast,
    setSignInModalOpen,
    setSignInRedirectUrl,
  } = useUIStore();

  const { isLoading, isAnyLoading, runWithLoading } =
    useLoadingTransition<number>();

  // Use mutation hooks
  const { mutate: addToWishlistMutate } = useAddToWishlist();
  const { mutate: removeFromWishlistMutate } = useRemoveFromWishlist();
  const { mutate: toggleWishlistMutate } = useToggleWishlist();

  const isInWishlist = useCallback(
    (productId: number) => storeIsInWishlist(productId),
    [storeIsInWishlist],
  );

  const toggleWishlist = useCallback(
    async (productId: number) => {
      if (!isSignedIn) {
        setSignInRedirectUrl(window.location.pathname);
        setSignInModalOpen(true);
        return false;
      }

      // Store previous state for rollback
      const wasInWishlist = storeIsInWishlist(productId);

      // Optimistically update
      toggleWishlistId(productId);

      const actionResult = await runWithLoading(productId, () =>
        toggleWishlistMutate(productId),
      );

      if (!actionResult.success) {
        addToast({
          type: "error",
          message: actionResult.error || "Failed to update wishlist",
        });
        // Revert: toggle back to previous state
        toggleWishlistId(productId);
        return false;
      }

      return true;
    },
    [
      isSignedIn,
      storeIsInWishlist,
      addToast,
      setSignInModalOpen,
      setSignInRedirectUrl,
      toggleWishlistMutate,
      toggleWishlistId,
      runWithLoading,
    ],
  );

  const addToWishlist = useCallback(
    async (productId: number) => {
      if (storeIsInWishlist(productId)) {
        return true;
      }

      if (!isSignedIn) {
        setSignInRedirectUrl(window.location.pathname);
        setSignInModalOpen(true);
        return false;
      }

      // Optimistically update
      addWishlistId(productId);

      const actionResult = await runWithLoading(productId, () =>
        addToWishlistMutate(productId),
      );

      if (!actionResult.success) {
        addToast({
          type: "error",
          message: actionResult.error || "Failed to add to wishlist",
        });
        // Revert
        removeWishlistId(productId);
        return false;
      }

      return true;
    },
    [
      isSignedIn,
      storeIsInWishlist,
      addToast,
      setSignInModalOpen,
      setSignInRedirectUrl,
      addToWishlistMutate,
      addWishlistId,
      removeWishlistId,
      runWithLoading,
    ],
  );

  const removeFromWishlist = useCallback(
    async (productId: number) => {
      if (!isSignedIn) return false;

      // Optimistically update
      removeWishlistId(productId);

      const actionResult = await runWithLoading(productId, () =>
        removeFromWishlistMutate(productId),
      );

      if (!actionResult.success) {
        addToast({
          type: "error",
          message: actionResult.error || "Failed to remove from wishlist",
        });
        // Revert
        addWishlistId(productId);
        return false;
      }

      return true;
    },
    [
      isSignedIn,
      addToast,
      removeFromWishlistMutate,
      addWishlistId,
      removeWishlistId,
      runWithLoading,
    ],
  );

  const moveToCart = useCallback(
    (productId: number) => {
      if (!isSignedIn) return Promise.resolve(false);

      // Optimistically update
      removeWishlistId(productId);
      setCartCount(cartCount + 1);

      return Promise.resolve(true);
    },
    [isSignedIn, cartCount, setCartCount, removeWishlistId],
  );

  return {
    productIds: Array.from(wishlistIds),
    count: wishlistIds.size,
    isWishlistHydrated,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    moveToCart,
    isInWishlist,
    isLoading,
    isAnyLoading,
  };
}
