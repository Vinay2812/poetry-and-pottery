import { getProductsOrderBy } from "@/data/products/types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";

import {
  CollectionBase,
  ProductOrderBy,
  ProductsResponse,
} from "@/graphql/generated/types";

export type Filters = {
  categories: string[];
  materials: string[];
  collection_ids: number[];
  sort: ProductOrderBy;
  search: string;
  min_price: number;
  max_price: number;
  archive: boolean;
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
    const selectedCollectionIds =
      searchParams
        .get("collection_ids")
        ?.split(",")
        .map((id) => parseInt(id, 10))
        .filter((id) => !isNaN(id)) ??
      productsWithFiltersAndMetadata.filter.collection_ids ??
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
    const archiveParam =
      searchParams.get("archive") === "true" ||
      productsWithFiltersAndMetadata.filter.archive === true;

    return {
      categories: selectedCategories,
      materials: selectedMaterials,
      collection_ids: selectedCollectionIds,
      sort: sortBy,
      search: searchQuery,
      min_price: parseInt(minPriceParam.toString()),
      max_price: parseInt(maxPriceParam.toString()),
      archive: archiveParam,
    };
  });

  const filters_meta = useMemo(() => {
    return {
      categories: productsWithFiltersAndMetadata.meta.categories,
      materials: productsWithFiltersAndMetadata.meta.materials,
      collections: productsWithFiltersAndMetadata.meta.collections ?? [],
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

      router.push(`/products?${newParams.toString()}`, { scroll: false });
    },
    [searchParams, router, queryClient],
  );

  const onFilterClear = useCallback(() => {
    startTransition(() => {
      // Preserve archive tab when clearing filters
      const archiveParam = filters.archive ? "?archive=true" : "";

      setFilters((prev) => ({
        categories: [],
        materials: [],
        collection_ids: [],
        sort: ProductOrderBy.Featured,
        search: "",
        min_price: productsWithFiltersAndMetadata.meta.price_range.min,
        max_price: productsWithFiltersAndMetadata.meta.price_range.max,
        archive: prev.archive, // Keep archive state
      }));

      router.push(`/products${archiveParam}`, { scroll: false });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    });
  }, [
    router,
    productsWithFiltersAndMetadata.meta.price_range,
    queryClient,
    filters.archive,
  ]);

  return {
    filters,
    filters_meta,
    onFilterChange,
    onFilterClear,
  };
}
