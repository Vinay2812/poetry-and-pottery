"use client";

import { updateCustomizeCategory } from "@/data/admin/customization/gateway/server";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { EditCategoryForm } from "../components/edit-category-form";
import type {
  EditCategoryFormContainerProps,
  UpdateCategoryFormData,
} from "../types";
import { buildEditCategoryFormViewModel } from "../types";

export function EditCategoryFormContainer({
  category,
}: EditCategoryFormContainerProps) {
  const router = useRouter();

  const viewModel = useMemo(
    () => buildEditCategoryFormViewModel(category),
    [category],
  );

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
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
