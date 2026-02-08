import { getPublicPrivacyContent } from "@/data/admin/content/gateway/server";

import { PrivacyPageClient } from "@/components/pages";

import { absoluteUrl } from "@/lib/seo";

export async function PrivacyContent() {
  const content = await getPublicPrivacyContent();

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
