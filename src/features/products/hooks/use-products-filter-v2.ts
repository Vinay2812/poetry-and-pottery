import { getProductsOrderBy } from "@/data/products/types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";

import { ProductOrderBy, ProductsResponse } from "@/graphql/generated/types";

export type Filters = {
  categories: string[];
  materials: string[];
  sort: ProductOrderBy;
  search: string;
  min_price: number;
  max_price: number;
};

export function useProductsFilterV2({
  productsWithFiltersAndMetadata,
}: {
  productsWithFiltersAndMetadata: ProductsResponse;
}) {
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState(() => {
    const selectedCategories =
      searchParams.get("categories")?.split(",") ??
      productsWithFiltersAndMetadata.filter.categories ??
      [];
    const selectedMaterials =
      searchParams.get("materials")?.split(",") ??
      productsWithFiltersAndMetadata.filter.materials ??
      [];
    const sortBy: ProductOrderBy = getProductsOrderBy(searchParams.get("sort"));
    const searchQuery =
      searchParams.get("search") ??
      productsWithFiltersAndMetadata.filter.search ??
      "";
    const minPriceParam =
      searchParams.get("min_price") ??
      productsWithFiltersAndMetadata.filter.min_price ??
      productsWithFiltersAndMetadata.meta.price_range.min;
    const maxPriceParam =
      searchParams.get("max_price") ??
      productsWithFiltersAndMetadata.filter.max_price ??
      productsWithFiltersAndMetadata.meta.price_range.max;

    return {
      categories: selectedCategories,
      materials: selectedMaterials,
      sort: sortBy,
      search: searchQuery,
      min_price: parseInt(minPriceParam.toString()),
      max_price: parseInt(maxPriceParam.toString()),
    };
  });

  const filters_meta = useMemo(() => {
    return {
      categories: productsWithFiltersAndMetadata.meta.categories,
      materials: productsWithFiltersAndMetadata.meta.materials,
      price_range: productsWithFiltersAndMetadata.meta.price_range,
      price_histogram: productsWithFiltersAndMetadata.meta.price_histogram,
    };
  }, [productsWithFiltersAndMetadata]);

  const onFilterChange = useCallback(
    (filter: Partial<Filters>) => {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(filter).forEach(([key, value]) => {
        if (
          value === undefined ||
          !value ||
          (Array.isArray(value) && value.length === 0)
        ) {
          newParams.delete(key);
          setFilters((prev) => ({
            ...prev,
            [key]: value,
          }));
        } else {
          newParams.set(
            key,
            Array.isArray(value) ? value.join(",") : value.toString(),
          );
          setFilters((prev) => ({
            ...prev,
            [key]: value,
          }));
        }
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      router.replace(`/products?${newParams.toString()}`, { scroll: false });
    },
    [searchParams, router, queryClient],
  );

  const onFilterClear = useCallback(() => {
    startTransition(() => {
      router.replace("/products", { scroll: false });
      setFilters({
        categories: [],
        materials: [],
        sort: ProductOrderBy.Featured,
        search: "",
        min_price: productsWithFiltersAndMetadata.meta.price_range.min,
        max_price: productsWithFiltersAndMetadata.meta.price_range.max,
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    });
  }, [router, productsWithFiltersAndMetadata.meta.price_range, queryClient]);

  return {
    filters,
    filters_meta,
    onFilterChange,
    onFilterClear,
  };
}
