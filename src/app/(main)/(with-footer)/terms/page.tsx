import { Suspense } from "react";

import { PageSkeleton } from "@/components/skeletons";

import { absoluteUrl } from "@/lib/seo";
import { buildMetadataFromSeo } from "@/lib/site-content";

import { TermsContent } from "./terms-content";

export async function generateMetadata() {
  const base = await buildMetadataFromSeo("terms");
  return {
    ...base,
    alternates: {
      canonical: absoluteUrl("/terms"),
    },
  };
}

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
