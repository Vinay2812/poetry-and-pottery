import { SITE_SHIPPING_CONTENT } from "@/consts/site-content";

import { ShippingPageClient } from "@/components/pages";

import { absoluteUrl } from "@/lib/seo";

import type { ShippingPageContent } from "@/graphql/generated/types";

export function ShippingContent() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Shipping and Delivery Policy",
            url: absoluteUrl("/shipping"),
            description:
              "Shipping timelines, delivery options, India-only service areas, and damage support policy for Poetry & Pottery orders.",
          }),
        }}
      />
      <ShippingPageClient
        content={SITE_SHIPPING_CONTENT as ShippingPageContent}
      />
    </>
  );
}
