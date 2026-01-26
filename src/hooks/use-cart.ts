"use client";

import { MAX_CART_QUANTITY } from "@/consts/performance";
import {
  useAddToCart,
  useRemoveFromCart,
  useUpdateCartQuantity,
} from "@/data/cart/gateway/client";
import { useLoadingTransition } from "@/hooks/use-loading-transition";
import { useUIStore } from "@/store";
import type { CartWithProduct, ProductWithCategories } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useOptimistic, useState, useTransition } from "react";

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

type CartOptimisticAction =
  | {
      type: "add";
      productId: number;
      quantity: number;
      product?: ProductWithCategories;
    }
  | { type: "remove"; productId: number }
  | { type: "update"; productId: number; quantity: number }
  | { type: "replace"; item: CartWithProduct };

function applyCartOptimisticAction(
  state: CartWithProduct[],
  action: CartOptimisticAction,
): CartWithProduct[] {
  switch (action.type) {
    case "add": {
      const existingItem = state.find(
        (item) => item.product_id === action.productId,
      );
      if (existingItem) {
        return state.map((item) =>
          item.product_id === action.productId
            ? {
                ...item,
                quantity: item.quantity + action.quantity,
              }
            : item,
        );
      }
      if (!action.product) {
        return state;
      }
      const optimisticItem: CartWithProduct = {
        id: -action.productId,
        user_id: 0,
        product_id: action.productId,
        quantity: action.quantity,
        created_at: new Date(),
        updated_at: new Date(),
        product: action.product,
      };
      return [...state, optimisticItem];
    }
    case "remove": {
      return state.filter((item) => item.product_id !== action.productId);
    }
    case "update": {
      if (action.quantity <= 0) {
        return state.filter((item) => item.product_id !== action.productId);
      }
      return state.map((item) =>
        item.product_id === action.productId
          ? { ...item, quantity: action.quantity }
          : item,
      );
    }
    case "replace": {
      const filtered = state.filter(
        (item) => item.product_id !== action.item.product_id,
      );
      return [...filtered, action.item];
    }
    default:
      return state;
  }
}

