import { getPublicCareContent } from "@/data/admin/content/gateway/server";
import { Suspense } from "react";

import { CarePageClient } from "@/components/pages";
import { PageSkeleton } from "@/components/skeletons";

async function CareContent() {
  const content = await getPublicCareContent();

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Page content not available</p>
      </div>
    );
  }

  return <CarePageClient content={content} />;
}

export default function CarePage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CareContent />
    </Suspense>
  );
}
