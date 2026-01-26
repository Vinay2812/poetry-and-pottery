"use client";

import type { ProductsFilterParams } from "@/data/products/types";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

const PRODUCTS_PER_PAGE = 12;

function mapSortToOrderBy(
  sort: string,
): ProductsFilterParams["order_by"] | undefined {
  switch (sort) {
    case "price-low":
      return "price_low_to_high";
    case "price-high":
      return "price_high_to_low";
    case "newest":
      return "new";
    case "best-sellers":
      return "best_sellers";
    case "featured":
    default:
      return "featured";
  }
}

interface UseProductFiltersOptions {
  priceRange?: { min: number; max: number };
}

export function useProductFilters(options: UseProductFiltersOptions = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { priceRange } = options;

  const {
    selectedCategories,
    selectedMaterials,
    sortBy,
    searchQuery,
    minPriceParam,
    maxPriceParam,
  } = useMemo(() => {
    return {
      selectedCategories: searchParams.get("categories")?.split(",") || [],
      selectedMaterials: searchParams.get("materials")?.split(",") || [],
      sortBy: searchParams.get("sort") || "featured",
      searchQuery: searchParams.get("search") || "",
      minPriceParam: searchParams.get("minPrice"),
      maxPriceParam: searchParams.get("maxPrice"),
    };
  }, [searchParams]);

  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    minPriceParam ? parseInt(minPriceParam) : (priceRange?.min ?? 0),
    maxPriceParam ? parseInt(maxPriceParam) : (priceRange?.max ?? 1000),
  ]);

  useEffect(() => {
    const min = minPriceParam
      ? parseInt(minPriceParam)
      : (priceRange?.min ?? 0);
    const max = maxPriceParam
      ? parseInt(maxPriceParam)
      : (priceRange?.max ?? 1000);
    startTransition(() => {
      setLocalPriceRange([min, max]);
    });
  }, [minPriceParam, maxPriceParam, priceRange]);

  const filterParams: ProductsFilterParams = useMemo(
    () => ({
      categories:
        selectedCategories.length > 0 ? selectedCategories : undefined,
      materials: selectedMaterials.length > 0 ? selectedMaterials : undefined,
      order_by: mapSortToOrderBy(sortBy),
      limit: PRODUCTS_PER_PAGE,
      min_price: minPriceParam ? parseInt(minPriceParam) : undefined,
      max_price: maxPriceParam ? parseInt(maxPriceParam) : undefined,
      search: searchQuery || undefined,
    }),
    [
      selectedCategories,
      selectedMaterials,
      sortBy,
      minPriceParam,
      maxPriceParam,
      searchQuery,
    ],
  );

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

  const handleCategoryToggle = useCallback(
    (category: string) => {
      const newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];

      updateParams({
        categories: newCategories.length > 0 ? newCategories.join(",") : null,
      });
    },
    [selectedCategories, updateParams],
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

  const handlePriceChange = useCallback((range: [number, number]) => {
    setLocalPriceRange(range);
  }, []);

  const handlePriceCommit = useCallback(
    (range: [number, number]) => {
      updateParams({
        minPrice: range[0].toString(),
        maxPrice: range[1].toString(),
      });
    },
    [updateParams],
  );

  const handleSortChange = useCallback(
    (sort: string) => {
      updateParams({ sort: sort === "featured" ? null : sort });
    },
    [updateParams],
  );

  const handleSearchChange = useCallback(
    (query: string) => {
      updateParams({ search: query || null });
    },
    [updateParams],
  );

  const clearFilters = useCallback(() => {
    // Reset local state first to feel responsive
    if (priceRange) {
      setLocalPriceRange([priceRange.min, priceRange.max]);
    }
    startTransition(() => {
      router.push("/products", { scroll: false });
    });
  }, [router, priceRange]);

  return {
    // Filter state
    selectedCategories,
    selectedMaterials,
    sortBy,
    localPriceRange,
    searchQuery,
    filterParams,
    isPending,
    // Handlers
    onCategoryToggle: handleCategoryToggle,
    onMaterialToggle: handleMaterialToggle,
    onPriceChange: handlePriceChange,
    onPriceCommit: handlePriceCommit,
    onSortChange: handleSortChange,
    onSearchChange: handleSearchChange,
    onClearFilters: clearFilters,
  };
}
