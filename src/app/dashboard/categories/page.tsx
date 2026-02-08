import { Suspense } from "react";

import { CategoriesTableSkeleton } from "@/components/skeletons";

import { CategoriesTableContent } from "./categories-table-content";

export default function CategoriesPage() {
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
