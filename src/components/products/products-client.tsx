"use client";

import { getProducts } from "@/actions";
import type { ProductFilterParams, ProductWithCategories } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2, Search, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useCallback, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { ProductCard } from "@/components/cards";
import { EmptyState } from "@/components/sections";
import { CategoryPill, FilterSidebar } from "@/components/shared";
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

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

interface Category {
  id: string;
  name: string;
}

interface ProductsClientProps {
  products: ProductWithCategories[];
  categories: Category[];
  materials: string[];
  totalProducts: number;
}

const PRODUCTS_PER_PAGE = 12;

export function ProductsClient({
  products: initialProducts,
  categories,
  materials,
  totalProducts,
}: ProductsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read filter state from URL params
  const activeCategory = searchParams.get("category") || "all";
  const selectedMaterials = useMemo(() => {
    const mats = searchParams.get("materials");
    return mats ? mats.split(",") : [];
  }, [searchParams]);
  const sortBy = searchParams.get("sort") || "featured";

  // Build filter params for query
  const filterParams: ProductFilterParams = useMemo(
    () => ({
      category: activeCategory === "all" ? undefined : activeCategory,
      materials: selectedMaterials.length > 0 ? selectedMaterials : undefined,
      sortBy: sortBy as ProductFilterParams["sortBy"],
      limit: PRODUCTS_PER_PAGE,
    }),
    [activeCategory, selectedMaterials, sortBy],
  );

  // Infinite query for products
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products", filterParams],
      queryFn: async ({ pageParam = 1 }) => {
        return getProducts({ ...filterParams, page: pageParam });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      initialData: {
        pages: [
          {
            data: initialProducts,
            total: totalProducts,
            page: 1,
            totalPages: Math.ceil(totalProducts / PRODUCTS_PER_PAGE),
            categories: categories.map((c) => c.id),
            materials,
          },
        ],
        pageParams: [1],
      },
    });

  // Intersection observer for auto-loading
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  // Auto-fetch next page when scrolling near bottom
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all pages into single products array and deduplicate by id
  const products = useMemo(() => {
    const allProducts = data?.pages.flatMap((page) => page.data) ?? [];
    const seen = new Set<number>();
    return allProducts.filter((product) => {
      if (seen.has(product.id)) {
        return false;
      }
      seen.add(product.id);
      return true;
    });
  }, [data]);

  const currentTotal = data?.pages[0]?.total ?? totalProducts;

  // Update URL params without full page reload
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === "all") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      startTransition(() => {
        router.push(`/products?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams],
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      updateParams({ category: category === "all" ? null : category });
    },
    [updateParams],
  );

  const handleMaterialToggle = useCallback(
    (material: string) => {
      const newMaterials = selectedMaterials.includes(material)
        ? selectedMaterials.filter((m) => m !== material)
        : [...selectedMaterials, material];

      updateParams({
        materials: newMaterials.length > 0 ? newMaterials.join(",") : null,
      });
    },
    [selectedMaterials, updateParams],
  );

  const handleSortChange = useCallback(
    (sort: string) => {
      updateParams({ sort: sort === "featured" ? null : sort });
    },
    [updateParams],
  );

  const clearFilters = useCallback(() => {
    startTransition(() => {
      router.push("/products", { scroll: false });
    });
  }, [router]);

  return (
    <>
      {/* Mobile Category Pills */}
      <div className="scrollbar-hide border-border/50 flex gap-2 overflow-x-auto border-b px-4 py-3 lg:hidden">
        <CategoryPill
          label="All"
          isActive={activeCategory === "all"}
          onClick={() => handleCategoryChange("all")}
        />
        {categories.map((category) => (
          <CategoryPill
            key={category.id}
            label={category.name}
            isActive={activeCategory === category.id}
            onClick={() => handleCategoryChange(category.id)}
          />
        ))}
      </div>

      {/* Mobile Filter Bar */}
      <div className="bg-background sticky top-14 z-40 flex items-center gap-2 px-4 py-3 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 rounded-full">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader className="px-6 pt-6">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-2 px-6 pb-6">
              <FilterSidebar
                activeCategory={activeCategory}
                selectedMaterials={selectedMaterials}
                categories={categories}
                materials={materials}
                onCategoryChange={handleCategoryChange}
                onMaterialToggle={handleMaterialToggle}
              />
            </div>
          </SheetContent>
        </Sheet>

        <Select value={sortBy} onValueChange={handleSortChange}>
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

      <div className="container mx-auto px-4 py-2 lg:px-8 lg:py-6">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-20">
              <h2 className="mb-6 text-xl font-semibold">Filters</h2>
              <FilterSidebar
                activeCategory={activeCategory}
                selectedMaterials={selectedMaterials}
                categories={categories}
                materials={materials}
                onCategoryChange={handleCategoryChange}
                onMaterialToggle={handleMaterialToggle}
              />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Desktop Sort */}
            <div className="mb-6 hidden items-center justify-between lg:flex">
              <p className="text-muted-foreground text-sm">
                {currentTotal} products
              </p>
              <Select value={sortBy} onValueChange={handleSortChange}>
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

            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-x-3 gap-y-6 lg:grid-cols-3 lg:gap-4">
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
                      You&apos;ve seen all {currentTotal} products
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
                onAction={clearFilters}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
