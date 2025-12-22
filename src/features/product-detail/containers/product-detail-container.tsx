"use client";

import { toggleReviewLike } from "@/actions";
import {
  useAuthAction,
  useCart,
  useDebounce,
  useShare,
  useWishlist,
} from "@/hooks";
import { useCallback, useMemo, useState } from "react";

import { ProductDetail } from "../components/product-detail";
import type { ProductDetailContainerProps } from "../types";
import {
  buildFormattedReviews,
  buildProductDetailViewModel,
  calculateAverageRating,
} from "../types";

export function ProductDetailContainer({
  product,
  relatedProducts,
  currentUserId,
}: ProductDetailContainerProps) {
  const [selectedColor, setSelectedColor] = useState(product.color_name || "");
  const [addedToCart, setAddedToCart] = useState(false);
  const [reviewLikeUpdates, setReviewLikeUpdates] = useState<
    Record<string, { likes: number; isLiked: boolean }>
  >({});

  const { requireAuth } = useAuthAction();
  const { addToCart, isLoading: isCartLoading, isAtMaxQuantity } = useCart();
  const {
    toggleWishlist,
    isInWishlist,
    isLoading: isWishlistLoading,
  } = useWishlist();
  const { share } = useShare();
  const { debounce } = useDebounce();

  const inWishlist = isInWishlist(product.id);
  const cartLoading = isCartLoading(product.id);
  const wishlistLoading = isWishlistLoading(product.id);
  const atMaxQuantity = isAtMaxQuantity(product.id);

  // Calculate average rating
  const averageRating = useMemo(
    () => calculateAverageRating(product.reviews),
    [product.reviews],
  );

  // Build formatted reviews with like updates
  const formattedReviews = useMemo(
    () =>
      buildFormattedReviews(product.reviews, currentUserId, reviewLikeUpdates),
    [product.reviews, currentUserId, reviewLikeUpdates],
  );

  // Build view model
  const viewModel = useMemo(
    () => buildProductDetailViewModel(product, formattedReviews, averageRating),
    [product, formattedReviews, averageRating],
  );

  const handleShare = useCallback(() => {
    share({
      title: product.name,
      text: `Check out ${product.name} - ₹${product.price.toLocaleString()}`,
      url: window.location.href,
    });
  }, [share, product.name, product.price]);

  const handleAddToCart = useCallback(() => {
    requireAuth(async () => {
      const success = await addToCart(product.id, 1, product);
      if (success) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
      }
    });
  }, [requireAuth, addToCart, product]);

  const handleToggleWishlist = useCallback(() => {
    requireAuth(() => toggleWishlist(product.id));
  }, [requireAuth, toggleWishlist, product.id]);

  const handleColorSelect = useCallback((color: string) => {
    setSelectedColor(color);
  }, []);

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
    async (reviewId: string, currentLikes: number, currentIsLiked: boolean) => {
      // Debounce check
      const result = debounce(`like-${reviewId}`, async () => {
        requireAuth(async () => {
          // Optimistically update UI
          const newIsLiked = !currentIsLiked;
          const newLikes = currentIsLiked ? currentLikes - 1 : currentLikes + 1;
          handleLikeUpdate(reviewId, newLikes, newIsLiked);

          // Call server action
          const result = await toggleReviewLike(Number(reviewId));

          if (!result.success) {
            // Revert on failure
            handleLikeUpdate(reviewId, currentLikes, currentIsLiked);
          } else if (result.likesCount !== undefined) {
            // Sync with server count
            handleLikeUpdate(reviewId, result.likesCount, newIsLiked);
          }
        });
      });
      return (await result) ?? false;
    },
    [requireAuth, handleLikeUpdate, debounce],
  );

  return (
    <ProductDetail
      viewModel={viewModel}
      relatedProducts={relatedProducts}
      selectedColor={selectedColor}
      addedToCart={addedToCart}
      inWishlist={inWishlist}
      cartLoading={cartLoading}
      wishlistLoading={wishlistLoading}
      atMaxQuantity={atMaxQuantity}
      currentUserId={currentUserId}
      onColorSelect={handleColorSelect}
      onShare={handleShare}
      onAddToCart={handleAddToCart}
      onToggleWishlist={handleToggleWishlist}
      onReviewLike={handleReviewLike}
      onLikeUpdate={handleLikeUpdate}
    />
  );
}
