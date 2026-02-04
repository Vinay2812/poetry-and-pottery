import { getPublicTermsContent } from "@/data/admin/content/gateway/server";
import { Suspense } from "react";

import { TermsPageClient } from "@/components/pages";
import { PageSkeleton } from "@/components/skeletons";

async function TermsContent() {
  const content = await getPublicTermsContent();

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Page content not available</p>
      </div>
    );
  }

  return <TermsPageClient content={content} />;
}

export default function TermsPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <TermsContent />
    </Suspense>
  );
}
