import { getPublicPrivacyContent } from "@/data/admin/content/gateway/server";
import type { Metadata } from "next";
import { Suspense } from "react";

import { PrivacyPageClient } from "@/components/pages";
import { PageSkeleton } from "@/components/skeletons";

import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | Poetry & Pottery",
  description:
    "Read how Poetry & Pottery collects, uses, and protects your personal information when you browse, purchase, or contact us.",
  alternates: {
    canonical: absoluteUrl("/privacy"),
  },
  openGraph: {
    title: "Privacy Policy | Poetry & Pottery",
    description:
      "Understand how Poetry & Pottery handles your personal data and privacy rights.",
    type: "website",
    url: absoluteUrl("/privacy"),
    images: [
      {
        url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Poetry & Pottery Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Poetry & Pottery",
    description: "Privacy practices and data protection at Poetry & Pottery.",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
    ],
  },
};

async function PrivacyContent() {
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

export default function PrivacyPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PrivacyContent />
    </Suspense>
  );
}
