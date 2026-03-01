import { Suspense } from "react";

import { PageSkeleton } from "@/components/skeletons";

import { ShippingContent } from "./shipping-content";

/**
 * Route: /shipping
 * Page does: Shipping and returns information page for order fulfillment expectations.
 * Key UI operations:
 * - Review delivery timelines, service area, packaging, and return policy guidance.
 * - Use support CTA for shipping exceptions or damaged delivery handling.
 * UI info needed for operations:
 * - CMS shipping content payload (policy sections, timeline copy, support references).
 * - Contact escalation targets referenced in the page CTA and help pathways.
 */
export default function ShippingPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ShippingContent />
    </Suspense>
  );
}
