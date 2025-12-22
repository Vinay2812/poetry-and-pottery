import { MobileHeaderContainer } from "@/features/layout";

import { EventsSkeleton } from "@/components/skeletons";

export default function EventsLoading() {
  return (
    <>
      <MobileHeaderContainer title="Pottery Workshops" showBack backHref="/" />
      <EventsSkeleton />
    </>
  );
}
