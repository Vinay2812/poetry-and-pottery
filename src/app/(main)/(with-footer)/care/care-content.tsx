import { SITE_CARE_CONTENT } from "@/consts/site-content";

import { CarePageClient } from "@/components/pages";

import { absoluteUrl } from "@/lib/seo";

import type { CarePageContent } from "@/graphql/generated/types";

export function CareContent() {
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
      <CarePageClient content={SITE_CARE_CONTENT as CarePageContent} />
    </>
  );
}
