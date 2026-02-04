import { getContentPageBySlug } from "@/data/admin/content/gateway/server";
import { ContentPageEditorContainer } from "@/features/dashboard/content";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ContentEditorSkeleton } from "@/components/skeletons";

type ContentPageSlug =
  | "about"
  | "faq"
  | "shipping"
  | "care"
  | "privacy"
  | "terms";

const VALID_SLUGS: ContentPageSlug[] = [
  "about",
  "faq",
  "shipping",
  "care",
  "privacy",
  "terms",
];

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

async function ContentEditorContent({ slug }: { slug: ContentPageSlug }) {
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
