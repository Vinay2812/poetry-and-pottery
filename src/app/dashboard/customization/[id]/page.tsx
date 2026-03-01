import {
  getCustomizationCategories,
  getCustomizationOptionById,
  getCustomizationTypes,
} from "@/data/admin/customization/gateway/server";
import { CustomizationOptionFormContainer } from "@/features/dashboard/customization";
import { notFound } from "next/navigation";

interface EditCustomizationOptionPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Route: /dashboard/customization/[id]
 * Page does: Admin edit page for a single customization option record.
 * Key UI operations:
 * - Update option labels, pricing behavior, availability, and category/type association.
 * - Prevent edits when the option id is invalid or no longer exists.
 * UI info needed for operations:
 * - Route param `id` parsed to numeric option ID with not-found fallback.
 * - Customization option payload plus category/type lookup data for selector inputs.
 */
export default async function EditCustomizationOptionPage({
  params,
}: EditCustomizationOptionPageProps) {
  const { id } = await params;
  const optionId = parseInt(id, 10);

  if (isNaN(optionId)) {
    notFound();
  }

  const [option, categories, types] = await Promise.all([
    getCustomizationOptionById(optionId),
    getCustomizationCategories(),
    getCustomizationTypes(),
  ]);

  if (!option) {
    notFound();
  }

  return (
    <div className="container py-6">
      <CustomizationOptionFormContainer
        option={option}
        categories={categories}
        types={types}
      />
    </div>
  );
}
