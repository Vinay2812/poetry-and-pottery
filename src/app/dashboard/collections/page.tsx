import { getCollections } from "@/data/admin/collections/gateway/server";
import { CollectionsTableContainer } from "@/features/dashboard/collections";
import { Suspense } from "react";

import { CollectionsTableSkeleton } from "@/components/skeletons";

interface CollectionsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
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

async function CollectionsTableContent({
  search,
  status,
  page,
}: {
  search?: string;
  status?: string;
  page?: string;
}) {
  const data = await getCollections({
    search,
    active:
      status === "active" ? true : status === "inactive" ? false : undefined,
    page: page ? parseInt(page) : 1,
    limit: 20,
  });

  return <CollectionsTableContainer data={data} />;
}
