import { getAllConfiguredCategories } from "@/data/admin/categories/gateway/server";
import { getCustomizationTypes } from "@/data/admin/customization/gateway/server";
import { CustomizationOptionFormContainer } from "@/features/dashboard/customization";

export default async function NewCustomizationOptionPage() {
  const [categories, types] = await Promise.all([
    getAllConfiguredCategories(),
    getCustomizationTypes(),
  ]);

  return (
    <div className="container py-6">
      <CustomizationOptionFormContainer categories={categories} types={types} />
    </div>
  );
}
