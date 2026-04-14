import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";

import { PageSkeleton } from "@/components/skeletons";

import { FAQContent } from "./faq-content";

/**
 * Route: /faq
 * Page does: Support knowledge base page with categorized FAQs in accordion format.
 * Key UI operations:
 * - Expand/collapse question items by category and scan policy highlights.
 * - Use support CTA when the listed answers do not resolve the user issue.
 * UI info needed for operations:
 * - FAQ content model (`categories[].faqs[]`) with question/answer text from CMS.
 * - Policy summary values shown in the highlighted info cards section.
 */
export default function FAQPage() {
  noStore();

  return (
    <Suspense fallback={<PageSkeleton />}>
      <FAQContent />
    </Suspense>
  );
}
