"use client";

import { MAX_CART_QUANTITY } from "@/consts/performance";
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateCartQuantity as updateCartQuantityAction,
} from "@/data/cart/gateway/server";
import { useUIStore } from "@/store";
import type { CartWithProduct, ProductWithCategories } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useState } from "react";

import type { CartItem } from "@/graphql/generated/graphql";

// Map GraphQL CartItem to store-compatible CartWithProduct
function mapToCartWithProduct(item: CartItem): CartWithProduct {
  return {
    id: item.id,
    user_id: item.user_id,
    product_id: item.product_id,
    quantity: item.quantity,
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

export function useCart() {
  const { isSignedIn } = useAuth();
  const {
    cartCount,
    setCartCount,
    addToast,
    setSignInModalOpen,
    setSignInRedirectUrl,
  } = useUIStore();
  const [items, setItems] = useState<CartWithProduct[]>([]);
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

  const getQuantity = useCallback(
    (productId: number) => {
      return items.find((i) => i.product_id === productId)?.quantity ?? 0;
    },
    [items],
  );

  const getTotalItems = useCallback(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const getTotalPrice = useCallback(() => {
    return items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }, [items]);

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

      const existingItem = items.find((i) => i.product_id === productId);
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
      const previousItems = [...items];
      const previousCount = cartCount;

      if (existingItem) {
        setItems((prev) =>
          prev.map((item) =>
            item.product_id === productId
              ? { ...item, quantity: newQuantity }
              : item,
          ),
        );
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
        setItems((prev) => [...prev, optimisticItem]);
      }
      setCartCount(cartCount + quantityToAdd);

      setLoading(productId, true);

      const actionResult = await addToCartAction(productId, quantityToAdd);
      if (!actionResult.success) {
        setItems(previousItems);
        setCartCount(previousCount);
        addToast({
          type: "error",
          message: actionResult.error || "Failed to add to cart",
        });
        setLoading(productId, false);
        return false;
      }

      // Update with actual server data
      const newItem = mapToCartWithProduct(actionResult.data);
      setItems((prev) => {
        const filtered = prev.filter((i) => i.product_id !== productId);
        return [...filtered, newItem];
      });
      setLoading(productId, false);
      return true;
    },
    [
      isSignedIn,
      items,
      cartCount,
      setCartCount,
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
      const currentItem = items.find((i) => i.product_id === productId);
      const previousItems = [...items];
      const previousCount = cartCount;

      setItems((prev) => prev.filter((i) => i.product_id !== productId));
      setCartCount(Math.max(0, cartCount - (currentItem?.quantity ?? 0)));

      setLoading(productId, true);

      const actionResult = await removeFromCartAction(productId);
      if (!actionResult.success) {
        setItems(previousItems);
        setCartCount(previousCount);
        addToast({
          type: "error",
          message: actionResult.error || "Failed to remove from cart",
        });
        setLoading(productId, false);
        return false;
      }

      setLoading(productId, false);
      return true;
    },
    [isSignedIn, items, cartCount, setCartCount, addToast, setLoading],
  );

  const updateQuantity = useCallback(
    async (productId: number, quantity: number) => {
      if (!isSignedIn) return false;

      const clampedQuantity = Math.min(
        Math.max(quantity, 0),
        MAX_CART_QUANTITY,
      );
      const currentItem = items.find((i) => i.product_id === productId);
      const currentQuantity = currentItem?.quantity ?? 0;
      const previousItems = [...items];
      const previousCount = cartCount;

      // Optimistic update immediately
      if (clampedQuantity === 0) {
        setItems((prev) => prev.filter((i) => i.product_id !== productId));
      } else {
        setItems((prev) =>
          prev.map((item) =>
            item.product_id === productId
              ? { ...item, quantity: clampedQuantity }
              : item,
          ),
        );
      }
      setCartCount(cartCount - currentQuantity + clampedQuantity);

      setLoading(productId, true);

      const actionResult = await updateCartQuantityAction(
        productId,
        clampedQuantity,
      );
      if (!actionResult.success) {
        setItems(previousItems);
        setCartCount(previousCount);
        addToast({
          type: "error",
          message: actionResult.error || "Failed to update cart",
        });
        setLoading(productId, false);
        return false;
      }

      setLoading(productId, false);
      return true;
    },
    [isSignedIn, items, cartCount, setCartCount, addToast, setLoading],
  );

  const isAtMaxQuantity = useCallback(
    (productId: number) => {
      return getQuantity(productId) >= MAX_CART_QUANTITY;
    },
    [getQuantity],
  );

  // Hydrate cart items (called on mount with initial data)
  const hydrate = useCallback((cartItems: CartWithProduct[]) => {
    setItems(cartItems);
  }, []);

  // Clear cart
  const clear = useCallback(() => {
    setItems([]);
    setCartCount(0);
  }, [setCartCount]);

  return {
    items,
    totalItems: getTotalItems(),
    totalPrice: getTotalPrice(),
    addToCart,
    removeFromCart,
    updateQuantity,
    getQuantity,
    isLoading,
    isAnyLoading: loadingProducts.size > 0,
    isAtMaxQuantity,
    hydrate,
    clear,
  };
}
