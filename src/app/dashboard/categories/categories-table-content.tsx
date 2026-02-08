import {
  getAvailableIcons,
  getCategories,
} from "@/data/admin/categories/gateway/server";
import { CategoriesTableContainer } from "@/features/dashboard/categories";

export async function CategoriesTableContent() {
  const [data, iconOptions] = await Promise.all([
    getCategories(),
    getAvailableIcons(),
  ]);

  return <CategoriesTableContainer data={data} iconOptions={iconOptions} />;
}
