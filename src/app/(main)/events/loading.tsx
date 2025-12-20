import { MobileHeader } from "@/components/layout";
import { EventsSkeleton } from "@/components/skeletons";

export default function EventsLoading() {
  return (
    <>
      <MobileHeader title="Pottery Workshops" showBack backHref="/" />
      <EventsSkeleton />
    </>
  );
}
