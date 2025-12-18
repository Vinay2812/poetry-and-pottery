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

  const addToCart = useCallback(
    async (productId: number, quantity: number = 1) => {
      if (!isSignedIn) {
        setSignInRedirectUrl(window.location.pathname);
        setSignInModalOpen(true);
        return false;
      }

      setLoading(productId, true);

      const existingProduct = cartStore.items.find(
        (i) => i.product_id === productId,
      );

      if (existingProduct) {
        // Optimistically update
        cartStore.updateQuantity(
          productId,
          existingProduct.quantity + quantity,
        );
      }

      const result = await addToCartAction(productId, quantity);
      if (!result.success) {
        addToast({
          type: "error",
          message: result.error || "Failed to add to cart",
        });
        setLoading(productId, false);
        return false;
      }

      // Update store with server response
      cartStore.addItem(result.data);

      addToast({
        type: "success",
        message: "Added to cart",
      });
      setLoading(productId, false);
      return true;
    },
    [
      isSignedIn,
      cartStore,
      addToast,
      setLoading,
      setSignInModalOpen,
      setSignInRedirectUrl,
    ],
  );

  const removeFromCart = useCallback(
    async (productId: number) => {
      if (!isSignedIn) return false;

      setLoading(productId, true);

      // Store current item for rollback
      const currentItem = cartStore.items.find(
        (i) => i.product_id === productId,
      );

      // Optimistically update
      cartStore.removeItem(productId);

      const result = await removeFromCartAction(productId);
      if (!result.success) {
        // Rollback on failure
        if (currentItem) {
          cartStore.addItem(currentItem);
        }
        addToast({
          type: "error",
          message: result.error || "Failed to remove from cart",
        });
        setLoading(productId, false);
        return false;
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
      if (!isSignedIn) return false;

      setLoading(productId, true);

      // Store current quantity for rollback
      const currentQuantity = cartStore.getQuantity(productId);

      // Optimistically update
      cartStore.updateQuantity(productId, quantity);

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

      setLoading(productId, false);
      return true;
    },
    [isSignedIn, cartStore, addToast, setLoading],
  );

  return {
    items: cartStore.items,
    totalItems: cartStore.getTotalItems(),
    totalPrice: cartStore.getTotalPrice(),
    isHydrated: cartStore.isHydrated,
    addToCart,
    removeFromCart,
    updateQuantity,
    getQuantity: cartStore.getQuantity,
    isLoading,
    isAnyLoading: loadingProducts.size > 0,
  };
}
