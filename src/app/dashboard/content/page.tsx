import { getContentPages } from "@/data/admin/content/gateway/server";
import { ContentPagesListContainer } from "@/features/dashboard/content";
import { Suspense } from "react";

import { ContentPagesListSkeleton } from "@/components/skeletons";

export default async function ContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Content Pages</h1>
        <p className="text-muted-foreground">
          Manage static page content for About, FAQ, Shipping, Care, Privacy,
          and Terms pages.
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
