import { getCategories } from "@/data/admin/categories/gateway/server";
import {
  getCustomizationTypes,
  getCustomizeCategories,
} from "@/data/admin/customization/gateway/server";
import { CustomizationDashboardContainer } from "@/features/dashboard/customization";

export default async function CustomizationPage() {
  const [data, types, productCategories] = await Promise.all([
    getCustomizeCategories(),
    getCustomizationTypes(),
    getCategories(),
  ]);

  return (
    <div className="container py-6">
      <CustomizationDashboardContainer
        data={data}
        types={types}
        productCategories={productCategories.categories}
      />
    </div>
  );
}
