import { getPublicShippingContent } from "@/data/admin/content/gateway/server";

import { ShippingPageClient } from "@/components/pages";

import { absoluteUrl } from "@/lib/seo";

export async function ShippingContent() {
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
