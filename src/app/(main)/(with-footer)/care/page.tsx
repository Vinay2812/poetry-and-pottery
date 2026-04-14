import { Suspense } from "react";

import { PageSkeleton } from "@/components/skeletons";

import { CareContent } from "./care-content";

export const dynamic = "force-dynamic";

/**
 * Route: /care
 * Page does: Care guide page for handling pottery, glaze-specific instructions, and support escalation.
 * Key UI operations:
 * - Review default care cards, pro tips, and glaze-specific care blocks.
 * - Use the support CTA when the user needs help for a specific care scenario.
 * UI info needed for operations:
 * - CMS care payload (`glazeTypes`, descriptions, care tips) with fallback section content.
 * - Support contact destination used by the care-page CTA panel.
 */
export default function CarePage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CareContent />
    </Suspense>
  );
}
