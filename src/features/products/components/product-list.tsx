"use client";

import { Loader2, Search, SlidersHorizontal } from "lucide-react";

import { ProductCard } from "@/components/cards";
import { EmptyState } from "@/components/sections";
import { FilterSidebar, SearchInput } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { type ProductListProps, SORT_OPTIONS } from "../types";

const PRODUCTS_PER_PAGE = 12;

export function ProductList({
  viewModel,
  loadMoreRef,
  onCategoryChange,
  onMaterialToggle,
  onPriceChange,
  onPriceCommit,
  onSortChange,
  onSearchChange,
  onClearFilters,
}: ProductListProps) {
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
    activeCategory,
    selectedMaterials,
    sortBy,
    localPriceRange,
    searchQuery,
  } = filterState;

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
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 rounded-full">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader className="hidden px-6 py-4 pb-0">
              <SheetTitle className="sr-only">Filters</SheetTitle>
            </SheetHeader>

            <div className="mt-0 h-[calc(100vh-4rem)] space-y-0 overflow-y-auto px-6">
              <FilterSidebar
                activeCategory={activeCategory}
                selectedMaterials={selectedMaterials}
                categories={categories}
                materials={materials}
                onCategoryChange={onCategoryChange}
                onMaterialToggle={onMaterialToggle}
                onClear={onClearFilters}
                priceRange={priceRange}
                selectedPriceRange={localPriceRange}
                onPriceChange={onPriceChange}
                onPriceChangeCommit={onPriceCommit}
                priceHistogram={priceHistogram}
                className="mt-0 space-y-0"
                filtersClassName="pr-8 pl-6"
              />
            </div>
          </SheetContent>
        </Sheet>

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

      <div className="container mx-auto px-4 py-0 lg:px-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <FilterSidebar
              activeCategory={activeCategory}
              selectedMaterials={selectedMaterials}
              categories={categories}
              materials={materials}
              onCategoryChange={onCategoryChange}
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
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">
                  {totalProducts} products
                </p>
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
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