function getTotalItemsFrom(items: CartWithProduct[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function useCart() {
  const { isSignedIn } = useAuth();
  const { setCartCount, addToast, setSignInModalOpen, setSignInRedirectUrl } =
    useUIStore();
  const [items, setItems] = useState<CartWithProduct[]>([]);
  const [optimisticItems, updateOptimisticItems] = useOptimistic(
    items,
    (state: CartWithProduct[], action: CartOptimisticAction) =>
      applyCartOptimisticAction(state, action),
  );
  const { isLoading, isAnyLoading, runWithLoading } =
    useLoadingTransition<number>();

  const [, startTransition] = useTransition();

  // Use mutation hooks
  const { mutate: addToCartMutate } = useAddToCart();
  const { mutate: removeFromCartMutate } = useRemoveFromCart();
  const { mutate: updateCartQuantityMutate } = useUpdateCartQuantity();

  const getQuantity = useCallback(
    (productId: number) => {
      return (
        optimisticItems.find((i) => i.product_id === productId)?.quantity ?? 0
      );
    },
    [optimisticItems],
  );

  const getTotalItems = useCallback(() => {
    return optimisticItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [optimisticItems]);

  const getTotalPrice = useCallback(() => {
    return optimisticItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }, [optimisticItems]);

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

      const existingItem = optimisticItems.find(
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

      const optimisticAction: CartOptimisticAction = {
        type: "add",
        productId,
        quantity: quantityToAdd,
        product,
      };
      startTransition(() => {
        updateOptimisticItems(optimisticAction);
      });
      const nextItems = applyCartOptimisticAction(
        optimisticItems,
        optimisticAction,
      );
      setCartCount(getTotalItemsFrom(nextItems));

      const actionResult = await runWithLoading(productId, () =>
        addToCartMutate(productId, quantityToAdd),
      );
      if (!actionResult.success) {
        addToast({
          type: "error",
          message: actionResult.error || "Failed to add to cart",
        });
        setItems((prev) => [...prev]);
        setCartCount(getTotalItemsFrom(items));
        return false;
      }

      // Update with actual server data
      const newItem = mapToCartWithProduct(actionResult.data);
      setItems((prev) =>
        applyCartOptimisticAction(prev, { type: "replace", item: newItem }),
      );
      return true;
    },
    [
      isSignedIn,
      optimisticItems,
      items,
      addToast,
      setSignInModalOpen,
      setSignInRedirectUrl,
      addToCartMutate,
      runWithLoading,
      setCartCount,
      updateOptimisticItems,
    ],
  );

  const removeFromCart = useCallback(
    async (productId: number) => {
      if (!isSignedIn) return false;

      const optimisticAction: CartOptimisticAction = {
        type: "remove",
        productId,
      };
      startTransition(() => {
        updateOptimisticItems(optimisticAction);
      });
      const nextItems = applyCartOptimisticAction(
        optimisticItems,
        optimisticAction,
      );
      setCartCount(getTotalItemsFrom(nextItems));

      const actionResult = await runWithLoading(productId, () =>
        removeFromCartMutate(productId),
      );
      if (!actionResult.success) {
        addToast({
          type: "error",
          message: actionResult.error || "Failed to remove from cart",
        });
        setItems((prev) => [...prev]);
        setCartCount(getTotalItemsFrom(items));
        return false;
      }

      setItems((prev) => applyCartOptimisticAction(prev, optimisticAction));
      return true;
    },
    [
      isSignedIn,
      optimisticItems,
      items,
      addToast,
      removeFromCartMutate,
      runWithLoading,
      setCartCount,
      updateOptimisticItems,
    ],
  );

  const updateQuantity = useCallback(
    async (productId: number, quantity: number) => {
      if (!isSignedIn) return false;

      const clampedQuantity = Math.min(
        Math.max(quantity, 0),
        MAX_CART_QUANTITY,
      );
      const optimisticAction: CartOptimisticAction = {
        type: "update",
        productId,
        quantity: clampedQuantity,
      };
      updateOptimisticItems(optimisticAction);
      const nextItems = applyCartOptimisticAction(
        optimisticItems,
        optimisticAction,
      );
      setCartCount(getTotalItemsFrom(nextItems));

      const actionResult = await runWithLoading(productId, () =>
        updateCartQuantityMutate(productId, clampedQuantity),
      );
      if (!actionResult.success) {
        addToast({
          type: "error",
          message: actionResult.error || "Failed to update cart",
        });
        setItems((prev) => [...prev]);
        setCartCount(getTotalItemsFrom(items));
        return false;
      }

      setItems((prev) => applyCartOptimisticAction(prev, optimisticAction));
      return true;
    },
    [
      isSignedIn,
      optimisticItems,
      items,
      addToast,
      updateCartQuantityMutate,
      runWithLoading,
      setCartCount,
      updateOptimisticItems,
    ],
  );

  const isAtMaxQuantity = useCallback(
    (productId: number) => {
      return getQuantity(productId) >= MAX_CART_QUANTITY;
    },
    [getQuantity],
  );

  // Hydrate cart items (called on mount with initial data)
  const hydrate = useCallback(
    (cartItems: CartWithProduct[]) => {
      setItems(cartItems);
      setCartCount(getTotalItemsFrom(cartItems));
    },
    [setCartCount],
  );

  // Clear cart
  const clear = useCallback(() => {
    setItems([]);
    setCartCount(0);
  }, [setCartCount]);

  return {
    items: optimisticItems,
    totalItems: getTotalItems(),
    totalPrice: getTotalPrice(),
    addToCart,
    removeFromCart,
    updateQuantity,
    getQuantity,
    isLoading,
    isAnyLoading,
    isAtMaxQuantity,
    hydrate,
    clear,
  };
}
