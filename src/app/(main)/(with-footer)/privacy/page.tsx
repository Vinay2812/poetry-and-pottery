import { getPublicPrivacyContent } from "@/data/admin/content/gateway/server";
import { Suspense } from "react";

import { PrivacyPageClient } from "@/components/pages";
import { PageSkeleton } from "@/components/skeletons";

async function PrivacyContent() {
  const content = await getPublicPrivacyContent();

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Page content not available</p>
      </div>
    );
  }

  return <PrivacyPageClient content={content} />;
}

export default function PrivacyPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PrivacyContent />
    </Suspense>
  );
}
