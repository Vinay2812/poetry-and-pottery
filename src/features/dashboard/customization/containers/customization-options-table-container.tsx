"use client";

import { useURLFilterHandlers } from "@/hooks/use-url-filter-handlers";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";

import {
  useAdminDeleteCustomizationOptionMutation,
  useAdminToggleCustomizationOptionActiveMutation,
} from "@/graphql/generated/graphql";

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
  const [deleteCustomizationOptionMutation, { loading: deleteLoading }] =
    useAdminDeleteCustomizationOptionMutation();
  const [toggleCustomizationOptionActiveMutation, { loading: toggleLoading }] =
    useAdminToggleCustomizationOptionActiveMutation();

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
        const { data } = await toggleCustomizationOptionActiveMutation({
          variables: { id: optionId },
        });
        const result = data?.adminToggleCustomizationOptionActive;
        if (!result?.success) {
          console.error("Failed to toggle option status:", result?.error);
        }
        router.refresh();
      });
    },
    [router, toggleCustomizationOptionActiveMutation],
  );

  const handleDelete = useCallback(
    (optionId: number) => {
      if (
        !confirm("Are you sure you want to delete this customization option?")
      ) {
        return;
      }

      startTransition(async () => {
        const { data } = await deleteCustomizationOptionMutation({
          variables: { id: optionId },
        });
        const result = data?.adminDeleteCustomizationOption;
        if (!result?.success) {
          console.error("Failed to delete option:", result?.error);
        }
        router.refresh();
      });
    },
    [deleteCustomizationOptionMutation, router],
  );

  return (
    <CustomizationOptionsTable
      viewModel={viewModel}
      categories={categories}
      types={types}
      isPending={isPending || deleteLoading || toggleLoading}
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
