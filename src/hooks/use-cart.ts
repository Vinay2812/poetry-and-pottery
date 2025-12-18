"use client";

import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateCartQuantity as updateCartQuantityAction,
} from "@/actions/cart.actions";
import { useCartStore } from "@/store/cart.store";
import { useUIStore } from "@/store/ui.store";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useState } from "react";

export function useCart() {
  const { isSignedIn } = useAuth();
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

  const addToCart = useCallback(
    async (productId: number, quantity: number = 1) => {
      setLoading(productId, true);

      // Optimistically update local store
      cartStore.addItem(productId, quantity);

      if (isSignedIn) {
        const result = await addToCartAction(productId, quantity);
        if (!result.success) {
          // Rollback on failure
          cartStore.removeItem(productId);
          addToast({
            type: "error",
            message: result.error || "Failed to add to cart",
          });
          setLoading(productId, false);
          return false;
        }
      }

      addToast({
        type: "success",
        message: "Added to cart",
      });
      setLoading(productId, false);
      return true;
    },
    [isSignedIn, cartStore, addToast, setLoading],
  );

  const removeFromCart = useCallback(
    async (productId: number) => {
      setLoading(productId, true);

      // Store current quantity for rollback
      const currentQuantity = cartStore.getQuantity(productId);

      // Optimistically update local store
      cartStore.removeItem(productId);

      if (isSignedIn) {
        const result = await removeFromCartAction(productId);
        if (!result.success) {
          // Rollback on failure
          if (currentQuantity > 0) {
            cartStore.addItem(productId, currentQuantity);
          }
          addToast({
            type: "error",
            message: result.error || "Failed to remove from cart",
          });
          setLoading(productId, false);
          return false;
        }
      }

      addToast({
        type: "success",
        message: "Removed from cart",
      });
      setLoading(productId, false);
      return true;
    },
    [isSignedIn, cartStore, addToast, setLoading],
  );

  const updateQuantity = useCallback(
    async (productId: number, quantity: number) => {
      setLoading(productId, true);

      // Store current quantity for rollback
      const currentQuantity = cartStore.getQuantity(productId);

      // Optimistically update local store
      cartStore.updateQuantity(productId, quantity);

      if (isSignedIn) {
        const result = await updateCartQuantityAction(productId, quantity);
        if (!result.success) {
          // Rollback on failure
          cartStore.updateQuantity(productId, currentQuantity);
          addToast({
            type: "error",
            message: result.error || "Failed to update cart",
          });
          setLoading(productId, false);
          return false;
        }
      }

      setLoading(productId, false);
      return true;
    },
    [isSignedIn, cartStore, addToast, setLoading],
  );

  return {
    items: cartStore.items,
    totalItems: cartStore.getTotalItems(),
    addToCart,
    removeFromCart,
    updateQuantity,
    getQuantity: cartStore.getQuantity,
    isLoading,
    isAnyLoading: loadingProducts.size > 0,
  };
}
