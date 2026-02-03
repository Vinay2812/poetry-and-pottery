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
