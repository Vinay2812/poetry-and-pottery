import { getContentPages } from "@/actions/admin";
import { ContentPagesListContainer } from "@/features/dashboard/content";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

export default async function ContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Content Pages</h1>
        <p className="text-muted-foreground">
          Manage static page content for About, FAQ, Shipping, and Care pages.
        </p>
      </div>

      <Suspense fallback={<ContentPagesListSkeleton />}>
        <ContentPagesListContent />
      </Suspense>
    </div>
  );
}

async function ContentPagesListContent() {
  const pages = await getContentPages();

  return <ContentPagesListContainer data={pages} />;
}

function ContentPagesListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div className="flex items-start gap-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-36" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
