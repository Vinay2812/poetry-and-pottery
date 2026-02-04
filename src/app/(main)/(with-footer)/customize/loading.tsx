import { MobileHeaderContainer } from "@/features/layout";

import { ListingPageHeader } from "@/components/shared";
import { CustomizeWizardSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <>
      <MobileHeaderContainer title="Customize Pottery" showBack backHref="/" />
      <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <ListingPageHeader
            title="Make It Yours"
            subtitle="Create pottery as unique as you are. Select a category, choose your options, and we'll handcraft it just for you."
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "Customize" }]}
          />
          <CustomizeWizardSkeleton />
        </div>
      </main>
    </>
  );
}
