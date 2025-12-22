"use client";

import type { ProductFilterParams } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const PRODUCTS_PER_PAGE = 12;

interface UseProductFiltersOptions {
  priceRange?: { min: number; max: number };
}

export function useProductFilters(options: UseProductFiltersOptions = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { priceRange } = options;

  // Read filter state from URL params
  const activeCategory = searchParams.get("category") || "all";
  const selectedMaterials = useMemo(() => {
    const mats = searchParams.get("materials");
    return mats ? mats.split(",") : [];
  }, [searchParams]);
  const sortBy = searchParams.get("sort") || "featured";

  // Price state from URL
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");

  // Local price range state (for slider dragging)
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    minPriceParam ? parseInt(minPriceParam) : (priceRange?.min ?? 0),
    maxPriceParam ? parseInt(maxPriceParam) : (priceRange?.max ?? 1000),
  ]);

  // Sync state when URL params change (e.g. clear filters)
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

  // Build filter params for query
  const filterParams: ProductFilterParams = useMemo(
    () => ({
      category: activeCategory === "all" ? undefined : activeCategory,
      materials: selectedMaterials.length > 0 ? selectedMaterials : undefined,
      sortBy: sortBy as ProductFilterParams["sortBy"],
      limit: PRODUCTS_PER_PAGE,
      minPrice: minPriceParam ? parseInt(minPriceParam) : undefined,
      maxPrice: maxPriceParam ? parseInt(maxPriceParam) : undefined,
    }),
    [activeCategory, selectedMaterials, sortBy, minPriceParam, maxPriceParam],
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
    activeCategory,
    selectedMaterials,
    sortBy,
    localPriceRange,
    filterParams,
    // Handlers
    onCategoryChange: handleCategoryChange,
    onMaterialToggle: handleMaterialToggle,
    onPriceChange: handlePriceChange,
    onPriceCommit: handlePriceCommit,
    onSortChange: handleSortChange,
    onClearFilters: clearFilters,
  };
}
