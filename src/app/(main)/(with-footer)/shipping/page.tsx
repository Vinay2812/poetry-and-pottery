import { Suspense } from "react";

import { PageSkeleton } from "@/components/skeletons";

import { ShippingContent } from "./shipping-content";

export default function ShippingPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ShippingContent />
    </Suspense>
  );
}
