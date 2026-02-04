import { getPublicShippingContent } from "@/data/admin/content/gateway/server";
import { Suspense } from "react";

import { ShippingPageClient } from "@/components/pages";
import { PageSkeleton } from "@/components/skeletons";

async function ShippingContent() {
  const content = await getPublicShippingContent();

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Page content not available</p>
      </div>
    );
  }

  return <ShippingPageClient content={content} />;
}

export default function ShippingPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ShippingContent />
    </Suspense>
  );
}
