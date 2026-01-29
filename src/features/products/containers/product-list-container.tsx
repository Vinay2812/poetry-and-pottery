"use client";

import { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { ProductOrderBy, ProductsResponse } from "@/graphql/generated/types";

import { ProductList } from "../components/product-list";
import { useProductsV2 } from "../hooks/use-products-v2";

interface ProductListContainerProps {
  productsWithFiltersAndMetadata: ProductsResponse;
  activeProductsCount?: number;
  archivedProductsCount?: number;
}

export function ProductListContainer({
  productsWithFiltersAndMetadata,
  activeProductsCount = 0,
  archivedProductsCount = 0,
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
      const newCategories = filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category];
      onFilterChange({
        ...filters,
        categories: newCategories,
      });
    },
    [filters, onFilterChange],
  );

  const onMaterialToggle = useCallback(
    (material: string) => {
      const newMaterials = filters.materials.includes(material)
        ? filters.materials.filter((m) => m !== material)
        : [...filters.materials, material];
      onFilterChange({
        ...filters,
        materials: newMaterials,
      });
    },
    [filters, onFilterChange],
  );

  const onCollectionToggle = useCallback(
    (collectionId: number) => {
      const newCollectionIds = filters.collection_ids.includes(collectionId)
        ? filters.collection_ids.filter((id) => id !== collectionId)
        : [...filters.collection_ids, collectionId];
      onFilterChange({
        ...filters,
        collection_ids: newCollectionIds,
      });
    },
    [filters, onFilterChange],
  );

  const onArchiveToggle = useCallback(
    (archive: boolean) => {
      onFilterChange({
        ...filters,
        archive,
      });
    },
    [filters, onFilterChange],
  );

  // Calculate display counts - use current total when in that view
  const displayActiveCount = filters.archive
    ? activeProductsCount
    : filterMetadata.total_products;
  const displayArchivedCount = filters.archive
    ? filterMetadata.total_products
    : archivedProductsCount;

  return (
    <ProductList
      products={products}
      filters={filters}
      filterMetadata={filterMetadata}
      isFetchingProducts={isFetchingProducts}
      isFilterOpen={isFilterOpen}
      hasNextProductsPage={hasNextProductsPage}
      activeProductsCount={displayActiveCount}
      archivedProductsCount={displayArchivedCount}
      fetchNextProductsPageRef={fetchNextProductsPageRef}
      onSearchChange={onSearchChange}
      onFilterOpen={onFilterOpen}
      onFilterClose={onFilterClose}
      onSortChange={onSortChange}
      onFilterClear={onFilterClear}
      onCategoryToggle={onCategoryToggle}
      onMaterialToggle={onMaterialToggle}
      onCollectionToggle={onCollectionToggle}
      onArchiveToggle={onArchiveToggle}
      onPriceRangeChange={onPriceRangeChange}
    />
  );
}
