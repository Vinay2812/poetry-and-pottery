import { MobileHeaderContainer } from "@/features/layout";

import { AuthCardSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <>
      <MobileHeaderContainer title="Sign In" showBack backHref="/" />
      <div className="from-background bg-background container mx-auto flex min-h-[70vh] items-center justify-center bg-linear-to-br px-4 py-0 lg:px-8 lg:pt-10">
        <AuthCardSkeleton />
      </div>
    </>
  );
}
