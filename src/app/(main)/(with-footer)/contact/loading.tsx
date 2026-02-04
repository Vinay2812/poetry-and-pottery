import { MobileHeaderContainer } from "@/features/layout";

import { PageSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <>
      <MobileHeaderContainer title="Contact" showBack backHref="/" />
      <PageSkeleton />
    </>
  );
}
