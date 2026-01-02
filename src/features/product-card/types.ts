import type { ProductWithCategories } from "@/types";

/**
 * View model for ProductCard display.
 */
export interface ProductCardViewModel {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  formattedPrice: string;
  images: string[];
  inStock: boolean;
  averageRating: number | null;
  reviewCount: number;
  inWishlist: boolean;
  addedToCart: boolean;
  canAddToCart: boolean;
  isCartThrottling: boolean;
  isWishlistDebouncing: boolean;
}

/**
 * Props for the presentational ProductCard component.
 */
export interface ProductCardProps {
  viewModel: ProductCardViewModel;
  variant?: "default" | "wishlist";
  className?: string;
  disableImageCarousel?: boolean;
  onImageClick: () => void;
  onWishlistClick: () => void;
  onAddToCart: () => void;
  onRemove?: () => void;
}

/**
 * Props for the ProductCardContainer.
 */
export interface ProductCardContainerProps {
  product: ProductWithCategories;
  variant?: "default" | "wishlist";
  onRemoveFromWishlist?: () => void;
  className?: string;
  disableImageCarousel?: boolean;
}

/**
 * Build product card view model from raw data.
 */
export function buildProductCardViewModel(
  product: ProductWithCategories,
  inWishlist: boolean,
  addedToCart: boolean,
  canAddToCart: boolean,
  isCartThrottling: boolean,
  isWishlistDebouncing: boolean,
): ProductCardViewModel {
  const category =
    product.product_categories[0]?.category || product.material || "Pottery";

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    category,
    price: product.price,
    formattedPrice: `₹${product.price.toLocaleString()}`,
    images: product.image_urls,
    inStock: product.available_quantity > 0,
    averageRating: product.averageRating ?? null,
    reviewCount: product._count?.reviews ?? 0,
    inWishlist,
    addedToCart,
    canAddToCart,
    isCartThrottling,
    isWishlistDebouncing,
  };
}
