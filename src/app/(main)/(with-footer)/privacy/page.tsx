import { Suspense } from "react";

import { PageSkeleton } from "@/components/skeletons";

import { absoluteUrl } from "@/lib/seo";
import { buildMetadataFromSeo } from "@/lib/site-content";

import { PrivacyContent } from "./privacy-content";

export async function generateMetadata() {
  const base = await buildMetadataFromSeo("privacy");
  return {
    ...base,
    alternates: {
      canonical: absoluteUrl("/privacy"),
    },
  };
}

/**
 * Route: /privacy
 * Page does: Privacy policy page describing data collection, usage, and rights.
 * Key UI operations:
 * - Read policy sections and follow privacy/support contact links when needed.
 * - Consume content in static legal-page layout with loading fallback support.
 * UI info needed for operations:
 * - CMS privacy content payload with section blocks and `lastUpdated` metadata.
 * - Canonical/legal metadata used for SEO and structured data.
 */
export default function PrivacyPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PrivacyContent />
    </Suspense>
  );
}
