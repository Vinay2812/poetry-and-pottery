import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ContentEditorSkeleton } from "@/components/skeletons";

import { ContentEditorContent } from "./content-editor-content";
import { type ContentPageSlug, VALID_SLUGS } from "./content-page-slug";

interface ContentEditorPageProps {
  params: Promise<{ slug: string }>;
}

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
