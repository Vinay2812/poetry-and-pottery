import { SITE_PRIVACY_CONTENT } from "@/consts/site-content";

import { PrivacyPageClient } from "@/components/pages";

import { absoluteUrl } from "@/lib/seo";

import type { PrivacyPageContent } from "@/graphql/generated/types";

export function PrivacyContent() {
  const content = SITE_PRIVACY_CONTENT as PrivacyPageContent;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy",
            url: absoluteUrl("/privacy"),
            dateModified: content.lastUpdated,
            description:
              "Read how Poetry & Pottery handles personal information and privacy rights.",
          }),
        }}
      />
      <PrivacyPageClient content={content} />
    </>
  );
}
