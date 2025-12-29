"use client";

import { useAuthAction, useCart, useWishlist } from "@/hooks";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { ProductCard } from "../components/product-card";
import type { ProductCardContainerProps } from "../types";

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
    isHydrated: isWishlistHydrated,
    isDebouncing: isWishlistDebouncing,
  } = useWishlist();
  const {
    addToCart,
    isAtMaxQuantity,
    isThrottling: isCartThrottling,
  } = useCart();

  // Use server's in_wishlist for initial/SSR, then hook state after hydration
  const inWishlist = isWishlistHydrated
    ? isInWishlist(product.id)
    : product.in_wishlist;

  const atMaxQuantity = isAtMaxQuantity(product.id);
  const inStock = product.available_quantity > 0;
  const canAddToCart = inStock && !atMaxQuantity;
  const isWishlistVariant = variant === "wishlist";
  const cartThrottling = isCartThrottling(product.id);
  const wishlistDebouncing = isWishlistDebouncing(product.id);

  const handleImageClick = useCallback(() => {
    router.push(`/products/${product.slug}`);
  }, [router, product.slug]);

  const handleWishlistClick = useCallback(() => {
    toggleWishlist(product.id);
  }, [toggleWishlist, product.id]);

  const handleAddToCart = useCallback(async () => {
    setAddedToCart(true);
    addToCart(product.id, 1).then((success) => {
      if (isWishlistVariant && success) {
        onRemoveFromWishlist?.();
      }
      setAddedToCart(false);
    });
  }, [addToCart, product.id, isWishlistVariant, onRemoveFromWishlist]);

  const handleRemove = useCallback(() => {
    onRemoveFromWishlist?.();
  }, [onRemoveFromWishlist]);

  if (!canAddToCart) {
    return null;
  }

  return (
    <ProductCard
      product={product}
      variant={variant}
      className={className}
      inWishlist={inWishlist}
      addedToCart={addedToCart}
      canAddToCart={canAddToCart}
      isCartThrottling={cartThrottling}
      isWishlistDebouncing={wishlistDebouncing}
      onImageClick={handleImageClick}
      onWishlistClick={handleWishlistClick}
      onAddToCart={handleAddToCart}
      onRemove={handleRemove}
    />
  );
}
