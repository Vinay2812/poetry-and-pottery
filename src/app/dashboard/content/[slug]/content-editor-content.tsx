import { getContentPageBySlug } from "@/data/admin/content/gateway/server";
import { ContentPageEditorContainer } from "@/features/dashboard/content";
import { notFound } from "next/navigation";

import type { ContentPageSlug } from "./content-page-slug";

interface ContentEditorContentProps {
  slug: ContentPageSlug;
}

export async function ContentEditorContent({
  slug,
}: ContentEditorContentProps) {
  const page = await getContentPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <ContentPageEditorContainer
      slug={slug}
      title={page.title}
      content={page.content}
    />
  );
}
