import { Suspense } from "react";

import { ContentPagesListSkeleton } from "@/components/skeletons";

import { ContentPagesListContent } from "./content-pages-list-content";

/**
 * Route: /dashboard/content
 * Page does: Admin content index page listing editable public-information pages.
 * Key UI operations:
 * - Browse available content pages (About/FAQ/Shipping/Care/Privacy/Terms) and open editors.
 * - Use loading fallback while the content-page list resolves from admin data source.
 * UI info needed for operations:
 * - Admin authorization and content-page index metadata (slug, label, update state).
 * - Navigation targets to route into each page's structured editor flow.
 */
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
