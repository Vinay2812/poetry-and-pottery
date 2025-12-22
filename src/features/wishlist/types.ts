import type { ProductWithCategories, WishlistWithProduct } from "@/types";

/**
 * View model for a single wishlist item.
 */
export interface WishlistItemViewModel {
  productId: number;
  product: ProductWithCategories;
}

/**
 * View model for the Wishlist component.
 */
export interface WishlistViewModel {
  items: WishlistItemViewModel[];
  totalItems: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  showRecommendations: boolean;
}

/**
 * Props for the presentational Wishlist component.
 */
export interface WishlistProps {
  viewModel: WishlistViewModel;
  recommendations: ProductWithCategories[];
  loadMoreRef: (node?: Element | null) => void;
  onRemoveItem: (productId: number) => void;
}

/**
 * Props for the WishlistContainer.
 */
export interface WishlistContainerProps {
  initialWishlistItems: WishlistWithProduct[];
  recommendations: ProductWithCategories[];
  initialPagination: {
    page: number;
    totalPages: number;
    total: number;
  };
}
