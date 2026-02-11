import type { ProductBase } from "@/data/products/types";

import type { WishlistItem } from "@/graphql/generated/types";

export function mapToProductBase(wishlistItem: WishlistItem): ProductBase {
  return {
    id: wishlistItem.product.id,
    slug: wishlistItem.product.slug,
    name: wishlistItem.product.name,
    price: wishlistItem.product.price,
    image_urls: wishlistItem.product.image_urls,
    material: wishlistItem.product.material,
    available_quantity: wishlistItem.product.available_quantity,
    total_quantity: wishlistItem.product.total_quantity,
    color_code: wishlistItem.product.color_code,
    color_name: wishlistItem.product.color_name,
    avg_rating: wishlistItem.product.avg_rating ?? 0,
    reviews_count: wishlistItem.product.reviews_count ?? 0,
    in_wishlist: true,
    is_active: wishlistItem.product.is_active ?? true,
    collection: wishlistItem.product.collection ?? null,
  };
}

// View model for a single wishlist item.
export interface WishlistItemViewModel {
  productId: number;
  product: ProductBase;
}

// View model for the Wishlist component.
export interface WishlistViewModel {
  items: WishlistItemViewModel[];
  totalItems: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  showRecommendations: boolean;
}

// Props for the presentational Wishlist component.
export interface WishlistProps {
  viewModel: WishlistViewModel;
  recommendations: ProductBase[];
  recommendationsLoading?: boolean;
  recommendationsSkeleton?: React.ReactNode;
  loadMoreRef: (node?: Element | null) => void;
  onRemoveItem: (productId: number) => void;
}

// Props for the WishlistContainer.
export interface WishlistContainerProps {
  initialWishlistItems: WishlistItem[];
  initialPagination: {
    page: number;
    totalPages: number;
    total: number;
  };
}
