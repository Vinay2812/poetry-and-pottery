import type { ProductBase } from "@/data/products/types";

export interface Category {
  id: string;
  name: string;
}

export interface PriceHistogram {
  min: number;
  max: number;
  count: number;
}

export type SortOption =
  | "featured"
  | "best-sellers"
  | "price-low"
  | "price-high"
  | "newest";

export interface SortOptionConfig {
  value: SortOption;
  label: string;
}

export const SORT_OPTIONS: SortOptionConfig[] = [
  { value: "featured", label: "Featured" },
  { value: "best-sellers", label: "Best Sellers" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

export interface ProductFilterState {
  selectedCategories: string[];
  selectedMaterials: string[];
  sortBy: string;
  localPriceRange: [number, number];
  searchQuery: string;
}

export interface ProductListViewModel {
  products: ProductBase[];
  totalProducts: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  filterState: ProductFilterState;
  categories: Category[];
  materials: string[];
  priceRange: { min: number; max: number } | undefined;
  priceHistogram: PriceHistogram[] | undefined;
}

export interface ProductListProps {
  viewModel: ProductListViewModel;
  loadMoreRef: (node?: Element | null) => void;
  onCategoryToggle: (category: string) => void;
  onMaterialToggle: (material: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onPriceCommit: (range: [number, number]) => void;
  onSortChange: (sort: string) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

export interface ProductListContainerProps {
  products: ProductBase[];
  categories: Category[];
  materials: string[];
  totalProducts: number;
  priceRange?: { min: number; max: number };
  priceHistogram?: PriceHistogram[];
}
