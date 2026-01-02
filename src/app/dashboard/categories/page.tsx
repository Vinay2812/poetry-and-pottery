import {
  getAvailableIcons,
  getCategories,
} from "@/data/admin/categories/gateway/server";
import { CategoriesTableContainer } from "@/features/dashboard/categories";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

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

function CategoriesTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <div className="border-b border-neutral-100 bg-neutral-50/50 px-4 py-3">
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-4 w-20" />
            ))}
          </div>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-neutral-100 px-4 py-3"
          >
            <Skeleton className="size-10 rounded-lg" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
