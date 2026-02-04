import { getCustomizationCategories } from "@/data/customization/gateway/server";
import { CustomizeWizardContainer } from "@/features/customize";
import { MobileHeaderContainer } from "@/features/layout";
import type { Metadata } from "next";
import { Suspense } from "react";

import { ListingPageHeader } from "@/components/shared";
import { CustomizeWizardSkeleton } from "@/components/skeletons";

export const metadata: Metadata = {
  title: "Customize Your Pottery | Poetry & Pottery",
  description:
    "Create your own unique handcrafted pottery. Choose from mugs, bowls, vases, and plates. Customize size, color, shape, and add personal engravings.",
  keywords: [
    "custom pottery",
    "personalized ceramics",
    "handmade mugs",
    "custom bowls",
    "pottery customization",
    "artisan pottery",
  ],
  openGraph: {
    title: "Customize Your Pottery | Poetry & Pottery",
    description:
      "Create your own unique handcrafted pottery. Choose from mugs, bowls, vases, and plates.",
    type: "website",
  },
};

async function CustomizeContent() {
  const categories = await getCustomizationCategories();

  return (
    <CustomizeWizardContainer initialCategories={categories} />
  );
}

export default function CustomizePage() {
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

          <Suspense fallback={<CustomizeWizardSkeleton />}>
            <CustomizeContent />
          </Suspense>
        </div>
      </main>
    </>
  );
}
