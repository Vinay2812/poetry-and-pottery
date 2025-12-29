import type { ProductBase } from "@/data/products/types";

export interface ProductCardProps {
  product: ProductBase;
  variant?: "default" | "wishlist";
  className?: string;
  // Runtime state
  inWishlist: boolean;
  addedToCart: boolean;
  canAddToCart: boolean;
  isCartThrottling: boolean;
  isWishlistDebouncing: boolean;
  // Handlers
  onImageClick: () => void;
  onWishlistClick: () => void;
  onAddToCart: () => void;
  onRemove?: () => void;
}

export interface ProductCardContainerProps {
  product: ProductBase;
  variant?: "default" | "wishlist";
  onRemoveFromWishlist?: () => void;
  className?: string;
}
