import { Suspense } from "react";

import { CollectionsTableSkeleton } from "@/components/skeletons";

import {
  CollectionsTableContent,
  type DashboardCollectionsSearchParams,
} from "./collections-table-content";

interface CollectionsPageProps {
  searchParams: Promise<DashboardCollectionsSearchParams>;
}

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
