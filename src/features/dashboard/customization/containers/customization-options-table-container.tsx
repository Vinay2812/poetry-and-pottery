"use client";

import {
  deleteCustomizationOption,
  toggleCustomizationOptionActive,
} from "@/data/admin/customization/gateway/server";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";

import { CustomizationOptionsTable } from "../components/customization-options-table";
import type { CustomizationOptionsTableContainerProps } from "../types";
import { buildCustomizationOptionsTableViewModel } from "../types";

export function CustomizationOptionsTableContainer({
  data,
  categories,
  types,
}: CustomizationOptionsTableContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const viewModel = useMemo(
    () =>
      buildCustomizationOptionsTableViewModel(
        data,
        search,
        searchParams.get("category") || "ALL",
        searchParams.get("type") || "ALL",
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
        router.push(`/dashboard/customization?${params.toString()}`);
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
        router.push(`/dashboard/customization?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  const handleTypeFilter = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "ALL") {
        params.set("type", value);
      } else {
        params.delete("type");
      }
      params.set("page", "1");
      startTransition(() => {
        router.push(`/dashboard/customization?${params.toString()}`);
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
        router.push(`/dashboard/customization?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      startTransition(() => {
        router.push(`/dashboard/customization?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  const handleToggleActive = useCallback(
    (optionId: number) => {
      startTransition(async () => {
        const result = await toggleCustomizationOptionActive(optionId);
        if (!result.success) {
          console.error("Failed to toggle option status:", result.error);
        }
        router.refresh();
      });
    },
    [router],
  );

  const handleDelete = useCallback(
    (optionId: number) => {
      if (
        !confirm("Are you sure you want to delete this customization option?")
      ) {
        return;
      }

      startTransition(async () => {
        const result = await deleteCustomizationOption(optionId);
        if (!result.success) {
          console.error("Failed to delete option:", result.error);
        }
        router.refresh();
      });
    },
    [router],
  );

  return (
    <CustomizationOptionsTable
      viewModel={viewModel}
      categories={categories}
      types={types}
      isPending={isPending}
      onSearch={handleSearch}
      onCategoryFilter={handleCategoryFilter}
      onTypeFilter={handleTypeFilter}
      onActiveFilter={handleActiveFilter}
      onPageChange={handlePageChange}
      onToggleActive={handleToggleActive}
      onDelete={handleDelete}
    />
  );
}
