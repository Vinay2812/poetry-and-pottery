"use client";

import {
  useAuthAction,
  useCart,
  useReviewLikes,
  useShare,
  useWishlist,
} from "@/hooks";
import { useCallback, useMemo, useState } from "react";

import { openWhatsAppProductRequest } from "@/lib/contact-business";

import { ProductDetail } from "../components/product-detail";
import type { ProductDetailContainerProps } from "../types";
import { buildFormattedReviews, computeAvailabilityStatus } from "../types";

export function ProductDetailContainer({
  product,
}: ProductDetailContainerProps) {
  const [selectedColor, setSelectedColor] = useState(product.color_name || "");
  const [addedToCart, setAddedToCart] = useState(false);

  const {
    optimisticReviewLikeUpdates,
    handleLikeUpdate,
    handleReviewLike: baseHandleReviewLike,
  } = useReviewLikes();

  const { requireAuth, userId: currentUserId } = useAuthAction();
  const { addToCart, isLoading: isCartLoading, isAtMaxQuantity } = useCart();
  const {
    toggleWishlist,
    isInWishlist,
    isWishlistHydrated,
    isLoading: isWishlistLoading,
  } = useWishlist();
  const { share } = useShare();

  // Compute availability status
  const availabilityStatus = useMemo(
    () => computeAvailabilityStatus(product),
    [product],
  );

  // Use local state if hydrated, otherwise fallback to server's in_wishlist
  const inWishlist = isWishlistHydrated
    ? isInWishlist(product.id)
    : product.in_wishlist;

  const cartLoading = isCartLoading(product.id);
  const wishlistLoading = isWishlistLoading(product.id);
  const atMaxQuantity = isAtMaxQuantity(product.id);

  // Build formatted reviews with like updates
  const formattedReviews = useMemo(
    () =>
      buildFormattedReviews(
        product.reviews,
        currentUserId,
        optimisticReviewLikeUpdates,
      ),
    [product.reviews, currentUserId, optimisticReviewLikeUpdates],
  );

  const handleShare = useCallback(() => {
    share({
      title: product.name,
      text: `Check out ${product.name} - ₹${product.price.toLocaleString()}`,
      url: window.location.href,
    });
  }, [share, product.name, product.price]);

  const handleAddToCart = useCallback(() => {
    addToCart(product.id, 1).then((success) => {
      if (success) {
        setAddedToCart(true);
      }
    });
  }, [addToCart, product.id]);

  const handleToggleWishlist = useCallback(() => {
    toggleWishlist(product.id);
  }, [toggleWishlist, product.id]);

  const handleColorSelect = useCallback((color: string) => {
    setSelectedColor(color);
  }, []);

  const handleRequestProduct = useCallback(() => {
    openWhatsAppProductRequest({
      type: "product-request",
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      productUrl:
        typeof window !== "undefined"
          ? `${window.location.origin}/products/${product.id}`
          : `/products/${product.id}`,
      isSoldOut: availabilityStatus.isOutOfStock,
      isArchived:
        availabilityStatus.isInactive ||
        availabilityStatus.isCollectionArchived,
    });
  }, [product.id, product.name, product.price, availabilityStatus]);

  const handleReviewLike = useCallback(
    (reviewId: string, currentLikes: number, currentIsLiked: boolean) => {
      const result = requireAuth(() => {
        baseHandleReviewLike(reviewId, currentLikes, currentIsLiked);
      });
      return result ?? false;
    },
    [requireAuth, baseHandleReviewLike],
  );

  return (
    <ProductDetail
      product={product}
      formattedReviews={formattedReviews}
      selectedColor={selectedColor}
      addedToCart={addedToCart}
      inWishlist={inWishlist}
      cartLoading={cartLoading}
      wishlistLoading={wishlistLoading}
      atMaxQuantity={atMaxQuantity}
      currentUserId={currentUserId}
      availabilityStatus={availabilityStatus}
      onColorSelect={handleColorSelect}
      onShare={handleShare}
      onAddToCart={handleAddToCart}
      onToggleWishlist={handleToggleWishlist}
      onRequestProduct={handleRequestProduct}
      onReviewLike={handleReviewLike}
      onLikeUpdate={handleLikeUpdate}
    />
  );
}
