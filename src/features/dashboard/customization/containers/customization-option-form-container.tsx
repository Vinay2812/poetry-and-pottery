"use client";

import {
  createCustomizationOption,
  updateCustomizationOption,
} from "@/data/admin/customization/gateway/server";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { CustomizationOptionForm } from "../components/customization-option-form";
import type {
  CustomizationOptionFormContainerProps,
  CustomizationOptionFormData,
} from "../types";
import { buildCustomizationOptionFormViewModel } from "../types";

export function CustomizationOptionFormContainer({
  option,
  categories,
  types,
}: CustomizationOptionFormContainerProps) {
  const router = useRouter();
  const isEditing = !!option;

  const viewModel = useMemo(
    () => buildCustomizationOptionFormViewModel(option),
    [option],
  );

  const existingCategories = useMemo(
    () => categories.map((c) => c.category),
    [categories],
  );

  const existingTypes = useMemo(() => types.map((t) => t.type), [types]);

  const handleSubmit = useCallback(
    async (data: CustomizationOptionFormData) => {
      // Look up the category ID from the category name
      const categoryData = categories.find((c) => c.category === data.category);
      if (!categoryData) {
        alert("Invalid category selected");
        return;
      }

      const input = {
        customize_category_id: categoryData.id,
        type: data.type,
        name: data.name,
        value: data.value,
        price_modifier: data.priceModifier,
        sort_order: data.sortOrder,
        is_active: data.isActive,
      };

      if (isEditing && option) {
        const result = await updateCustomizationOption(option.id, input);
        if (!result.success) {
          alert(result.error || "Failed to update option");
          return;
        }
      } else {
        const result = await createCustomizationOption(input);
        if (!result.success) {
          alert(result.error || "Failed to create option");
          return;
        }
      }

      router.push("/dashboard/customization");
      router.refresh();
    },
    [isEditing, option, router, categories],
  );

  const handleCancel = useCallback(() => {
    router.push("/dashboard/customization");
  }, [router]);

  return (
    <CustomizationOptionForm
      viewModel={viewModel}
      existingCategories={existingCategories}
      existingTypes={existingTypes}
      isEditing={isEditing}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
