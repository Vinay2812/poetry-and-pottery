import { type ContentPageType, getContentPageBySlug } from "@/actions/admin";
import { ContentPageEditorContainer } from "@/features/dashboard/content";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

const VALID_SLUGS: ContentPageType[] = ["about", "faq", "shipping", "care"];

interface ContentEditorPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ContentEditorPage({
  params,
}: ContentEditorPageProps) {
  const { slug } = await params;

  if (!VALID_SLUGS.includes(slug as ContentPageType)) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Suspense fallback={<ContentEditorSkeleton />}>
        <ContentEditorContent slug={slug as ContentPageType} />
      </Suspense>
    </div>
  );
}

async function ContentEditorContent({ slug }: { slug: ContentPageType }) {
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

function ContentEditorSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="rounded-lg border p-6">
        <Skeleton className="mb-6 h-8 w-64" />
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
