import { MobileHeader } from "@/components/layout";
import { RegistrationsSkeleton } from "@/components/skeletons";

export default function RegistrationsLoading() {
  return (
    <>
      <MobileHeader title="Pottery Workshops" showBack backHref="/" />
      <RegistrationsSkeleton />
    </>
  );
}
