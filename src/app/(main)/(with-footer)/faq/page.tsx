import { Suspense } from "react";

import { PageSkeleton } from "@/components/skeletons";

import { FAQContent } from "./faq-content";

export default function FAQPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <FAQContent />
    </Suspense>
  );
}
