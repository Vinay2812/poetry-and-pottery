import {
  getAvailableIcons,
  getCategories,
} from "@/data/admin/categories/gateway/server";
import { CategoriesTableContainer } from "@/features/dashboard/categories";
import { Suspense } from "react";

import { CategoriesTableSkeleton } from "@/components/skeletons";

export default async function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">
          Manage product categories and their icons.
        </p>
      </div>

      <Suspense fallback={<CategoriesTableSkeleton />}>
        <CategoriesTableContent />
      </Suspense>
    </div>
  );
}

async function CategoriesTableContent() {
  const [data, iconOptions] = await Promise.all([
    getCategories(),
    getAvailableIcons(),
  ]);

  return <CategoriesTableContainer data={data} iconOptions={iconOptions} />;
}
