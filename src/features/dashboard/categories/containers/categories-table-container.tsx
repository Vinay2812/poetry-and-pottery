"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import {
  useAdminAddCategoryMutation,
  useAdminDeleteCategoryMutation,
  useAdminRenameCategoryMutation,
  useAdminUpdateCategoryIconMutation,
} from "@/graphql/generated/graphql";

import { CategoriesTable } from "../components/categories-table";
import type { CategoriesTableContainerProps } from "../types";
import { buildCategoriesTableViewModel } from "../types";

export function CategoriesTableContainer({
  data,
  iconOptions,
}: CategoriesTableContainerProps) {
  const router = useRouter();
  const [updateCategoryIconMutation, { loading: updateCategoryIconLoading }] =
    useAdminUpdateCategoryIconMutation();
  const [renameCategoryMutation, { loading: renameCategoryLoading }] =
    useAdminRenameCategoryMutation();
  const [deleteCategoryMutation, { loading: deleteCategoryLoading }] =
    useAdminDeleteCategoryMutation();
  const [addCategoryMutation, { loading: addCategoryLoading }] =
    useAdminAddCategoryMutation();

  const viewModel = useMemo(() => buildCategoriesTableViewModel(data), [data]);

  const handleIconChange = useCallback(
    async (name: string, icon: string) => {
      try {
        const { data } = await updateCategoryIconMutation({
          variables: { category: name, icon },
        });
        const result = data?.adminUpdateCategoryIcon;
        if (!result?.success) {
          alert(result?.error || "Failed to update icon");
        }
      } catch (error) {
        alert(error instanceof Error ? error.message : "Failed to update icon");
      } finally {
        router.refresh();
      }
    },
    [router, updateCategoryIconMutation],
  );

  const handleRename = useCallback(
    async (oldName: string, newName: string) => {
      try {
        const { data } = await renameCategoryMutation({
          variables: { oldName, newName },
        });
        const result = data?.adminRenameCategory;
        if (!result?.success) {
          alert(result?.error || "Failed to rename category");
        }
      } catch (error) {
        alert(
          error instanceof Error ? error.message : "Failed to rename category",
        );
      } finally {
        router.refresh();
      }
    },
    [renameCategoryMutation, router],
  );

  const handleDelete = useCallback(
    async (name: string) => {
      try {
        const { data } = await deleteCategoryMutation({
          variables: { name },
        });
        const result = data?.adminDeleteCategory;
        if (!result?.success) {
          alert(result?.error || "Failed to delete category");
        }
      } catch (error) {
        alert(
          error instanceof Error ? error.message : "Failed to delete category",
        );
      } finally {
        router.refresh();
      }
    },
    [deleteCategoryMutation, router],
  );

  const handleAdd = useCallback(
    async (name: string, icon: string) => {
      try {
        const { data } = await addCategoryMutation({
          variables: { name, icon },
        });
        const result = data?.adminAddCategory;
        if (!result?.success) {
          alert(result?.error || "Failed to add category");
        }
      } catch (error) {
        alert(
          error instanceof Error ? error.message : "Failed to add category",
        );
      } finally {
        router.refresh();
      }
    },
    [addCategoryMutation, router],
  );

  return (
    <CategoriesTable
      viewModel={viewModel}
      iconOptions={iconOptions}
      isPending={
        updateCategoryIconLoading ||
        renameCategoryLoading ||
        deleteCategoryLoading ||
        addCategoryLoading
      }
      onIconChange={handleIconChange}
      onRename={handleRename}
      onDelete={handleDelete}
      onAdd={handleAdd}
    />
  );
}
