"use client";

import {
  deleteCustomizationOption,
  toggleCustomizationOptionActive,
} from "@/data/admin/customization/gateway/server";
import { useURLFilterHandlers } from "@/hooks/use-url-filter-handlers";
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
  const [, startTransition] = useTransition();

  const {
    createFilterHandler,
    createSearchHandler,
    handlePageChange,
    isPending,
  } = useURLFilterHandlers({
    basePath: "/dashboard/customization",
  });

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const handleSearch = createSearchHandler(setSearch);
  const handleCategoryFilter = createFilterHandler("category");
  const handleTypeFilter = createFilterHandler("type");
  const handleActiveFilter = createFilterHandler("status");

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
