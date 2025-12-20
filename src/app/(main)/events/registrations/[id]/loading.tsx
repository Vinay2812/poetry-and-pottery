import { MobileHeader } from "@/components/layout";
import { RegistrationDetailSkeleton } from "@/components/skeletons";

export default function RegistrationDetailLoading() {
  return (
    <>
      <MobileHeader
        title="Registration Details"
        showBack
        backHref="/events/registrations"
      />
      <RegistrationDetailSkeleton />
    </>
  );
}
