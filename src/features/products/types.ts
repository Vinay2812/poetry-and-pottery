import { type ProductBase } from "@/data/products/types";

import { ProductOrderBy } from "@/graphql/generated/types";

export interface Category {
  id: string;
  name: string;
}

export interface PriceHistogram {
  min: number;
  max: number;
  count: number;
}

export interface SortOptionConfig {
  value: ProductOrderBy;
  label: string;
}

export const SORT_OPTIONS: SortOptionConfig[] = [
  { value: ProductOrderBy.Featured, label: "Featured" },
  { value: ProductOrderBy.BestSellers, label: "Best Sellers" },
  { value: ProductOrderBy.PriceLowToHigh, label: "Price: Low to High" },
  { value: ProductOrderBy.PriceHighToLow, label: "Price: High to Low" },
  { value: ProductOrderBy.New, label: "Newest" },
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
  isFiltering: boolean;
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
