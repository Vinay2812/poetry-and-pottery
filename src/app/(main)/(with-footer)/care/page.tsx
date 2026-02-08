import { getPublicCareContent } from "@/data/admin/content/gateway/server";
import { Suspense } from "react";

import { CarePageClient } from "@/components/pages";
import { PageSkeleton } from "@/components/skeletons";

import { absoluteUrl } from "@/lib/seo";

async function CareContent() {
  const content = await getPublicCareContent();

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
            headline: "Pottery Care Instructions",
            url: absoluteUrl("/care"),
            description:
              "Care guidance for handcrafted ceramics, glaze-specific tips, and safe handling best practices.",
          }),
        }}
      />
      <CarePageClient content={content} />
    </>
  );
}

export default function CarePage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CareContent />
    </Suspense>
  );
}
