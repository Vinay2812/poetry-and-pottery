import type { ProductDetail, ProductReview } from "@/data/products/types";

import { createDate } from "@/lib/date";

// Formatted review for display (with optimistic update support).
export interface FormattedReview {
  id: string;
  authorId: number;
  author: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
  likes: number;
  isLikedByCurrentUser: boolean;
  images: string[];
}

// Product availability status computed from product data.
export interface ProductAvailabilityStatus {
  isOutOfStock: boolean;
  isLowStock: boolean;
  isInactive: boolean;
  isCollectionArchived: boolean;
  isUnavailable: boolean;
}

// Props for the presentational ProductDetail component.
export interface ProductDetailProps {
  product: ProductDetail;
  formattedReviews: FormattedReview[];
  selectedColor: string;
  addedToCart: boolean;
  inWishlist: boolean;
  cartLoading: boolean;
  wishlistLoading: boolean;
  atMaxQuantity: boolean;
  currentUserId?: number | null;
  availabilityStatus: ProductAvailabilityStatus;
  onColorSelect: (color: string) => void;
  onShare: () => void;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  onRequestProduct: () => void;
  onReviewLike: (reviewId: string, likes: number, isLiked: boolean) => void;
  onLikeUpdate: (reviewId: string, likes: number, isLiked: boolean) => void;
}

// Compute product availability status from product data.
export function computeAvailabilityStatus(
  product: ProductDetail,
): ProductAvailabilityStatus {
  const availableQuantity = product.available_quantity ?? 0;
  const isOutOfStock = availableQuantity === 0;
  const isLowStock = availableQuantity > 0 && availableQuantity <= 5;
  const isInactive = product.is_active === false;

  // Check if product is archived based on collection date window
  const isCollectionArchived = (() => {
    if (!product.collection) return false;
    const now = createDate();
    // Collection ended (ends_at < now)
    if (product.collection.ends_at) {
      const endsAt = createDate(product.collection.ends_at);
      if (now > endsAt) return true;
    }
    // Collection hasn't started yet (starts_at > now)
    if (product.collection.starts_at) {
      const startsAt = createDate(product.collection.starts_at);
      if (now < startsAt) return true;
    }
    return false;
  })();

  // Product is unavailable if sold out, inactive, or in archived collection
  const isUnavailable = isOutOfStock || isInactive || isCollectionArchived;

  return {
    isOutOfStock,
    isLowStock,
    isInactive,
    isCollectionArchived,
    isUnavailable,
  };
}

// Props for the ProductDetailContainer.
export interface ProductDetailContainerProps {
  product: ProductDetail;
}

// Build formatted reviews from raw review data (with optimistic update support).
export function buildFormattedReviews(
  reviews: ProductReview[],
  currentUserId: number | null | undefined,
  reviewLikeUpdates: Record<string, { likes: number; isLiked: boolean }>,
): FormattedReview[] {
  return (reviews || []).map((review) => {
    const reviewId = String(review.id);
    const likeUpdate = reviewLikeUpdates[reviewId];
    const baseLikes = review.likes?.length || 0;
    const baseIsLiked = currentUserId
      ? (review.likes?.some((like) => like.user_id === currentUserId) ?? false)
      : false;

    return {
      id: reviewId,
      authorId: review.user_id,
      author: review.user?.name || "Anonymous",
      avatar:
        review.user?.image ||
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      rating: review.rating,
      content: review.review || "",
      date: createDate(review.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      likes: likeUpdate?.likes ?? baseLikes,
      isLikedByCurrentUser: likeUpdate?.isLiked ?? baseIsLiked,
      images: review.image_urls || [],
    };
  });
}
