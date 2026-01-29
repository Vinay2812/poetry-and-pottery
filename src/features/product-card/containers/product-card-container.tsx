"use client";

import { useCart, useWishlist } from "@/hooks";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { useRouteAnimation } from "@/components/providers/route-animation-provider";

import { ProductCard } from "../components/product-card";
import type { ProductCardContainerProps } from "../types";

export function ProductCardContainer({
  product,
  variant = "default",
  onRemoveFromWishlist,
  className,
  disableImageCarousel = false,
  isArchiveView = false,
}: ProductCardContainerProps) {
  const [addedToCart, setAddedToCart] = useState(false);

  const router = useRouter();
  const { startNavigation } = useRouteAnimation();

  const { toggleWishlist, isInWishlist, isWishlistHydrated } = useWishlist();
  const { addToCart, isAtMaxQuantity } = useCart();

  // Use local state if hydrated, otherwise fallback to server's in_wishlist
  const inWishlist = isWishlistHydrated
    ? isInWishlist(product.id)
    : product.in_wishlist;

  const atMaxQuantity = isAtMaxQuantity(product.id);
  const inStock = product.available_quantity > 0;
  const canAddToCart = inStock && !atMaxQuantity;
  const isWishlistVariant = variant === "wishlist";

  const handleImageClick = useCallback(() => {
    startNavigation(() => {
      router.push(`/products/${product.id}`);
    });
  }, [router, product.id, startNavigation]);

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

  // In archive view, always show the product even if out of stock
  // In normal view, hide products that can't be added to cart
  if (!canAddToCart && !isArchiveView) {
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
      isArchiveView={isArchiveView}
      onImageClick={handleImageClick}
      onWishlistClick={handleWishlistClick}
      onAddToCart={handleAddToCart}
      onRemove={handleRemove}
    />
  );
}
