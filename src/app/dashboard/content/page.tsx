import { Suspense } from "react";

import { ContentPagesListSkeleton } from "@/components/skeletons";

import { ContentPagesListContent } from "./content-pages-list-content";

export default function ContentPage() {
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
