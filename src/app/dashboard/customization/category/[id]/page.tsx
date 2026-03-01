import { getCategories } from "@/data/admin/categories/gateway/server";
import {
  getCustomizeCategories,
  getCustomizeCategoryById,
} from "@/data/admin/customization/gateway/server";
import { EditCategoryFormContainer } from "@/features/dashboard/customization/containers/edit-category-form-container";
import { notFound } from "next/navigation";

interface EditCategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Route: /dashboard/customization/category/[id]
 * Page does: Admin edit page for a customization category and its product mapping rules.
 * Key UI operations:
 * - Modify category metadata and map it to relevant product categories.
 * - Block editing UI when category ID is invalid or record cannot be found.
 * UI info needed for operations:
 * - Route param `id` parsed to numeric category ID with not-found safeguards.
 * - Category record plus product category list and existing customization category references.
 */
export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { id } = await params;
  const categoryId = parseInt(id, 10);

  if (isNaN(categoryId)) {
    notFound();
  }

  const [category, productCategories, customizeCategories] = await Promise.all([
    getCustomizeCategoryById(categoryId),
    getCategories(),
    getCustomizeCategories(),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="container py-6">
      <EditCategoryFormContainer
        category={category}
        productCategories={productCategories.categories}
        customizeCategories={customizeCategories.categories}
      />
    </div>
  );
}
