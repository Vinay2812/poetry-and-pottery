"use client";

import { useToggleReviewLike } from "@/data/reviews/gateway/client";
import { useAuthAction, useCart, useShare, useWishlist } from "@/hooks";
import {
  useCallback,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";

import { openWhatsAppProductRequest } from "@/lib/contact-business";

import { ProductDetail } from "../components/product-detail";
import type { ProductDetailContainerProps } from "../types";
import { buildFormattedReviews, computeAvailabilityStatus } from "../types";

export function ProductDetailContainer({
  product,
}: ProductDetailContainerProps) {
  const [selectedColor, setSelectedColor] = useState(product.color_name || "");
  const [addedToCart, setAddedToCart] = useState(false);
  const [reviewLikeUpdates, setReviewLikeUpdates] = useState<
    Record<string, { likes: number; isLiked: boolean }>
  >({});
  const [optimisticReviewLikeUpdates, applyOptimisticReviewLike] =
    useOptimistic(
      reviewLikeUpdates,
      (
        state: Record<string, { likes: number; isLiked: boolean }>,
        update: { reviewId: string; likes: number; isLiked: boolean },
      ) => ({
        ...state,
        [update.reviewId]: { likes: update.likes, isLiked: update.isLiked },
      }),
    );
  const [, startTransition] = useTransition();

  const { mutate: toggleReviewLikeMutate } = useToggleReviewLike();
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

  const handleLikeUpdate = useCallback(
    (reviewId: string, likes: number, isLiked: boolean) => {
      setReviewLikeUpdates((prev) => ({
        ...prev,
        [reviewId]: { likes, isLiked },
      }));
    },
    [],
  );

  const handleReviewLike = useCallback(
    (reviewId: string, currentLikes: number, currentIsLiked: boolean) => {
      // Debounce check
      const result = requireAuth(() => {
        // Optimistically update UI
        const newIsLiked = !currentIsLiked;
        const newLikes = currentIsLiked ? currentLikes - 1 : currentLikes + 1;

        // Wrap entire async operation in transition
        startTransition(async () => {
          applyOptimisticReviewLike({
            reviewId,
            likes: newLikes,
            isLiked: newIsLiked,
          });

          // Call mutation
          const result = await toggleReviewLikeMutate(Number(reviewId));

          if (!result.success) {
            setReviewLikeUpdates((prev) => ({
              ...prev,
              [reviewId]: { likes: currentLikes, isLiked: currentIsLiked },
            }));
          } else if (result.likesCount !== undefined) {
            // Sync with server count
            setReviewLikeUpdates((prev) => ({
              ...prev,
              [reviewId]: { likes: result.likesCount, isLiked: newIsLiked },
            }));
          }
        });
      });
      return result ?? false;
    },
    [
      requireAuth,
      applyOptimisticReviewLike,
      toggleReviewLikeMutate,
      startTransition,
    ],
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
