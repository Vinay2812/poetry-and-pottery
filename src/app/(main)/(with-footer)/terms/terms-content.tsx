import { SITE_TERMS_CONTENT } from "@/consts/site-content";

import { TermsPageClient } from "@/components/pages";

import { absoluteUrl } from "@/lib/seo";

import type { TermsPageContent } from "@/graphql/generated/types";

export function TermsContent() {
  const content = SITE_TERMS_CONTENT as TermsPageContent;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Terms and Conditions",
            url: absoluteUrl("/terms"),
            dateModified: content.lastUpdated,
            description:
              "Terms governing purchases, workshops, and use of the Poetry & Pottery website.",
          }),
        }}
      />
      <TermsPageClient content={content} />
    </>
  );
}
