import { MobileHeaderContainer } from "@/features/layout";

import { EventsSkeleton } from "@/components/skeletons";

export default function UpcomingEventsLoading() {
  return (
    <>
      <MobileHeaderContainer
        title="Upcoming Events"
        showBack
        backHref="/events"
      />
      <EventsSkeleton />
    </>
  );
}
