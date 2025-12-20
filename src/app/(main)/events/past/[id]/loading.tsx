import { MobileHeader } from "@/components/layout";
import { EventDetailSkeleton } from "@/components/skeletons";

export default function PastEventDetailLoading() {
  return (
    <>
      <MobileHeader title="Workshop Details" showBack backHref="/events/past" />
      <EventDetailSkeleton />
    </>
  );
}
