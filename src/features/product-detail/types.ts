import type { ProductWithCategories, ProductWithDetails } from "@/types";

/**
 * Formatted review for display.
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
 * View model for product detail.
 */
export interface ProductDetailViewModel {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category: string;
  material: string | null;
  colorName: string | null;
  colorCode: string | null;
  availableQuantity: number;
  instructions: string[];
  images: string[];
  averageRating: number;
  totalReviews: number;
  reviews: FormattedReview[];
  isOutOfStock: boolean;
  isLowStock: boolean;
}

/**
 * Props for the presentational ProductDetail component.
 */
export interface ProductDetailProps {
  viewModel: ProductDetailViewModel;
  relatedProducts: ProductWithCategories[];
  selectedColor: string;
  addedToCart: boolean;
  inWishlist: boolean;
  cartLoading: boolean;
  wishlistLoading: boolean;
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
  product: ProductWithDetails;
  relatedProducts: ProductWithCategories[];
  currentUserId?: number | null;
}

/**
 * Build formatted reviews from raw review data.
 */
export function buildFormattedReviews(
  reviews: ProductWithDetails["reviews"],
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

/**
 * Calculate average rating from reviews.
 */
export function calculateAverageRating(
  reviews: ProductWithDetails["reviews"],
): number {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
}

/**
 * Build product detail view model from raw data.
 */
export function buildProductDetailViewModel(
  product: ProductWithDetails,
  reviews: FormattedReview[],
  averageRating: number,
): ProductDetailViewModel {
  const images = product.image_urls || [];
  const category =
    product.product_categories[0]?.category || product.material || "Pottery";
  const availableQuantity = product.available_quantity ?? 0;

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    category,
    material: product.material,
    colorName: product.color_name,
    colorCode: product.color_code,
    availableQuantity,
    instructions: product.instructions || [],
    images,
    averageRating,
    totalReviews: product._count?.reviews || 0,
    reviews,
    isOutOfStock: availableQuantity === 0,
    isLowStock: availableQuantity > 0 && availableQuantity <= 5,
  };
}
