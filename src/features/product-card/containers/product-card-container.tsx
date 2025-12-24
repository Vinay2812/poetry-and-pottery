"use client";

import { useAuthAction, useCart, useWishlist } from "@/hooks";
import { DEFAULT_THROTTLE_MS } from "@/hooks/use-throttle";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { ProductCard } from "../components/product-card";
import type { ProductCardContainerProps } from "../types";
import { buildProductCardViewModel } from "../types";

export function ProductCardContainer({
  product,
  variant = "default",
  onRemoveFromWishlist,
  className,
}: ProductCardContainerProps) {
  const [addedToCart, setAddedToCart] = useState(false);

  const router = useRouter();
  const { requireAuth } = useAuthAction();
  const {
    toggleWishlist,
    isInWishlist,
    isDebouncing: isWishlistDebouncing,
  } = useWishlist();
  const {
    addToCart,
    isAtMaxQuantity,
    isThrottling: isCartThrottling,
  } = useCart();

  const inWishlist = isInWishlist(product.id);
  const atMaxQuantity = isAtMaxQuantity(product.id);
  const inStock = product.available_quantity > 0;
  const canAddToCart = inStock && !atMaxQuantity;
  const isWishlistVariant = variant === "wishlist";
  const cartThrottling = isCartThrottling(product.id);
  const wishlistDebouncing = isWishlistDebouncing(product.id);

  const viewModel = useMemo(
    () =>
      buildProductCardViewModel(
        product,
        inWishlist,
        addedToCart,
        canAddToCart,
        cartThrottling,
        wishlistDebouncing,
      ),
    [
      product,
      inWishlist,
      addedToCart,
      canAddToCart,
      cartThrottling,
      wishlistDebouncing,
    ],
  );

  const handleImageClick = useCallback(() => {
    router.push(`/products/${product.slug}`);
  }, [router, product.slug]);

  const handleWishlistClick = useCallback(() => {
    toggleWishlist(product.id);
  }, [toggleWishlist, product.id]);

  const handleAddToCart = useCallback(async () => {
    setAddedToCart(true);
    addToCart(product.id, 1, product).then((success) => {
      if (isWishlistVariant && success) {
        onRemoveFromWishlist?.();
      }
      setAddedToCart(false);
    });
  }, [addToCart, product, isWishlistVariant, onRemoveFromWishlist]);

  const handleRemove = useCallback(() => {
    onRemoveFromWishlist?.();
  }, [onRemoveFromWishlist]);

  if (!canAddToCart) {
    return null;
  }

  return (
    <ProductCard
      viewModel={viewModel}
      variant={variant}
      className={className}
      onImageClick={handleImageClick}
      onWishlistClick={handleWishlistClick}
      onAddToCart={handleAddToCart}
      onRemove={handleRemove}
    />
  );
}
