"use client";

import {
  addCategory,
  deleteCategory,
  renameCategory,
  updateCategoryIcon,
} from "@/data/admin/categories/gateway/server";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";

import { CategoriesTable } from "../components/categories-table";
import type { CategoriesTableContainerProps } from "../types";
import { buildCategoriesTableViewModel } from "../types";

export function CategoriesTableContainer({
  data,
  iconOptions,
}: CategoriesTableContainerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const viewModel = useMemo(() => buildCategoriesTableViewModel(data), [data]);

  const handleIconChange = useCallback(
    (name: string, icon: string) => {
      startTransition(async () => {
        const result = await updateCategoryIcon(name, icon);
        if (!result.success) {
          alert(result.error || "Failed to update icon");
        }
        router.refresh();
      });
    },
    [router],
  );

  const handleRename = useCallback(
    (oldName: string, newName: string) => {
      startTransition(async () => {
        const result = await renameCategory(oldName, newName);
        if (!result.success) {
          alert(result.error || "Failed to rename category");
        }
        router.refresh();
      });
    },
    [router],
  );

  const handleDelete = useCallback(
    (name: string) => {
      startTransition(async () => {
        const result = await deleteCategory(name);
        if (!result.success) {
          alert(result.error || "Failed to delete category");
        }
        router.refresh();
      });
    },
    [router],
  );

  const handleAdd = useCallback(
    (name: string, icon: string) => {
      startTransition(async () => {
        const result = await addCategory(name, icon);
        if (!result.success) {
          alert(result.error || "Failed to add category");
        }
        router.refresh();
      });
    },
    [router],
  );

  return (
    <CategoriesTable
      viewModel={viewModel}
      iconOptions={iconOptions}
      isPending={isPending}
      onIconChange={handleIconChange}
      onRename={handleRename}
      onDelete={handleDelete}
      onAdd={handleAdd}
    />
  );
}
