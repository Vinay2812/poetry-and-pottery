"use client";

import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateCartQuantity as updateCartQuantityAction,
} from "@/actions/cart.actions";
import { useCartStore } from "@/store/cart.store";
import { useUIStore } from "@/store/ui.store";
import type { CartWithProduct, ProductWithCategories } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useState } from "react";

import { MAX_CART_QUANTITY } from "@/lib/constants";

import { useThrottle } from "./use-throttle";

export function useCart() {
  const { isSignedIn } = useAuth();
  const cartStore = useCartStore();
  const { addToast, setSignInModalOpen, setSignInRedirectUrl } = useUIStore();
  const [loadingProducts, setLoadingProducts] = useState<Set<number>>(
    new Set(),
  );
  const { throttle, isThrottled } = useThrottle();

  const isThrottling = useCallback(
    (productId: number) => isThrottled(`add-${productId}`),
    [isThrottled],
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
    async (
      productId: number,
      quantity: number = 1,
      product?: ProductWithCategories,
    ) => {
      if (!isSignedIn) {
        setSignInRedirectUrl(window.location.pathname);
        setSignInModalOpen(true);
        return false;
      }

      const existingItem = cartStore.items.find(
        (i) => i.product_id === productId,
      );
      const currentQuantity = existingItem?.quantity ?? 0;

      if (currentQuantity >= MAX_CART_QUANTITY) {
        addToast({
          type: "error",
          message: `Maximum ${MAX_CART_QUANTITY} items per product allowed`,
        });
        return false;
      }

      const newQuantity = Math.min(
        currentQuantity + quantity,
        MAX_CART_QUANTITY,
      );
      const quantityToAdd = newQuantity - currentQuantity;

      if (quantityToAdd <= 0) {
        return false;
      }

      // Optimistic update immediately
      const previousItems = [...cartStore.items];

      if (existingItem) {
        cartStore.updateQuantity(productId, newQuantity);
      } else if (product) {
        const optimisticItem: CartWithProduct = {
          id: -productId,
          user_id: 0,
          product_id: productId,
          quantity: quantityToAdd,
          created_at: new Date(),
          updated_at: new Date(),
          product: product,
        };
        cartStore.addItem(optimisticItem);
      }

      // Throttle API call
      const result = throttle(`add-${productId}`, async () => {
        setLoading(productId, true);

        const actionResult = await addToCartAction(productId, quantityToAdd);
        if (!actionResult.success) {
          cartStore.hydrate(previousItems);
          addToast({
            type: "error",
            message: actionResult.error || "Failed to add to cart",
          });
          setLoading(productId, false);
          return false;
        }

        cartStore.addItem(actionResult.data);
        setLoading(productId, false);
        return true;
      });

      return (await result) ?? true; // Return true for throttled calls since UI already updated
    },
    [
      isSignedIn,
      throttle,
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

      // Optimistic update immediately
      const currentItem = cartStore.items.find(
        (i) => i.product_id === productId,
      );
      cartStore.removeItem(productId);

      // Throttle API call
      const result = throttle(`remove-${productId}`, async () => {
        setLoading(productId, true);

        const actionResult = await removeFromCartAction(productId);
        if (!actionResult.success) {
          if (currentItem) {
            cartStore.addItem(currentItem);
          }
          addToast({
            type: "error",
            message: actionResult.error || "Failed to remove from cart",
          });
          setLoading(productId, false);
          return false;
        }

        setLoading(productId, false);
        return true;
      });

      return (await result) ?? true;
    },
    [isSignedIn, throttle, cartStore, addToast, setLoading],
  );

  const updateQuantity = useCallback(
    async (productId: number, quantity: number) => {
      if (!isSignedIn) return false;

      const clampedQuantity = Math.min(
        Math.max(quantity, 0),
        MAX_CART_QUANTITY,
      );
      const currentQuantity = cartStore.getQuantity(productId);

      // Optimistic update immediately
      cartStore.updateQuantity(productId, clampedQuantity);

      // Throttle API call
      const result = throttle(`update-${productId}`, async () => {
        setLoading(productId, true);

        const actionResult = await updateCartQuantityAction(
          productId,
          clampedQuantity,
        );
        if (!actionResult.success) {
          cartStore.updateQuantity(productId, currentQuantity);
          addToast({
            type: "error",
            message: actionResult.error || "Failed to update cart",
          });
          setLoading(productId, false);
          return false;
        }

        setLoading(productId, false);
        return true;
      });

      return (await result) ?? true;
    },
    [isSignedIn, throttle, cartStore, addToast, setLoading],
  );

  const isAtMaxQuantity = useCallback(
    (productId: number) => {
      return cartStore.getQuantity(productId) >= MAX_CART_QUANTITY;
    },
    [cartStore],
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
    isAtMaxQuantity,
    isThrottling,
  };
}
