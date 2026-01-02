"use client";

import { ProductList } from "../components/product-list";
import { useProductFilters } from "../hooks/use-product-filters";
import { useProductsQuery } from "../hooks/use-products-query";
import type { ProductListContainerProps, ProductListViewModel } from "../types";

export function ProductListContainer({
  products: initialProducts,
  categories,
  materials,
  totalProducts,
  priceRange,
  priceHistogram,
}: ProductListContainerProps) {
  // Use the filter hook for URL param management
  const {
    selectedCategories,
    selectedMaterials,
    sortBy,
    localPriceRange,
    searchQuery,
    filterParams,
    onCategoryToggle,
    onMaterialToggle,
    onPriceChange,
    onPriceCommit,
    onSortChange,
    onSearchChange,
    onClearFilters,
  } = useProductFilters({ priceRange });

  // Use the query hook for data fetching
  const {
    products,
    totalProducts: currentTotal,
    hasNextPage,
    isFetchingNextPage,
    loadMoreRef,
  } = useProductsQuery({
    filterParams,
    initialProducts,
    totalProducts,
  });

  // Build the view model
  const viewModel: ProductListViewModel = {
    products,
    totalProducts: currentTotal,
    hasNextPage,
    isFetchingNextPage,
    filterState: {
      selectedCategories,
      selectedMaterials,
      sortBy,
      localPriceRange,
      searchQuery,
    },
    categories,
    materials,
    priceRange,
    priceHistogram,
  };

  return (
    <ProductList
      viewModel={viewModel}
      loadMoreRef={loadMoreRef}
      onCategoryToggle={onCategoryToggle}
      onMaterialToggle={onMaterialToggle}
      onPriceChange={onPriceChange}
      onPriceCommit={onPriceCommit}
      onSortChange={onSortChange}
      onSearchChange={onSearchChange}
      onClearFilters={onClearFilters}
    />
  );
}
