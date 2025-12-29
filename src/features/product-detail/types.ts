import type {
  ProductBase,
  ProductDetail,
  ProductReview,
} from "@/data/products/types";

/**
 * Formatted review for display (with optimistic update support).
 */
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

/**
 * Props for the presentational ProductDetail component.
 */
export interface ProductDetailProps {
  product: ProductDetail;
  relatedProducts: ProductBase[];
  formattedReviews: FormattedReview[];
  selectedColor: string;
  addedToCart: boolean;
  inWishlist: boolean;
  cartLoading: boolean;
  wishlistLoading: boolean;
  atMaxQuantity: boolean;
  currentUserId?: number | null;
  onColorSelect: (color: string) => void;
  onShare: () => void;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  onReviewLike: (reviewId: string, likes: number, isLiked: boolean) => void;
  onLikeUpdate: (reviewId: string, likes: number, isLiked: boolean) => void;
}

/**
 * Props for the ProductDetailContainer.
 */
export interface ProductDetailContainerProps {
  product: ProductDetail;
  relatedProducts: ProductBase[];
}

/**
 * Build formatted reviews from raw review data (with optimistic update support).
 */
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
      date: new Date(review.created_at).toLocaleDateString("en-US", {
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
