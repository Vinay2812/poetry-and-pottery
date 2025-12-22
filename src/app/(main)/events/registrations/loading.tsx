import { MobileHeaderContainer } from "@/features/layout";

import { RegistrationsSkeleton } from "@/components/skeletons";

export default function RegistrationsLoading() {
  return (
    <>
      <MobileHeaderContainer title="Pottery Workshops" showBack backHref="/" />
      <RegistrationsSkeleton />
    </>
  );
}
