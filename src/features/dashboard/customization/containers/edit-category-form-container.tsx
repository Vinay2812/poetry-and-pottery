"use client";

import { updateCustomizeCategory } from "@/data/admin/customization/gateway/server";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { EditCategoryForm } from "../components/edit-category-form";
import type {
  AvailableCategoryOption,
  EditCategoryFormContainerProps,
  UpdateCategoryFormData,
} from "../types";
import { buildEditCategoryFormViewModel } from "../types";

export function EditCategoryFormContainer({
  category,
  productCategories,
  customizeCategories,
}: EditCategoryFormContainerProps) {
  const router = useRouter();

  const viewModel = useMemo(
    () => buildEditCategoryFormViewModel(category),
    [category],
  );

  // Compute available categories: current category + categories not used by other CustomizeCategories
  const availableCategories = useMemo<AvailableCategoryOption[]>(() => {
    const usedCategoryNames = new Set(
      customizeCategories
        .filter((c) => c.id !== category.id) // Exclude current category
        .map((c) => c.category.toLowerCase()),
    );
    return productCategories
      .filter((pc) => !usedCategoryNames.has(pc.name.toLowerCase()))
      .map((pc) => ({ name: pc.name, icon: pc.icon }));
  }, [customizeCategories, productCategories, category.id]);

  const handleSubmit = useCallback(
    async (data: UpdateCategoryFormData) => {
      const input = {
        category: data.category,
        base_price: data.basePrice,
        image_url: data.imageUrl,
        is_active: data.isActive,
      };

      const result = await updateCustomizeCategory(category.id, input);
      if (!result.success) {
        alert(result.error || "Failed to update category");
        return;
      }

      router.push("/dashboard/customization");
      router.refresh();
    },
    [category.id, router],
  );

  const handleCancel = useCallback(() => {
    router.push("/dashboard/customization");
  }, [router]);

  return (
    <EditCategoryForm
      viewModel={viewModel}
      availableCategories={availableCategories}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
