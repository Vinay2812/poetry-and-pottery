import type { Metadata } from "next";
import { Suspense } from "react";

import { PageSkeleton } from "@/components/skeletons";

import { absoluteUrl } from "@/lib/seo";

import { TermsContent } from "./terms-content";

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

/**
 * Route: /terms
 * Page does: Terms and conditions page for purchases, workshops, and site usage rules.
 * Key UI operations:
 * - Review contractual sections and policy constraints before placing orders/bookings.
 * - Access legal/support contact references included in the page footer content.
 * UI info needed for operations:
 * - CMS terms content payload with legal sections and `lastUpdated` metadata.
 * - Canonical/legal metadata used for SEO and structured data outputs.
 */
export default function TermsPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <TermsContent />
    </Suspense>
  );
}
