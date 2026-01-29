"use client";

import { DEFAULT_PAGE_SIZE } from "@/consts/performance";
import { Loader2, Search, SlidersHorizontal, X } from "lucide-react";

import { ProductCard } from "@/components/cards";
import { EmptyState } from "@/components/sections";
import {
  FilterSidebar,
  ListingPageHeader,
  SearchInput,
  StaggeredGrid,
} from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

import { ProductBase, ProductOrderBy } from "@/graphql/generated/types";

import { Filters } from "../hooks/use-products-filter-v2";
import { useProductsV2 } from "../hooks/use-products-v2";
import { SORT_OPTIONS } from "../types";

export type UseProductsV2Props = ReturnType<typeof useProductsV2>;

type ProductListProps = {
  products: ProductBase[];
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
      <div className="bg-background sticky z-40 flex items-center gap-2 overflow-y-auto px-4 pt-1 pb-3 lg:hidden">
        <Button
          variant="outline"
          size="sm"
          className="h-9 rounded-full"
          onClick={onFilterOpen}
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filter
          {activeFilterCount > 0 && (
            <span className="bg-primary ml-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold text-white">
              {activeFilterCount}
            </span>
          )}
        </Button>

        <Select value={filters.sort} onValueChange={onSortChange}>
          <SelectTrigger className="h-9 w-48 rounded-full text-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {isFetchingProducts && (
          <div className="text-muted-foreground flex items-center gap-1 text-xs">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Updating
          </div>
        )}
      </div>

      {/* Mobile Full-Screen Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden dark:bg-neutral-950">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 dark:border-neutral-800">
            <h2 className="font-display text-lg font-bold">Filters</h2>
            <button
              onClick={onFilterClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200 dark:bg-neutral-800"
            >
              <X className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <FilterSidebar
              filters={filters}
              filterMetadata={filterMetadata}
              filtersClassName="hidden"
              onFilterClear={onFilterClear}
              onPriceRangeChange={onPriceRangeChange}
              onCategoryToggle={onCategoryToggle}
              onMaterialToggle={onMaterialToggle}
              onCollectionToggle={onCollectionToggle}
            />
          </div>

          {/* Footer */}
          <div className="flex gap-3 border-t border-neutral-100 px-5 py-4 dark:border-neutral-800">
            <Button
              variant="secondary"
              className="flex-1 rounded-xl"
              onClick={onFilterClear}
            >
              Reset
            </Button>
            <Button
              className="shadow-primary/20 flex-2 rounded-xl shadow-lg"
              onClick={onFilterClose}
            >
              Show {totalProducts} Products
            </Button>
          </div>
        </div>
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
        <div className="mb-4 lg:mb-6">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onArchiveToggle(false)}
              className={cn(
                "relative flex shrink-0 items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors sm:px-4 sm:py-3",
                !isArchiveView
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="hidden sm:inline">Active Products</span>
              <span className="sm:hidden">Active</span>
              <span
                className={cn(
                  "ml-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                  !isArchiveView
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {activeProductsCount}
              </span>
              {!isArchiveView && (
                <span className="bg-primary absolute right-3 bottom-0 left-3 h-0.5 rounded-full sm:right-4 sm:left-4" />
              )}
            </button>
            <button
              onClick={() => onArchiveToggle(true)}
              className={cn(
                "relative flex shrink-0 items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors sm:px-4 sm:py-3",
                isArchiveView
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="hidden sm:inline">Archive</span>
              <span className="sm:hidden">Archive</span>
              <span
                className={cn(
                  "ml-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                  isArchiveView
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {archivedProductsCount}
              </span>
              {isArchiveView && (
                <span className="bg-primary absolute right-3 bottom-0 left-3 h-0.5 rounded-full sm:right-4 sm:left-4" />
              )}
            </button>
          </div>
          <div className="border-border border-b" />
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="lg:top-24 lg:pr-6">
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
            <div className="mb-6 hidden flex-col gap-4 lg:flex">
              <SearchInput
                value={filters.search}
                onChange={onSearchChange}
                placeholder="Search products..."
                className="w-full max-w-md"
              />
              <div className="flex items-center justify-end gap-3">
                {isFetchingProducts && (
                  <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating results...
                  </div>
                )}
                <Select value={filters.sort} onValueChange={onSortChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {products.length > 0 ? (
              <>
                <StaggeredGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isArchiveView={isArchiveView}
                    />
                  ))}
                </StaggeredGrid>

                {/* Infinite scroll trigger */}
                <div
                  ref={fetchNextProductsPageRef}
                  className="mt-8 mb-4 flex justify-center"
                >
                  {isFetchingProducts && (
                    <div className="text-muted-foreground flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="text-sm">Loading more products...</span>
                    </div>
                  )}
                  {!hasNextProductsPage &&
                    products.length >= DEFAULT_PAGE_SIZE && (
                      <p className="text-muted-foreground text-sm">
                        You&apos;ve seen all {totalProducts} products
                      </p>
                    )}
                </div>
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
