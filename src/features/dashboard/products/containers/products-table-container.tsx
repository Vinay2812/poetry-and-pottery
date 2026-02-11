"use client";

import {
  deleteProduct,
  toggleProductActive,
} from "@/data/admin/products/gateway/server";
import { useURLFilterHandlers } from "@/hooks/use-url-filter-handlers";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";

import { ProductsTable } from "../components/products-table";
import type { ProductsTableContainerProps } from "../types";
import { buildProductsTableViewModel } from "../types";

export function ProductsTableContainer({
  data,
  categories,
  collections,
}: ProductsTableContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const {
    createFilterHandler,
    createSearchHandler,
    handlePageChange,
    isPending,
  } = useURLFilterHandlers({
    basePath: "/dashboard/products",
  });

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const handleSearch = createSearchHandler(setSearch);
  const handleCategoryFilter = createFilterHandler("category");
  const handleCollectionFilter = createFilterHandler("collection");
  const handleActiveFilter = createFilterHandler("status");
  const handleStockFilter = createFilterHandler("stock");

  const viewModel = useMemo(
    () =>
      buildProductsTableViewModel(
        data,
        search,
        searchParams.get("category") || "ALL",
        searchParams.get("collection") || "ALL",
        searchParams.get("status") || "ALL",
        searchParams.get("stock") || "ALL",
      ),
    [data, search, searchParams],
  );

  const handleToggleActive = useCallback(
    (productId: number) => {
      startTransition(async () => {
        const result = await toggleProductActive(productId);
        if (!result.success) {
          console.error("Failed to toggle product status:", result.error);
        }
        router.refresh();
      });
    },
    [router],
  );

  const handleDelete = useCallback(
    (productId: number) => {
      if (!confirm("Are you sure you want to delete this product?")) {
        return;
      }

      startTransition(async () => {
        const result = await deleteProduct(productId);
        if (!result.success) {
          console.error("Failed to delete product:", result.error);
        } else if (result.error) {
          alert(result.error);
        }
        router.refresh();
      });
    },
    [router],
  );

  return (
    <ProductsTable
      viewModel={viewModel}
      categories={categories}
      collections={collections}
      isPending={isPending}
      onSearch={handleSearch}
      onCategoryFilter={handleCategoryFilter}
      onCollectionFilter={handleCollectionFilter}
      onActiveFilter={handleActiveFilter}
      onStockFilter={handleStockFilter}
      onPageChange={handlePageChange}
      onToggleActive={handleToggleActive}
      onDelete={handleDelete}
    />
  );
}
