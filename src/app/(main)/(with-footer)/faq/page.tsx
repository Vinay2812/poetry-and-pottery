import { getPublicFAQContent } from "@/data/admin/content/gateway/server";
import { Suspense } from "react";

import { FAQPageClient } from "@/components/pages";
import { PageSkeleton } from "@/components/skeletons";

async function FAQContent() {
  const content = await getPublicFAQContent();

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Page content not available</p>
      </div>
    );
  }

  return <FAQPageClient content={content} />;
}

export default function FAQPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <FAQContent />
    </Suspense>
  );
}
