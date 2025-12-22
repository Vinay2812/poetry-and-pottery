import { MobileHeaderContainer } from "@/features/layout";

import { EventDetailSkeleton } from "@/components/skeletons";

export default function PastEventDetailLoading() {
  return (
    <>
      <MobileHeaderContainer
        title="Workshop Details"
        showBack
        backHref="/events/past"
      />
      <EventDetailSkeleton />
    </>
  );
}
