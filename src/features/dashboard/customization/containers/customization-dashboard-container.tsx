"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";

import {
  useAdminCreateCustomizationOptionMutation,
  useAdminCreateCustomizeCategoryMutation,
  useAdminDeleteCustomizationOptionMutation,
  useAdminDeleteCustomizeCategoryMutation,
  useAdminToggleCustomizationOptionActiveMutation,
  useAdminToggleCustomizeCategoryActiveMutation,
} from "@/graphql/generated/graphql";

import { CustomizationDashboard } from "../components/customization-dashboard";
import type {
  AvailableCategoryOption,
  CreateCategoryFormData,
  CreateOptionFormData,
  CustomizationDashboardContainerProps,
} from "../types";
import { buildCustomizationDashboardViewModel } from "../types";

export function CustomizationDashboardContainer({
  data,
  types,
  productCategories,
}: CustomizationDashboardContainerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [createCustomizeCategoryMutation] =
    useAdminCreateCustomizeCategoryMutation();
  const [createCustomizationOptionMutation] =
    useAdminCreateCustomizationOptionMutation();
  const [toggleCustomizeCategoryActiveMutation] =
    useAdminToggleCustomizeCategoryActiveMutation();
  const [deleteCustomizeCategoryMutation] =
    useAdminDeleteCustomizeCategoryMutation();
  const [toggleCustomizationOptionActiveMutation] =
    useAdminToggleCustomizationOptionActiveMutation();
  const [deleteCustomizationOptionMutation] =
    useAdminDeleteCustomizationOptionMutation();
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [addOptionForCategory, setAddOptionForCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const viewModel = useMemo(
    () => buildCustomizationDashboardViewModel(data),
    [data],
  );

  // Compute available categories (product categories not yet used as customize categories)
  const availableCategories = useMemo<AvailableCategoryOption[]>(() => {
    const usedCategoryNames = new Set(
      data.categories.map((c) => c.category.toLowerCase()),
    );
    return productCategories
      .filter((pc) => !usedCategoryNames.has(pc.name.toLowerCase()))
      .map((pc) => ({ name: pc.name, icon: pc.icon }));
  }, [data.categories, productCategories]);

  const handleAddCategory = useCallback(
    async (formData: CreateCategoryFormData) => {
      const { data } = await createCustomizeCategoryMutation({
        variables: {
          input: {
            category: formData.category,
            base_price: formData.basePrice,
            image_url: formData.imageUrl,
          },
        },
      });
      const result = data?.adminCreateCustomizeCategory;
      if (!result?.success) {
        alert(result?.error || "Failed to create category");
        return;
      }
      setAddCategoryOpen(false);
      startTransition(() => router.refresh());
    },
    [createCustomizeCategoryMutation, router],
  );

  const handleAddOption = useCallback(
    async (categoryId: number, formData: CreateOptionFormData) => {
      const { data } = await createCustomizationOptionMutation({
        variables: {
          input: {
            customize_category_id: categoryId,
            type: formData.type,
            name: formData.name,
            value: formData.value,
            price_modifier: formData.priceModifier,
            sort_order: formData.sortOrder,
          },
        },
      });
      const result = data?.adminCreateCustomizationOption;
      if (!result?.success) {
        alert(result?.error || "Failed to create option");
        return;
      }
      setAddOptionForCategory(null);
      startTransition(() => router.refresh());
    },
    [createCustomizationOptionMutation, router],
  );

  const handleEditCategory = useCallback(
    (categoryId: number) => {
      router.push(`/dashboard/customization/category/${categoryId}`);
    },
    [router],
  );

  const handleToggleCategoryActive = useCallback(
    (categoryId: number) => {
      startTransition(async () => {
        await toggleCustomizeCategoryActiveMutation({
          variables: { id: categoryId },
        });
        router.refresh();
      });
    },
    [router, toggleCustomizeCategoryActiveMutation],
  );

  const handleDeleteCategory = useCallback(
    (categoryId: number) => {
      if (
        !confirm(
          "Delete this category? All options in this category will also be deleted.",
        )
      )
        return;
      startTransition(async () => {
        const { data } = await deleteCustomizeCategoryMutation({
          variables: { id: categoryId },
        });
        const result = data?.adminDeleteCustomizeCategory;
        if (!result?.success) {
          alert(result?.error || "Failed to delete category");
        }
        router.refresh();
      });
    },
    [deleteCustomizeCategoryMutation, router],
  );

  const handleToggleOptionActive = useCallback(
    (optionId: number) => {
      startTransition(async () => {
        await toggleCustomizationOptionActiveMutation({
          variables: { id: optionId },
        });
        router.refresh();
      });
    },
    [router, toggleCustomizationOptionActiveMutation],
  );

  const handleDeleteOption = useCallback(
    (optionId: number) => {
      if (!confirm("Delete this option?")) return;
      startTransition(async () => {
        await deleteCustomizationOptionMutation({
          variables: { id: optionId },
        });
        router.refresh();
      });
    },
    [deleteCustomizationOptionMutation, router],
  );

  const handleEditOption = useCallback(
    (optionId: number) => {
      router.push(`/dashboard/customization/${optionId}`);
    },
    [router],
  );

  return (
    <CustomizationDashboard
      viewModel={viewModel}
      existingTypes={types.map((t) => t.type)}
      availableCategories={availableCategories}
      isPending={isPending}
      addCategoryOpen={addCategoryOpen}
      addOptionForCategory={addOptionForCategory}
      onAddCategoryOpen={() => setAddCategoryOpen(true)}
      onAddCategoryClose={() => setAddCategoryOpen(false)}
      onAddCategory={handleAddCategory}
      onAddOptionOpen={(categoryId, categoryName) =>
        setAddOptionForCategory({ id: categoryId, name: categoryName })
      }
      onAddOptionClose={() => setAddOptionForCategory(null)}
      onAddOption={handleAddOption}
      onEditCategory={handleEditCategory}
      onToggleCategoryActive={handleToggleCategoryActive}
      onDeleteCategory={handleDeleteCategory}
      onToggleOptionActive={handleToggleOptionActive}
      onDeleteOption={handleDeleteOption}
      onEditOption={handleEditOption}
    />
  );
}
