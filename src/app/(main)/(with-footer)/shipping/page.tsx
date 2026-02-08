import { getPublicShippingContent } from "@/data/admin/content/gateway/server";
import { Suspense } from "react";

import { ShippingPageClient } from "@/components/pages";
import { PageSkeleton } from "@/components/skeletons";

import { absoluteUrl } from "@/lib/seo";

async function ShippingContent() {
  const content = await getPublicShippingContent();

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Page content not available</p>
      </div>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Shipping and Returns Policy",
            url: absoluteUrl("/shipping"),
            description:
              "Shipping timelines, delivery options, return process, and replacement policy for Poetry & Pottery orders.",
          }),
        }}
      />
      <ShippingPageClient content={content} />
    </>
  );
}

export default function ShippingPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ShippingContent />
    </Suspense>
  );
}
