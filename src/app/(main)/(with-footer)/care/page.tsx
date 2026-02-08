import { Suspense } from "react";

import { PageSkeleton } from "@/components/skeletons";

import { CareContent } from "./care-content";

export default function CarePage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CareContent />
    </Suspense>
  );
}
