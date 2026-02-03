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
