"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { ProductOrderBy, ProductsResponse } from "@/graphql/generated/types";

import { ProductList } from "../components/product-list";
import { useProductsFilterV2 } from "../hooks/use-products-filter-v2";
import { useProductsV2 } from "../hooks/use-products-v2";

interface ProductListContainerProps {
  productsWithFiltersAndMetadata: ProductsResponse;
}

export function ProductListContainer({
  productsWithFiltersAndMetadata,
}: ProductListContainerProps) {
  const {
    products,
    filterMetadata,
    hasNextProductsPage,
    isFetchingProducts,
    fetchNextProductsPageRef,
    filters,
    onFilterChange,
    onFilterClear,
  } = useProductsV2({
    productsWithFiltersAndMetadata,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const onSearchChange = useDebouncedCallback((search: string) => {
    onFilterChange({ ...filters, search });
  }, 200);

  const onFilterOpen = useCallback(() => {
    setIsFilterOpen(true);
  }, []);

  const onFilterClose = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  const onSortChange = useCallback(
    (sort: ProductOrderBy) => {
      onFilterChange({ ...filters, sort });
    },
    [filters, onFilterChange],
  );

  const onPriceRangeChange = useDebouncedCallback((value: [number, number]) => {
    onFilterChange({ ...filters, min_price: value[0], max_price: value[1] });
  }, 200);

  const onCategoryToggle = useCallback(
    (category: string) => {
      onFilterChange({
        ...filters,
        categories: [...filters.categories, category],
      });
    },
    [filters, onFilterChange],
  );

  const onMaterialToggle = useCallback(
    (material: string) => {
      onFilterChange({
        ...filters,
        materials: [...filters.materials, material],
      });
    },
    [filters, onFilterChange],
  );

  return (
    <ProductList
      products={products}
      filters={filters}
      filterMetadata={filterMetadata}
      isFetchingProducts={isFetchingProducts}
      isFilterOpen={isFilterOpen}
      hasNextProductsPage={hasNextProductsPage}
      fetchNextProductsPageRef={fetchNextProductsPageRef}
      onSearchChange={onSearchChange}
      onFilterOpen={onFilterOpen}
      onFilterClose={onFilterClose}
      onSortChange={onSortChange}
      onFilterClear={onFilterClear}
      onCategoryToggle={onCategoryToggle}
      onMaterialToggle={onMaterialToggle}
      onPriceRangeChange={onPriceRangeChange}
    />
  );
}
