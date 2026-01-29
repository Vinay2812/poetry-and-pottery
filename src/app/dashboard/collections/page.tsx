import { getCollections } from "@/data/admin/collections/gateway/server";
import { CollectionsTableContainer } from "@/features/dashboard/collections";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

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

function CollectionsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-36" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
          >
            <Skeleton className="aspect-[3/2] w-full" />
            <div className="space-y-3 p-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
