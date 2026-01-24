"use client";

import { Loader2, Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

import { ProductCard } from "@/components/cards";
import { EmptyState } from "@/components/sections";
import {
  FilterSidebar,
  ListingPageHeader,
  SearchInput,
} from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { type ProductListProps, SORT_OPTIONS } from "../types";

const PRODUCTS_PER_PAGE = 12;

export function ProductList({
  viewModel,
  loadMoreRef,
  onCategoryToggle,
  onMaterialToggle,
  onPriceChange,
  onPriceCommit,
  onSortChange,
  onSearchChange,
  onClearFilters,
}: ProductListProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    products,
    totalProducts,
    hasNextPage,
    isFetchingNextPage,
    filterState,
    categories,
    materials,
    priceRange,
    priceHistogram,
  } = viewModel;

  const {
    selectedCategories,
    selectedMaterials,
    sortBy,
    localPriceRange,
    searchQuery,
  } = filterState;

  const activeFilterCount =
    selectedCategories.length + selectedMaterials.length;

  return (
    <>
      {/* Search Bar - Mobile */}
      <div className="px-4 pb-2 lg:hidden">
        <SearchInput
          value={searchQuery}
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
          onClick={() => setIsFilterOpen(true)}
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filter
          {activeFilterCount > 0 && (
            <span className="bg-primary ml-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold text-white">
              {activeFilterCount}
            </span>
          )}
        </Button>

        <Select value={sortBy} onValueChange={onSortChange}>
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
      </div>

      {/* Mobile Full-Screen Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden dark:bg-neutral-950">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 dark:border-neutral-800">
            <h2 className="font-display text-lg font-bold">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200 dark:bg-neutral-800"
            >
              <X className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <FilterSidebar
              selectedCategories={selectedCategories}
              selectedMaterials={selectedMaterials}
              categories={categories}
              materials={materials}
              onCategoryToggle={onCategoryToggle}
              onMaterialToggle={onMaterialToggle}
              onClear={onClearFilters}
              priceRange={priceRange}
              selectedPriceRange={localPriceRange}
              onPriceChange={onPriceChange}
              onPriceChangeCommit={onPriceCommit}
              priceHistogram={priceHistogram}
              filtersClassName="hidden"
            />
          </div>

          {/* Footer */}
          <div className="flex gap-3 border-t border-neutral-100 px-5 py-4 dark:border-neutral-800">
            <Button
              variant="secondary"
              className="flex-1 rounded-xl"
              onClick={() => {
                onClearFilters();
              }}
            >
              Reset
            </Button>
            <Button
              className="shadow-primary/20 flex-2 rounded-xl shadow-lg"
              onClick={() => setIsFilterOpen(false)}
            >
              Show {totalProducts} Products
            </Button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-0 lg:px-8">
        <ListingPageHeader
          title="Our Collection"
          subtitle={`Discover ${totalProducts} handcrafted ceramic pieces, each uniquely made by artisan potters.`}
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
        />
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <FilterSidebar
              selectedCategories={selectedCategories}
              selectedMaterials={selectedMaterials}
              categories={categories}
              materials={materials}
              onCategoryToggle={onCategoryToggle}
              onMaterialToggle={onMaterialToggle}
              onClear={onClearFilters}
              priceRange={priceRange}
              selectedPriceRange={localPriceRange}
              onPriceChange={onPriceChange}
              onPriceChangeCommit={onPriceCommit}
              priceHistogram={priceHistogram}
              filtersClassName="px-0"
              className="max-h-[calc(100vh-10rem)] overflow-y-auto pr-6"
            />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Desktop Search and Sort */}
            <div className="mb-6 hidden flex-col gap-4 lg:flex">
              <SearchInput
                value={searchQuery}
                onChange={onSearchChange}
                placeholder="Search products..."
                className="w-full max-w-md"
              />
              <div className="flex items-center justify-end">
                <Select value={sortBy} onValueChange={onSortChange}>
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
              <div className="max-h-[calc(100vh-10rem)] overflow-y-auto">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Infinite scroll trigger */}
                <div
                  ref={loadMoreRef}
                  className="mt-8 mb-4 flex justify-center"
                >
                  {isFetchingNextPage && (
                    <div className="text-muted-foreground flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="text-sm">Loading more products...</span>
                    </div>
                  )}
                  {!hasNextPage && products.length >= PRODUCTS_PER_PAGE && (
                    <p className="text-muted-foreground text-sm">
                      You&apos;ve seen all {totalProducts} products
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <EmptyState
                icon={Search}
                title="No products found"
                description="No products found matching your filters."
                actionText="Clear Filters"
                onAction={onClearFilters}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
