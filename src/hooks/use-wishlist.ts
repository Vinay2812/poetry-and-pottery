"use client";

import {
  addToWishlist as addToWishlistAction,
  moveToCart as moveToCartAction,
  removeFromWishlist as removeFromWishlistAction,
  toggleWishlist as toggleWishlistAction,
} from "@/actions/wishlist.actions";
import { useCartStore } from "@/store/cart.store";
import { useUIStore } from "@/store/ui.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useState } from "react";

export function useWishlist() {
  const { isSignedIn } = useAuth();
  const wishlistStore = useWishlistStore();
  const cartStore = useCartStore();
  const { addToast } = useUIStore();
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

  const toggleWishlist = useCallback(
    async (productId: number) => {
      setLoading(productId, true);

      const wasInWishlist = wishlistStore.isInWishlist(productId);

      // Optimistically update local store
      wishlistStore.toggleItem(productId);

      if (isSignedIn) {
        const result = await toggleWishlistAction(productId);
        if (!result.success) {
          // Rollback on failure
          wishlistStore.toggleItem(productId);
          addToast({
            type: "error",
            message: result.error || "Failed to update wishlist",
          });
          setLoading(productId, false);
          return false;
        }
      }

      addToast({
        type: "success",
        message: wasInWishlist ? "Removed from wishlist" : "Added to wishlist",
      });
      setLoading(productId, false);
      return true;
    },
    [isSignedIn, wishlistStore, addToast, setLoading],
  );

  const addToWishlist = useCallback(
    async (productId: number) => {
      if (wishlistStore.isInWishlist(productId)) {
        return true;
      }

      setLoading(productId, true);

      // Optimistically update local store
      wishlistStore.addItem(productId);

      if (isSignedIn) {
        const result = await addToWishlistAction(productId);
        if (!result.success) {
          // Rollback on failure
          wishlistStore.removeItem(productId);
          addToast({
            type: "error",
            message: result.error || "Failed to add to wishlist",
          });
          setLoading(productId, false);
          return false;
        }
      }

      addToast({
        type: "success",
        message: "Added to wishlist",
      });
      setLoading(productId, false);
      return true;
    },
    [isSignedIn, wishlistStore, addToast, setLoading],
  );

  const removeFromWishlist = useCallback(
    async (productId: number) => {
      setLoading(productId, true);

      // Optimistically update local store
      wishlistStore.removeItem(productId);

      if (isSignedIn) {
        const result = await removeFromWishlistAction(productId);
        if (!result.success) {
          // Rollback on failure
          wishlistStore.addItem(productId);
          addToast({
            type: "error",
            message: result.error || "Failed to remove from wishlist",
          });
          setLoading(productId, false);
          return false;
        }
      }

      addToast({
        type: "success",
        message: "Removed from wishlist",
      });
      setLoading(productId, false);
      return true;
    },
    [isSignedIn, wishlistStore, addToast, setLoading],
  );

  const moveToCart = useCallback(
    async (productId: number) => {
      setLoading(productId, true);

      // Optimistically update local stores
      wishlistStore.removeItem(productId);
      cartStore.addItem(productId, 1);

      if (isSignedIn) {
        const result = await moveToCartAction(productId);
        if (!result.success) {
          // Rollback on failure
          wishlistStore.addItem(productId);
          cartStore.removeItem(productId);
          addToast({
            type: "error",
            message: result.error || "Failed to move to cart",
          });
          setLoading(productId, false);
          return false;
        }
      }

      addToast({
        type: "success",
        message: "Moved to cart",
      });
      setLoading(productId, false);
      return true;
    },
    [isSignedIn, wishlistStore, cartStore, addToast, setLoading],
  );

  return {
    productIds: wishlistStore.productIds,
    count: wishlistStore.getCount(),
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    moveToCart,
    isInWishlist: wishlistStore.isInWishlist,
    isLoading,
    isAnyLoading: loadingProducts.size > 0,
  };
}
