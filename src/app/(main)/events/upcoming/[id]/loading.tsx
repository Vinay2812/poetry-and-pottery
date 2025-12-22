import { MobileHeaderContainer } from "@/features/layout";

import { EventDetailSkeleton } from "@/components/skeletons";

export default function EventDetailLoading() {
  return (
    <>
      <MobileHeaderContainer
        title="Event Details"
        showBack
        backHref="/events/upcoming"
      />
      <EventDetailSkeleton />
    </>
  );
}
