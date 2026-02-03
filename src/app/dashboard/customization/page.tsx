import {
  getCustomizationTypes,
  getCustomizeCategories,
} from "@/data/admin/customization/gateway/server";
import { CustomizationDashboardContainer } from "@/features/dashboard/customization";

export default async function CustomizationPage() {
  const [data, types] = await Promise.all([
    getCustomizeCategories(),
    getCustomizationTypes(),
  ]);

  return (
    <div className="container py-6">
      <CustomizationDashboardContainer data={data} types={types} />
    </div>
  );
}
