import { MobileHeader } from "@/components/layout";
import { EventsSkeleton } from "@/components/skeletons";

export default function UpcomingEventsLoading() {
  return (
    <>
      <MobileHeader title="Upcoming Events" showBack backHref="/events" />
      <EventsSkeleton />
    </>
  );
}
