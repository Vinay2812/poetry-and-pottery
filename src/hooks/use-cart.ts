"use client";

import { MAX_CART_QUANTITY } from "@/consts/performance";
import {
  type CustomDataInput,
  useAddToCart,
  useRemoveFromCart,
  useUpdateCartQuantity,
} from "@/data/cart/gateway/client";
import { useLoadingTransition } from "@/hooks/use-loading-transition";
import { useUIStore } from "@/store";
import type {
  CartWithProduct,
  ProductCustomizationDataLocal,
  ProductWithCategories,
} from "@/types";
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
    custom_data: item.custom_data
      ? {
          options: item.custom_data.options.map((opt) => ({
            type: opt.type,
            optionId: opt.optionId,
            name: opt.name,
            value: opt.value,
            priceModifier: opt.priceModifier,
          })),
          totalModifier: item.custom_data.totalModifier,
        }
      : null,
    custom_data_hash: item.custom_data_hash,
    product: {
      id: item.product.id,
      slug: item.product.slug,
      name: item.product.name,
      price: item.product.price,
      image_urls: item.product.image_urls,
      material: item.product.material,
      available_quantity: item.product.available_quantity,
      total_quantity: item.product.total_quantity,
      color_code: item.product.color_code,
      color_name: item.product.color_name,
      is_active: item.product.is_active,
      description: null,
      instructions: [],
      created_at: new Date(),
      updated_at: new Date(),
      product_categories: [],
      collection: item.product.collection ?? null,
    },
  };
}

type CartOptimisticAction =
  | {
      type: "add";
      productId: number;
      quantity: number;
      product?: ProductWithCategories;
      customData?: ProductCustomizationDataLocal | null;
      customDataHash?: string;
    }
  | { type: "remove"; productId: number; customDataHash?: string }
  | {
      type: "update";
      productId: number;
      quantity: number;
      customDataHash?: string;
    }
  | { type: "replace"; item: CartWithProduct };

// Helper to find cart item by product_id and custom_data_hash
function findCartItem(
  items: CartWithProduct[],
  productId: number,
  customDataHash?: string,
): CartWithProduct | undefined {
  return items.find(
    (item) =>
      item.product_id === productId &&
      item.custom_data_hash === (customDataHash ?? ""),
  );
}

