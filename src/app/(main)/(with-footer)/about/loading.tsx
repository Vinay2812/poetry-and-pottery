import { MobileHeaderContainer } from "@/features/layout";

import { PageSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <>
      <MobileHeaderContainer title="About Us" showBack backHref="/" />
      <PageSkeleton />
    </>
  );
}
