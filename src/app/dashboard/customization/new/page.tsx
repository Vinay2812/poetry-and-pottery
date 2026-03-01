import {
  getCustomizationCategories,
  getCustomizationTypes,
} from "@/data/admin/customization/gateway/server";
import { CustomizationOptionFormContainer } from "@/features/dashboard/customization";

/**
 * Route: /dashboard/customization/new
 * Page does: Admin create page for a new customization option.
 * Key UI operations:
 * - Create option definitions and attach them to customization categories/types.
 * - Submit form with validation before option becomes available in customize flow.
 * UI info needed for operations:
 * - Lookup data for customization categories and customization types.
 * - Form schema for option attributes, pricing mode, and activation status.
 */
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