function applyCartOptimisticAction(
  state: CartWithProduct[],
  action: CartOptimisticAction,
): CartWithProduct[] {
  switch (action.type) {
    case "add": {
      const hash = action.customDataHash ?? "";
      const existingItem = findCartItem(state, action.productId, hash);
      if (existingItem) {
        return state.map((item) =>
          item.product_id === action.productId && item.custom_data_hash === hash
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
        id: -Date.now(),
        user_id: 0,
        product_id: action.productId,
        quantity: action.quantity,
        created_at: new Date(),
        updated_at: new Date(),
        custom_data: action.customData ?? null,
        custom_data_hash: hash,
        product: {
          ...action.product,
          collection: null,
        },
      };
      return [...state, optimisticItem];
    }
    case "remove": {
      const hash = action.customDataHash ?? "";
      return state.filter(
        (item) =>
          !(
            item.product_id === action.productId &&
            item.custom_data_hash === hash
          ),
      );
    }
    case "update": {
      const hash = action.customDataHash ?? "";
      if (action.quantity <= 0) {
        return state.filter(
          (item) =>
            !(
              item.product_id === action.productId &&
              item.custom_data_hash === hash
            ),
        );
      }
      return state.map((item) =>
        item.product_id === action.productId && item.custom_data_hash === hash
          ? { ...item, quantity: action.quantity }
          : item,
      );
    }
    case "replace": {
      const filtered = state.filter(
        (item) =>
          !(
            item.product_id === action.item.product_id &&
            item.custom_data_hash === action.item.custom_data_hash
          ),
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
  const {
    cartCount,
    setCartCount,
    addToast,
    setSignInModalOpen,
    setSignInRedirectUrl,
  } = useUIStore();
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
    (
      productId: number,
      quantity: number = 1,
      product?: ProductWithCategories,
      customData?: CustomDataInput | null,
    ) => {
      if (!isSignedIn) {
        setSignInRedirectUrl(window.location.pathname);
        setSignInModalOpen(true);
        return Promise.resolve(false);
      }

      // For customized items, we always add as new (hash-based uniqueness handled by server)
      // For regular items, check if already exists
      const customDataHash = customData ? "pending" : "";
      const existingItem = findCartItem(items, productId, customDataHash);
      const currentQuantity = existingItem?.quantity ?? 0;

      // For customized items, don't check existing quantity since each customization is unique
      if (!customData && currentQuantity >= MAX_CART_QUANTITY) {
        addToast({
          type: "error",
          message: `Maximum ${MAX_CART_QUANTITY} items per product allowed`,
        });
        return Promise.resolve(false);
      }

      const newQuantity = customData
        ? quantity
        : Math.min(currentQuantity + quantity, MAX_CART_QUANTITY);
      const quantityToAdd = customData
        ? quantity
        : newQuantity - currentQuantity;

      if (quantityToAdd <= 0) {
        return Promise.resolve(false);
      }

      const optimisticAction: CartOptimisticAction = {
        type: "add",
        productId,
        quantity: quantityToAdd,
        product,
        customData: customData
          ? {
              options: customData.options,
              totalModifier: customData.totalModifier,
            }
          : null,
        customDataHash,
      };

      // Update cart count optimistically using the global count
      const previousCount = cartCount;
      setCartCount(previousCount + quantityToAdd);

      return new Promise<boolean>((resolve) => {
        // Wrap entire async operation in transition
        startTransition(async () => {
          updateOptimisticItems(optimisticAction);

          const actionResult = await runWithLoading(productId, () =>
            addToCartMutate(productId, quantityToAdd, customData),
          );

          if (!actionResult.success) {
            addToast({
              type: "error",
              message: actionResult.error || "Failed to add to cart",
            });
            // Revert cart count
            setCartCount(previousCount);
            resolve(false);
            return;
          }

          // Update base state with server data
          const newItem = mapToCartWithProduct(actionResult.data);
          setItems((prev) =>
            applyCartOptimisticAction(prev, { type: "replace", item: newItem }),
          );
          resolve(true);
        });
      });
    },
    [
      isSignedIn,
      items,
      cartCount,
      addToast,
      setSignInModalOpen,
      setSignInRedirectUrl,
      addToCartMutate,
      runWithLoading,
      setCartCount,
      updateOptimisticItems,
      startTransition,
    ],
  );

  const removeFromCart = useCallback(
    (productId: number) => {
      if (!isSignedIn) return Promise.resolve(false);

      const optimisticAction: CartOptimisticAction = {
        type: "remove",
        productId,
      };

      // Update cart count optimistically using the global count
      const existingItem = items.find((i) => i.product_id === productId);
      const quantityToRemove = existingItem?.quantity ?? 1;
      const previousCount = cartCount;
      setCartCount(Math.max(0, previousCount - quantityToRemove));

      return new Promise<boolean>((resolve) => {
        startTransition(async () => {
          updateOptimisticItems(optimisticAction);

          const actionResult = await runWithLoading(productId, () =>
            removeFromCartMutate(productId),
          );

          if (!actionResult.success) {
            addToast({
              type: "error",
              message: actionResult.error || "Failed to remove from cart",
            });
            // Revert cart count
            setCartCount(previousCount);
            resolve(false);
            return;
          }

          // Update base state
          setItems((prev) => applyCartOptimisticAction(prev, optimisticAction));
          resolve(true);
        });
      });
    },
    [
      isSignedIn,
      items,
      cartCount,
      addToast,
      removeFromCartMutate,
      runWithLoading,
      setCartCount,
      updateOptimisticItems,
      startTransition,
    ],
  );

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (!isSignedIn) return Promise.resolve(false);

      const clampedQuantity = Math.min(
        Math.max(quantity, 0),
        MAX_CART_QUANTITY,
      );
      const optimisticAction: CartOptimisticAction = {
        type: "update",
        productId,
        quantity: clampedQuantity,
      };

      // Update cart count optimistically using the global count
      const existingItem = items.find((i) => i.product_id === productId);
      const currentItemQuantity = existingItem?.quantity ?? 0;
      const quantityDiff = clampedQuantity - currentItemQuantity;
      const previousCount = cartCount;
      setCartCount(Math.max(0, previousCount + quantityDiff));

      return new Promise<boolean>((resolve) => {
        startTransition(async () => {
          updateOptimisticItems(optimisticAction);

          const actionResult = await runWithLoading(productId, () =>
            updateCartQuantityMutate(productId, clampedQuantity),
          );

          if (!actionResult.success) {
            addToast({
              type: "error",
              message: actionResult.error || "Failed to update cart",
            });
            // Revert cart count
            setCartCount(previousCount);
            resolve(false);
            return;
          }

          // Update base state
          setItems((prev) => applyCartOptimisticAction(prev, optimisticAction));
          resolve(true);
        });
      });
    },
    [
      isSignedIn,
      items,
      cartCount,
      addToast,
      updateCartQuantityMutate,
      runWithLoading,
      setCartCount,
      updateOptimisticItems,
      startTransition,
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
