"use client";

import {
  addToWishlist as addToWishlistAction,
  moveToCart as moveToCartAction,
  removeFromWishlist as removeFromWishlistAction,
  toggleWishlist as toggleWishlistAction,
} from "@/data/wishlist/gateway/server";
import { useUIStore } from "@/store/ui.store";
import { useWishlistStore } from "@/store/wishlist.store";
import type { WishlistWithProduct } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useState } from "react";

import type { WishlistItem } from "@/graphql/generated/graphql";

import { useDebounce } from "./use-debounce";

// Map GraphQL WishlistItem to store-compatible WishlistWithProduct
function mapToWishlistWithProduct(item: WishlistItem): WishlistWithProduct {
  return {
    id: item.id,
    user_id: item.user_id,
    product_id: item.product_id,
    created_at: new Date(item.created_at),
    updated_at: new Date(item.updated_at),
    product: {
      ...item.product,
      description: null,
      instructions: [],
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      product_categories: [],
    },
  };
}

export function useWishlist() {
  const { isSignedIn } = useAuth();
  const wishlistStore = useWishlistStore();
  const { addToast, setSignInModalOpen, setSignInRedirectUrl } = useUIStore();
  const [loadingProducts, setLoadingProducts] = useState<Set<number>>(
    new Set(),
  );
  const { debounce, isPending } = useDebounce();

  const isDebouncing = useCallback(
    (productId: number) => isPending(`toggle-${productId}`),
    [isPending],
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

      // Optimistic update immediately
      const wasInWishlist = wishlistStore.isInWishlist(productId);
      const previousProductIds = [...wishlistStore.productIds];

      if (wasInWishlist) {
        wishlistStore.removeItem(productId);
      } else {
        wishlistStore.hydrateIds([...wishlistStore.productIds, productId]);
      }

      // Debounce API call - waits until user stops clicking
      debounce(`toggle-${productId}`, async () => {
        setLoading(productId, true);

        const actionResult = await toggleWishlistAction(productId);
        if (!actionResult.success) {
          wishlistStore.hydrateIds(previousProductIds);
          addToast({
            type: "error",
            message: actionResult.error || "Failed to update wishlist",
          });
        }

        setLoading(productId, false);
      });

      return true; // Return true since UI already updated
    },
    [
      isSignedIn,
      debounce,
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

      // Optimistic update immediately
      const previousProductIds = [...wishlistStore.productIds];
      wishlistStore.hydrateIds([...wishlistStore.productIds, productId]);

      // Debounce API call
      debounce(`add-${productId}`, async () => {
        setLoading(productId, true);

        const actionResult = await addToWishlistAction(productId);
        if (!actionResult.success) {
          wishlistStore.hydrateIds(previousProductIds);
          addToast({
            type: "error",
            message: actionResult.error || "Failed to add to wishlist",
          });
        } else {
          wishlistStore.addItem(mapToWishlistWithProduct(actionResult.data));
        }

        setLoading(productId, false);
      });

      return true;
    },
    [
      isSignedIn,
      debounce,
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

      // Optimistic update immediately
      const currentItem = wishlistStore.items.find(
        (i) => i.product_id === productId,
      );
      wishlistStore.removeItem(productId);

      // Debounce API call
      debounce(`remove-${productId}`, async () => {
        setLoading(productId, true);

        const actionResult = await removeFromWishlistAction(productId);
        if (!actionResult.success) {
          if (currentItem) {
            wishlistStore.addItem(currentItem);
          } else {
            wishlistStore.hydrateIds([...wishlistStore.productIds, productId]);
          }
          addToast({
            type: "error",
            message: actionResult.error || "Failed to remove from wishlist",
          });
        }

        setLoading(productId, false);
      });

      return true;
    },
    [isSignedIn, debounce, wishlistStore, addToast, setLoading],
  );

  const moveToCart = useCallback(
    async (productId: number) => {
      if (!isSignedIn) return false;

      // Optimistic update immediately
      wishlistStore.removeItem(productId);

      // Debounce API call
      debounce(`move-${productId}`, async () => {
        setLoading(productId, true);

        const actionResult = await moveToCartAction(productId);
        if (!actionResult.success) {
          // Rollback - add back to wishlist
          wishlistStore.hydrateIds([...wishlistStore.productIds, productId]);
          addToast({
            type: "error",
            message: actionResult.error || "Failed to move to cart",
          });
        }

        setLoading(productId, false);
      });

      return true;
    },
    [isSignedIn, debounce, wishlistStore, addToast, setLoading],
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
    isDebouncing,
  };
}
