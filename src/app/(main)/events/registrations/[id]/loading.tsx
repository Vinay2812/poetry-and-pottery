import { MobileHeaderContainer } from "@/features/layout";

import { RegistrationDetailSkeleton } from "@/components/skeletons";

export default function RegistrationDetailLoading() {
  return (
    <>
      <MobileHeaderContainer
        title="Registration Details"
        showBack
        backHref="/events/registrations"
      />
      <RegistrationDetailSkeleton />
    </>
  );
}
