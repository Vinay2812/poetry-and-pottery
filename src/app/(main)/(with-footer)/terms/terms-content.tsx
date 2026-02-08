import { getPublicTermsContent } from "@/data/admin/content/gateway/server";

import { TermsPageClient } from "@/components/pages";

import { absoluteUrl } from "@/lib/seo";

export async function TermsContent() {
  const content = await getPublicTermsContent();

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
