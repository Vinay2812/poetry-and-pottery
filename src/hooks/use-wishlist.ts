"use client";

import {
  addToWishlist as addToWishlistAction,
  removeFromWishlist as removeFromWishlistAction,
  toggleWishlist as toggleWishlistAction,
} from "@/data/wishlist/gateway/server";
import { useUIStore } from "@/store";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useState } from "react";

export function useWishlist() {
  const { isSignedIn } = useAuth();
  const {
    wishlistCount,
    setWishlistCount,
    setCartCount,
    cartCount,
    addToast,
    setSignInModalOpen,
    setSignInRedirectUrl,
  } = useUIStore();
  const [wishlistIds, setWishlistIds] = useState<Set<number>>(new Set());
  const [loadingProducts, setLoadingProducts] = useState<Set<number>>(
    new Set(),
  );

  const setLoading = useCallback((productId: number, loading: boolean) => {
    setLoadingProducts((prev) => {
      const next = new Set(prev);
      if (loading) {
        next.add(productId);
      } else {
        next.delete(productId);
      }
      return next;
    });
  }, []);

  const isLoading = useCallback(
    (productId: number) => loadingProducts.has(productId),
    [loadingProducts],
  );

  const isInWishlist = useCallback(
    (productId: number) => wishlistIds.has(productId),
    [wishlistIds],
  );

  const toggleWishlist = useCallback(
    async (productId: number) => {
      if (!isSignedIn) {
        setSignInRedirectUrl(window.location.pathname);
        setSignInModalOpen(true);
        return false;
      }

      // Optimistic update immediately
      const wasInWishlist = wishlistIds.has(productId);
      const previousIds = new Set(wishlistIds);

      if (wasInWishlist) {
        setWishlistIds((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
        setWishlistCount(wishlistCount - 1);
      } else {
        setWishlistIds((prev) => new Set(prev).add(productId));
        setWishlistCount(wishlistCount + 1);
      }

      setLoading(productId, true);

      const actionResult = await toggleWishlistAction(productId);
      if (!actionResult.success) {
        // Rollback on error
        setWishlistIds(previousIds);
        setWishlistCount(previousIds.size);
        addToast({
          type: "error",
          message: actionResult.error || "Failed to update wishlist",
        });
      }

      setLoading(productId, false);

      return true;
    },
    [
      isSignedIn,
      wishlistIds,
      wishlistCount,
      setWishlistCount,
      addToast,
      setLoading,
      setSignInModalOpen,
      setSignInRedirectUrl,
    ],
  );

  const addToWishlist = useCallback(
    async (productId: number) => {
      if (wishlistIds.has(productId)) {
        return true;
      }

      if (!isSignedIn) {
        setSignInRedirectUrl(window.location.pathname);
        setSignInModalOpen(true);
        return false;
      }

      // Optimistic update immediately
      const previousIds = new Set(wishlistIds);
      setWishlistIds((prev) => new Set(prev).add(productId));
      setWishlistCount(wishlistCount + 1);

      setLoading(productId, true);

      const actionResult = await addToWishlistAction(productId);
      if (!actionResult.success) {
        // Rollback on error
        setWishlistIds(previousIds);
        setWishlistCount(previousIds.size);
        addToast({
          type: "error",
          message: actionResult.error || "Failed to add to wishlist",
        });
      }

      return true;
    },
    [
      isSignedIn,
      wishlistIds,
      wishlistCount,
      setWishlistCount,
      addToast,
      setLoading,
      setSignInModalOpen,
      setSignInRedirectUrl,
    ],
  );

  const removeFromWishlist = useCallback(
    async (productId: number) => {
      if (!isSignedIn) return false;

      // Optimistic update immediately
      const previousIds = new Set(wishlistIds);
      setWishlistIds((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
      setWishlistCount(Math.max(0, wishlistCount - 1));

      setLoading(productId, true);

      const actionResult = await removeFromWishlistAction(productId);
      if (!actionResult.success) {
        // Rollback on error
        setWishlistIds(previousIds);
        setWishlistCount(previousIds.size);
        addToast({
          type: "error",
          message: actionResult.error || "Failed to remove from wishlist",
        });
      }

      return true;
    },
    [
      isSignedIn,
      wishlistIds,
      wishlistCount,
      setWishlistCount,
      addToast,
      setLoading,
    ],
  );

  const moveToCart = useCallback(
    async (productId: number) => {
      if (!isSignedIn) return false;

      // Optimistic update immediately
      setWishlistIds((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
      setWishlistCount(Math.max(0, wishlistCount - 1));
      setCartCount(cartCount + 1);

      setLoading(productId, true);

      return true;
    },
    [
      isSignedIn,
      wishlistCount,
      cartCount,
      setWishlistCount,
      setCartCount,
      setLoading,
    ],
  );

  // Hydrate wishlist IDs (called on mount with initial data)
  const hydrateIds = useCallback((ids: number[]) => {
    setWishlistIds(new Set(ids));
  }, []);

  return {
    productIds: Array.from(wishlistIds),
    count: wishlistCount,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    moveToCart,
    isInWishlist,
    isLoading,
    isAnyLoading: loadingProducts.size > 0,
    hydrateIds,
  };
}
