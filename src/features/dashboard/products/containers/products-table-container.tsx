"use client";

import {
  deleteProduct,
  toggleProductActive,
} from "@/data/admin/products/gateway/server";
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
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const viewModel = useMemo(
    () =>
      buildProductsTableViewModel(
        data,
        search,
        searchParams.get("category") || "ALL",
        searchParams.get("collection") || "ALL",
        searchParams.get("status") || "ALL",
      ),
    [data, search, searchParams],
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      startTransition(() => {
        router.push(`/dashboard/products?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  const handleCategoryFilter = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "ALL") {
        params.set("category", value);
      } else {
        params.delete("category");
      }
      params.set("page", "1");
      startTransition(() => {
        router.push(`/dashboard/products?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  const handleCollectionFilter = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "ALL") {
        params.set("collection", value);
      } else {
        params.delete("collection");
      }
      params.set("page", "1");
      startTransition(() => {
        router.push(`/dashboard/products?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  const handleActiveFilter = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "ALL") {
        params.set("status", value);
      } else {
        params.delete("status");
      }
      params.set("page", "1");
      startTransition(() => {
        router.push(`/dashboard/products?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      startTransition(() => {
        router.push(`/dashboard/products?${params.toString()}`);
      });
    },
    [router, searchParams],
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
      onPageChange={handlePageChange}
      onToggleActive={handleToggleActive}
      onDelete={handleDelete}
    />
  );
}
