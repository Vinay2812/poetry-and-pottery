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
  disableImageCarousel = false,
}: ProductCardContainerProps) {
  const [addedToCart, setAddedToCart] = useState(false);

  const router = useRouter();
  const { requireAuth } = useAuthAction();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart, isAtMaxQuantity } = useCart();

  // Use hook's local state if available, fallback to server's in_wishlist
  const localWishlistState = isInWishlist(product.id);
  const inWishlist = localWishlistState || product.in_wishlist;

  const atMaxQuantity = isAtMaxQuantity(product.id);
  const inStock = product.available_quantity > 0;
  const canAddToCart = inStock && !atMaxQuantity;
  const isWishlistVariant = variant === "wishlist";

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
      disableImageCarousel={disableImageCarousel}
      onImageClick={handleImageClick}
      onWishlistClick={handleWishlistClick}
      onAddToCart={handleAddToCart}
      onRemove={handleRemove}
    />
  );
}
