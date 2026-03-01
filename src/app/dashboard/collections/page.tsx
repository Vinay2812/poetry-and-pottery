import { Suspense } from "react";

import { CollectionsTableSkeleton } from "@/components/skeletons";

import {
  CollectionsTableContent,
  type DashboardCollectionsSearchParams,
} from "./collections-table-content";

interface CollectionsPageProps {
  searchParams: Promise<DashboardCollectionsSearchParams>;
}

/**
 * Route: /dashboard/collections
 * Page does: Admin collection index page with search/filter controls and pagination.
 * Key UI operations:
 * - Filter collections by status, search by term, and paginate through result sets.
 * - Open individual collection detail pages for deeper editing.
 * UI info needed for operations:
 * - Query params: `search`, `status`, and `page` for table state and server-side fetches.
 * - Collection summary dataset including status badges and product counts.
 */
export default async function CollectionsPage({
  searchParams,
}: CollectionsPageProps) {
  const params = await searchParams;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Collections</h1>
        <p className="text-muted-foreground">
          Manage product collections for seasonal or limited editions.
        </p>
      </div>

      <Suspense fallback={<CollectionsTableSkeleton />}>
        <CollectionsTableContent
          search={params.search}
          status={params.status}
          page={params.page}
        />
      </Suspense>
    </div>
  );
}
