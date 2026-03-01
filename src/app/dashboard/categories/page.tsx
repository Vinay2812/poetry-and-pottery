import { Suspense } from "react";

import { CategoriesTableSkeleton } from "@/components/skeletons";

import { CategoriesTableContent } from "./categories-table-content";

/**
 * Route: /dashboard/categories
 * Page does: Admin categories management page for taxonomy and icon upkeep.
 * Key UI operations:
 * - Create, update, and remove categories used by storefront product discovery.
 * - Maintain category display metadata (name/icon/order) shown in category-driven UI.
 * UI info needed for operations:
 * - Admin authorization and category table dataset with icon and ordering fields.
 * - Mutation results needed to refresh category lists in dashboard and storefront filters.
 */
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
