import { getCategories } from "@/data/admin/categories/gateway/server";
import {
  getCustomizationTypes,
  getCustomizeCategories,
} from "@/data/admin/customization/gateway/server";
import { CustomizationDashboardContainer } from "@/features/dashboard/customization";

/**
 * Route: /dashboard/customization
 * Page does: Admin customization console for category and option management.
 * Key UI operations:
 * - Review existing customization categories/options and launch add/edit flows.
 * - Adjust storefront customization matrix used by the public customize wizard.
 * UI info needed for operations:
 * - Combined dataset: customize categories, customization types, and product categories.
 * - Admin authorization and mutation feedback for category/option CRUD operations.
 */
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
