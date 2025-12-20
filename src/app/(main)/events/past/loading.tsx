import { MobileHeader } from "@/components/layout";
import { EventsSkeleton } from "@/components/skeletons";

export default function PastEventsLoading() {
  return (
    <>
      <MobileHeader title="Past Workshops" showBack backHref="/events" />
      <EventsSkeleton />
    </>
  );
}
