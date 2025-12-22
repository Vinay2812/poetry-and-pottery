// Components
export { ProductList } from "./components/product-list";

// Containers
export { ProductListContainer } from "./containers/product-list-container";

// Hooks
export { useProductFilters } from "./hooks/use-product-filters";
export { useProductsQuery } from "./hooks/use-products-query";

// Types
export type {
  Category,
  PriceHistogram,
  ProductFilterState,
  ProductListContainerProps,
  ProductListProps,
  ProductListViewModel,
  SortOption,
  SortOptionConfig,
} from "./types";
export { SORT_OPTIONS } from "./types";
