"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useAdminUpdateCustomizeCategoryMutation } from "@/graphql/generated/graphql";

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
  const [updateCustomizeCategoryMutation] =
    useAdminUpdateCustomizeCategoryMutation();

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
    async (formData: UpdateCategoryFormData) => {
      const input = {
        category: formData.category,
        base_price: formData.basePrice,
        image_url: formData.imageUrl ?? null,
        is_active: formData.isActive,
      };

      const { data: mutationData } = await updateCustomizeCategoryMutation({
        variables: {
          id: category.id,
          input,
        },
      });
      const result = mutationData?.adminUpdateCustomizeCategory;
      if (!result?.success) {
        alert(result?.error || "Failed to update category");
        return;
      }

      router.push("/dashboard/customization");
      router.refresh();
    },
    [category.id, router, updateCustomizeCategoryMutation],
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
