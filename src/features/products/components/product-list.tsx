"use client";

import { Search } from "lucide-react";

import { ProductCard } from "@/components/cards";
import { EmptyState } from "@/components/sections";
import {
  FilterSidebar,
  ListingPageHeader,
  SearchInput,
  StaggeredGrid,
} from "@/components/shared";

import { ProductOrderBy } from "@/graphql/generated/types";

import { Filters } from "../hooks/use-products-filter-v2";
import { useProductsV2 } from "../hooks/use-products-v2";
import { DesktopSearchSort } from "./desktop-search-sort";
import { InfiniteScrollTrigger } from "./infinite-scroll-trigger";
import { MobileFilterBar } from "./mobile-filter-bar";
import { MobileFilterOverlay } from "./mobile-filter-overlay";
import { ProductArchiveTabs } from "./product-archive-tabs";

export type UseProductsV2Props = ReturnType<typeof useProductsV2>;

type ProductListProps = {
  products: UseProductsV2Props["products"];
  filters: Filters;
  filterMetadata: UseProductsV2Props["filterMetadata"];
  isFetchingProducts: boolean;
  isFilterOpen: boolean;
  hasNextProductsPage: boolean;
  activeProductsCount: number;
  archivedProductsCount: number;
  fetchNextProductsPageRef: UseProductsV2Props["fetchNextProductsPageRef"];
  onSearchChange: (search: string) => void;
  onFilterOpen: () => void;
  onFilterClose: () => void;
  onSortChange: (sort: ProductOrderBy) => void;
  onFilterClear: () => void;
  onPriceRangeChange: (value: [number, number]) => void;
  onCategoryToggle: (category: string) => void;
  onMaterialToggle: (material: string) => void;
  onCollectionToggle: (collectionId: number) => void;
  onArchiveToggle: (archive: boolean) => void;
};

export function ProductList({
  products,
  filters,
  filterMetadata,
  isFetchingProducts,
  isFilterOpen,
  hasNextProductsPage,
  activeProductsCount,
  archivedProductsCount,
  fetchNextProductsPageRef,
  onSearchChange,
  onFilterOpen,
  onSortChange,
  onFilterClose,
  onFilterClear,
  onPriceRangeChange,
  onCategoryToggle,
  onMaterialToggle,
  onCollectionToggle,
  onArchiveToggle,
}: ProductListProps) {
  const activeFilterCount =
    filters.categories.length +
    filters.materials.length +
    filters.collection_ids.length;

  const totalProducts = filterMetadata.total_products;
  const isArchiveView = filters.archive;

  return (
    <>
      {/* Search Bar - Mobile */}
      <div className="px-4 pb-2 lg:hidden">
        <SearchInput
          value={filters.search}
          onChange={onSearchChange}
          placeholder="Search products..."
          className="mt-2 flex w-full items-center justify-center"
        />
      </div>

      {/* Mobile Filter Bar */}
      <MobileFilterBar
        sort={filters.sort}
        activeFilterCount={activeFilterCount}
        isFetching={isFetchingProducts}
        onFilterOpen={onFilterOpen}
        onSortChange={onSortChange}
      />

      {/* Mobile Full-Screen Filter Overlay */}
      {isFilterOpen && (
        <MobileFilterOverlay
          filters={filters}
          filterMetadata={filterMetadata}
          totalProducts={totalProducts}
          onFilterClose={onFilterClose}
          onFilterClear={onFilterClear}
          onPriceRangeChange={onPriceRangeChange}
          onCategoryToggle={onCategoryToggle}
          onMaterialToggle={onMaterialToggle}
          onCollectionToggle={onCollectionToggle}
        />
      )}

      <div className="container mx-auto px-4 py-0 lg:px-8">
        <ListingPageHeader
          title={isArchiveView ? "Archive" : "Our Collection"}
          subtitle={
            isArchiveView
              ? `Browse ${totalProducts} archived items from past collections.`
              : `Discover ${totalProducts} handcrafted ceramic pieces, each uniquely made by artisan potters.`
          }
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Shop", href: isArchiveView ? "/products" : undefined },
            ...(isArchiveView ? [{ label: "Archive" }] : []),
          ]}
        />

        {/* Archive Tabs */}
        <ProductArchiveTabs
          isArchiveView={isArchiveView}
          activeProductsCount={activeProductsCount}
          archivedProductsCount={archivedProductsCount}
          onArchiveToggle={onArchiveToggle}
        />

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="lg:sticky lg:top-24 lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto lg:pr-6">
              <FilterSidebar
                filters={filters}
                filterMetadata={filterMetadata}
                filtersClassName="px-0"
                onFilterClear={onFilterClear}
                onPriceRangeChange={onPriceRangeChange}
                onCategoryToggle={onCategoryToggle}
                onMaterialToggle={onMaterialToggle}
                onCollectionToggle={onCollectionToggle}
              />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Desktop Search and Sort */}
            <DesktopSearchSort
              search={filters.search}
              sort={filters.sort}
              isFetching={isFetchingProducts}
              onSearchChange={onSearchChange}
              onSortChange={onSortChange}
            />

            {products.length > 0 ? (
              <>
                <StaggeredGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={`${product.id}-${product.page}`}
                      product={product}
                      isArchiveView={isArchiveView}
                    />
                  ))}
                </StaggeredGrid>

                {/* Infinite scroll trigger */}
                <InfiniteScrollTrigger
                  triggerRef={fetchNextProductsPageRef}
                  isFetching={isFetchingProducts}
                  hasNextPage={hasNextProductsPage}
                  itemCount={products.length}
                  totalCount={totalProducts}
                />
              </>
            ) : (
              <EmptyState
                icon={Search}
                title="No products found"
                description="No products found matching your filters."
                actionText="Clear Filters"
                onAction={onFilterClear}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
