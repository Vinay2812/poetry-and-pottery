"use client";

import { useURLFilterHandlers } from "@/hooks/use-url-filter-handlers";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import {
  useAdminDeleteProductMutation,
  useAdminToggleProductActiveMutation,
} from "@/graphql/generated/graphql";

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
  const [deleteProductMutation, { loading: deleteLoading }] =
    useAdminDeleteProductMutation();
  const [toggleProductActiveMutation, { loading: toggleLoading }] =
    useAdminToggleProductActiveMutation();

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
    async (productId: number) => {
      try {
        const { data } = await toggleProductActiveMutation({
          variables: { id: productId },
        });
        const result = data?.adminToggleProductActive;
        if (!result?.success) {
          console.error("Failed to toggle product status:", result?.error);
        }
      } catch (error) {
        console.error("Failed to toggle product status:", error);
      } finally {
        router.refresh();
      }
    },
    [router, toggleProductActiveMutation],
  );

  const handleDelete = useCallback(
    async (productId: number) => {
      if (!confirm("Are you sure you want to delete this product?")) {
        return;
      }

      try {
        const { data } = await deleteProductMutation({
          variables: { id: productId },
        });
        const result = data?.adminDeleteProduct;
        if (!result?.success) {
          console.error("Failed to delete product:", result?.error);
          if (result?.error) {
            alert(result.error);
          }
        } else if (result.error) {
          alert(result.error);
        }
      } catch (error) {
        console.error("Failed to delete product:", error);
      } finally {
        router.refresh();
      }
    },
    [deleteProductMutation, router],
  );

  return (
    <ProductsTable
      viewModel={viewModel}
      categories={categories}
      collections={collections}
      isPending={isPending || deleteLoading || toggleLoading}
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
