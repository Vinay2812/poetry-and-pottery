import { Suspense } from "react";

import { ProductsTableSkeleton } from "@/components/skeletons";

import {
  type DashboardProductsSearchParams,
  ProductsTableContent,
} from "./products-table-content";

interface ProductsPageProps {
  searchParams: Promise<DashboardProductsSearchParams>;
}

/**
 * Route: /dashboard/products
 * Page does: Admin product index page for catalog, inventory, and status management.
 * Key UI operations:
 * - Search/filter by category, collection, status, and stock state; paginate through products.
 * - Open product detail editor from the table for updates and review moderation.
 * UI info needed for operations:
 * - Query params: `search`, `category`, `collection`, `status`, `stock`, `page`.
 * - Product summary dataset including inventory/status fields required by table cells.
 */
export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">
          Manage your product catalog, inventory, and pricing.
        </p>
      </div>

      <Suspense fallback={<ProductsTableSkeleton />}>
        <ProductsTableContent
          search={params.search}
          category={params.category}
          collection={params.collection}
          status={params.status}
          stock={params.stock}
          page={params.page}
        />
      </Suspense>
    </div>
  );
}
