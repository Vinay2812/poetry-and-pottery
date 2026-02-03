import {
  getCustomizationCategories,
  getCustomizationTypes,
} from "@/data/admin/customization/gateway/server";
import { CustomizationOptionFormContainer } from "@/features/dashboard/customization";

export default async function NewCustomizationOptionPage() {
  const [categories, types] = await Promise.all([
    getCustomizationCategories(),
    getCustomizationTypes(),
  ]);

  return (
    <div className="container py-6">
      <CustomizationOptionFormContainer categories={categories} types={types} />
    </div>
  );
}
