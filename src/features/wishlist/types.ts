import type { ProductBase } from "@/data/products/types";

import type { WishlistItem } from "@/graphql/generated/types";

/**
 * View model for a single wishlist item.
 */
export interface WishlistItemViewModel {
  productId: number;
  product: ProductBase;
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
  recommendations: ProductBase[];
  loadMoreRef: (node?: Element | null) => void;
  onRemoveItem: (productId: number) => void;
}

/**
 * Props for the WishlistContainer.
 */
export interface WishlistContainerProps {
  initialWishlistItems: WishlistItem[];
  recommendations: ProductBase[];
  initialPagination: {
    page: number;
    totalPages: number;
    total: number;
  };
}
