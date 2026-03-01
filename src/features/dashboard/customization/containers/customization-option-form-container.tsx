"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import {
  useAdminCreateCustomizationOptionMutation,
  useAdminUpdateCustomizationOptionMutation,
} from "@/graphql/generated/graphql";

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
  const [createCustomizationOptionMutation] =
    useAdminCreateCustomizationOptionMutation();
  const [updateCustomizationOptionMutation] =
    useAdminUpdateCustomizationOptionMutation();

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
        const { data } = await updateCustomizationOptionMutation({
          variables: {
            id: option.id,
            input,
          },
        });
        const result = data?.adminUpdateCustomizationOption;
        if (!result?.success) {
          alert(result?.error || "Failed to update option");
          return;
        }
      } else {
        const { data } = await createCustomizationOptionMutation({
          variables: { input },
        });
        const result = data?.adminCreateCustomizationOption;
        if (!result?.success) {
          alert(result?.error || "Failed to create option");
          return;
        }
      }

      router.push("/dashboard/customization");
      router.refresh();
    },
    [
      categories,
      createCustomizationOptionMutation,
      isEditing,
      option,
      router,
      updateCustomizationOptionMutation,
    ],
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
