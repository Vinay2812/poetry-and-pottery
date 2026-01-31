import {
  getCustomizationCategories,
  getCustomizationOptions,
  getCustomizationTypes,
} from "@/data/admin/customization/gateway/server";
import { CustomizationOptionsTableContainer } from "@/features/dashboard/customization";

interface CustomizationPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    type?: string;
    status?: string;
  }>;
}

export default async function CustomizationPage({
  searchParams,
}: CustomizationPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const search = params.search || "";
  const category = params.category;
  const type = params.type;
  const isActive =
    params.status === "ACTIVE"
      ? true
      : params.status === "INACTIVE"
        ? false
        : undefined;

  const [data, categories, types] = await Promise.all([
    getCustomizationOptions({
      page,
      limit: 20,
      search: search || undefined,
      category: category || undefined,
      type: type || undefined,
      isActive,
    }),
    getCustomizationCategories(),
    getCustomizationTypes(),
  ]);

  return (
    <div className="container py-6">
      <CustomizationOptionsTableContainer
        data={data}
        categories={categories}
        types={types}
      />
    </div>
  );
}
