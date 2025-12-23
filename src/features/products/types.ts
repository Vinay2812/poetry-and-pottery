import type { ProductWithCategories } from "@/types";

/**
 * Category data for filtering.
 */
export interface Category {
  id: string;
  name: string;
}

/**
 * Price histogram bucket for the filter UI.
 */
export interface PriceHistogram {
  min: number;
  max: number;
  count: number;
}

/**
 * Sort options for products.
 */
export type SortOption = "featured" | "price-low" | "price-high" | "newest";

export interface SortOptionConfig {
  value: SortOption;
  label: string;
}

export const SORT_OPTIONS: SortOptionConfig[] = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

/**
 * Filter state managed by the container.
 */
export interface ProductFilterState {
  activeCategory: string;
  selectedMaterials: string[];
  sortBy: string;
  localPriceRange: [number, number];
  searchQuery: string;
}

/**
 * View model for the ProductList component.
 */
export interface ProductListViewModel {
  products: ProductWithCategories[];
  totalProducts: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  filterState: ProductFilterState;
  categories: Category[];
  materials: string[];
  priceRange: { min: number; max: number } | undefined;
  priceHistogram: PriceHistogram[] | undefined;
}

/**
 * Props for the presentational ProductList component.
 */
export interface ProductListProps {
  viewModel: ProductListViewModel;
  loadMoreRef: (node?: Element | null) => void;
  onCategoryChange: (category: string) => void;
  onMaterialToggle: (material: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onPriceCommit: (range: [number, number]) => void;
  onSortChange: (sort: string) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

/**
 * Props for the ProductListContainer.
 */
export interface ProductListContainerProps {
  products: ProductWithCategories[];
  categories: Category[];
  materials: string[];
  totalProducts: number;
  priceRange?: { min: number; max: number };
  priceHistogram?: PriceHistogram[];
}
