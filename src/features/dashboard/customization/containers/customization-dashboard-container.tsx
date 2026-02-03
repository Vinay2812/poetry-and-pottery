"use client";

import {
  createCustomizationOption,
  createCustomizeCategory,
  deleteCustomizationOption,
  deleteCustomizeCategory,
  toggleCustomizationOptionActive,
  toggleCustomizeCategoryActive,
} from "@/data/admin/customization/gateway/server";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";

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
      const result = await createCustomizeCategory({
        category: formData.category,
        base_price: formData.basePrice,
        image_url: formData.imageUrl,
      });
      if (!result.success) {
        alert(result.error || "Failed to create category");
        return;
      }
      setAddCategoryOpen(false);
      startTransition(() => router.refresh());
    },
    [router],
  );

  const handleAddOption = useCallback(
    async (categoryId: number, formData: CreateOptionFormData) => {
      const result = await createCustomizationOption({
        customize_category_id: categoryId,
        type: formData.type,
        name: formData.name,
        value: formData.value,
        price_modifier: formData.priceModifier,
        sort_order: formData.sortOrder,
      });
      if (!result.success) {
        alert(result.error || "Failed to create option");
        return;
      }
      setAddOptionForCategory(null);
      startTransition(() => router.refresh());
    },
    [router],
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
        await toggleCustomizeCategoryActive(categoryId);
        router.refresh();
      });
    },
    [router],
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
        const result = await deleteCustomizeCategory(categoryId);
        if (!result.success) {
          alert(result.error || "Failed to delete category");
        }
        router.refresh();
      });
    },
    [router],
  );

  const handleToggleOptionActive = useCallback(
    (optionId: number) => {
      startTransition(async () => {
        await toggleCustomizationOptionActive(optionId);
        router.refresh();
      });
    },
    [router],
  );

  const handleDeleteOption = useCallback(
    (optionId: number) => {
      if (!confirm("Delete this option?")) return;
      startTransition(async () => {
        await deleteCustomizationOption(optionId);
        router.refresh();
      });
    },
    [router],
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
