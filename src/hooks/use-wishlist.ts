"use client";

import {
  addToWishlist as addToWishlistAction,
  moveToCart as moveToCartAction,
  removeFromWishlist as removeFromWishlistAction,
  toggleWishlist as toggleWishlistAction,
} from "@/actions/wishlist.actions";
import { useUIStore } from "@/store/ui.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useState } from "react";

export function useWishlist() {
  const { isSignedIn } = useAuth();
  const wishlistStore = useWishlistStore();
  const { addToast, setSignInModalOpen, setSignInRedirectUrl } = useUIStore();
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
      if (!isSignedIn) {
        setSignInRedirectUrl(window.location.pathname);
        setSignInModalOpen(true);
        return false;
      }

      setLoading(productId, true);

      const result = await toggleWishlistAction(productId);
      if (!result.success) {
        addToast({
          type: "error",
          message: result.error || "Failed to update wishlist",
        });
        setLoading(productId, false);
        return false;
      }

      // Update local store based on result
      if (result.action === "added") {
        // We only have productId, so we just update the productIds array
        wishlistStore.hydrateIds([...wishlistStore.productIds, productId]);
      } else {
        wishlistStore.removeItem(productId);
      }

      setLoading(productId, false);
      return true;
    },
    [
      isSignedIn,
      wishlistStore,
      addToast,
      setLoading,
      setSignInModalOpen,
      setSignInRedirectUrl,
    ],
  );

  const addToWishlist = useCallback(
    async (productId: number) => {
      if (wishlistStore.isInWishlist(productId)) {
        return true;
      }

      if (!isSignedIn) {
        setSignInRedirectUrl(window.location.pathname);
        setSignInModalOpen(true);
        return false;
      }

      setLoading(productId, true);

      const result = await addToWishlistAction(productId);
      if (!result.success) {
        addToast({
          type: "error",
          message: result.error || "Failed to add to wishlist",
        });
        setLoading(productId, false);
        return false;
      }

      // Update store with server response
      wishlistStore.addItem(result.data);

      setLoading(productId, false);
      return true;
    },
    [
      isSignedIn,
      wishlistStore,
      addToast,
      setLoading,
      setSignInModalOpen,
      setSignInRedirectUrl,
    ],
  );

  const removeFromWishlist = useCallback(
    async (productId: number) => {
      if (!isSignedIn) return false;

      setLoading(productId, true);

      // Store current item for rollback
      const currentItem = wishlistStore.items.find(
        (i) => i.product_id === productId,
      );

      // Optimistically update
      wishlistStore.removeItem(productId);

      const result = await removeFromWishlistAction(productId);
      if (!result.success) {
        // Rollback on failure
        if (currentItem) {
          wishlistStore.addItem(currentItem);
        } else {
          // If we don't have the full item, just add the productId back
          wishlistStore.hydrateIds([...wishlistStore.productIds, productId]);
        }
        addToast({
          type: "error",
          message: result.error || "Failed to remove from wishlist",
        });
        setLoading(productId, false);
        return false;
      }

      setLoading(productId, false);
      return true;
    },
    [isSignedIn, wishlistStore, addToast, setLoading],
  );

  const moveToCart = useCallback(
    async (productId: number) => {
      if (!isSignedIn) return false;

      setLoading(productId, true);

      const result = await moveToCartAction(productId);
      if (!result.success) {
        addToast({
          type: "error",
          message: result.error || "Failed to move to cart",
        });
        setLoading(productId, false);
        return false;
      }

      // Update stores
      wishlistStore.removeItem(productId);
      // Cart will be updated on next fetch, or we can refetch

      setLoading(productId, false);
      return true;
    },
    [isSignedIn, wishlistStore, addToast, setLoading],
  );

  return {
    items: wishlistStore.items,
    productIds: wishlistStore.productIds,
    count: wishlistStore.getCount(),
    isHydrated: wishlistStore.isHydrated,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    moveToCart,
    isInWishlist: wishlistStore.isInWishlist,
    isLoading,
    isAnyLoading: loadingProducts.size > 0,
  };
}
