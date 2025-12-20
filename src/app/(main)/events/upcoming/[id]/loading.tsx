import { MobileHeader } from "@/components/layout";
import { EventDetailSkeleton } from "@/components/skeletons";

export default function EventDetailLoading() {
  return (
    <>
      <MobileHeader
        title="Event Details"
        showBack
        backHref="/events/upcoming"
      />
      <EventDetailSkeleton />
    </>
  );
}
