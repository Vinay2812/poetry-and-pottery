import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ContentEditorSkeleton } from "@/components/skeletons";

import { ContentEditorContent } from "./content-editor-content";
import { type ContentPageSlug, VALID_SLUGS } from "./content-page-slug";

interface ContentEditorPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Route: /dashboard/content/[slug]
 * Page does: Admin structured content editor for one CMS-backed public page.
 * Key UI operations:
 * - Edit and publish content blocks for the selected page slug using typed editor controls.
 * - Guard against unsupported slugs with immediate not-found handling.
 * UI info needed for operations:
 * - Route param `slug` constrained to `VALID_SLUGS` for editor safety.
 * - Page-specific content schema/value payload used by the content editor container.
 */
export default async function ContentEditorPage({
  params,
}: ContentEditorPageProps) {
  const { slug } = await params;

  if (!VALID_SLUGS.includes(slug as ContentPageSlug)) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Suspense fallback={<ContentEditorSkeleton />}>
        <ContentEditorContent slug={slug as ContentPageSlug} />
      </Suspense>
    </div>
  );
}
