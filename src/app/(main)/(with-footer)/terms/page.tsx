import { getPublicTermsContent } from "@/data/admin/content/gateway/server";
import type { Metadata } from "next";
import { Suspense } from "react";

import { TermsPageClient } from "@/components/pages";
import { PageSkeleton } from "@/components/skeletons";

import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms & Conditions | Poetry & Pottery",
  description:
    "Review the terms and conditions for using Poetry & Pottery, including purchases, workshops, returns, and site usage policies.",
  alternates: {
    canonical: absoluteUrl("/terms"),
  },
  openGraph: {
    title: "Terms & Conditions | Poetry & Pottery",
    description:
      "Terms for shopping, workshops, and using the Poetry & Pottery website.",
    type: "website",
    url: absoluteUrl("/terms"),
    images: [
      {
        url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Poetry & Pottery Terms and Conditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | Poetry & Pottery",
    description: "Terms for using Poetry & Pottery and making purchases.",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
    ],
  },
};

async function TermsContent() {
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

export default function TermsPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <TermsContent />
    </Suspense>
  );
}
