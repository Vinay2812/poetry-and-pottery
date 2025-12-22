import { MobileHeaderContainer } from "@/features/layout";

import { EventsSkeleton } from "@/components/skeletons";

export default function PastEventsLoading() {
  return (
    <>
      <MobileHeaderContainer
        title="Past Workshops"
        showBack
        backHref="/events"
      />
      <EventsSkeleton />
    </>
  );
}
