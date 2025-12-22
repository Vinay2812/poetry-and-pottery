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
    activeCategory,
    selectedMaterials,
    sortBy,
    localPriceRange,
    filterParams,
    onCategoryChange,
    onMaterialToggle,
    onPriceChange,
    onPriceCommit,
    onSortChange,
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
    categories,
    materials,
    priceRange,
    priceHistogram,
  });

  // Build the view model
  const viewModel: ProductListViewModel = {
    products,
    totalProducts: currentTotal,
    hasNextPage,
    isFetchingNextPage,
    filterState: {
      activeCategory,
      selectedMaterials,
      sortBy,
      localPriceRange,
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
      onCategoryChange={onCategoryChange}
      onMaterialToggle={onMaterialToggle}
      onPriceChange={onPriceChange}
      onPriceCommit={onPriceCommit}
      onSortChange={onSortChange}
      onClearFilters={onClearFilters}
    />
  );
}
