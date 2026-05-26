import { MobileHeaderContainer } from "@/features/layout";
import { Suspense } from "react";

import { ListingPageHeader } from "@/components/shared";
import { CustomizeWizardSkeleton } from "@/components/skeletons";

import { absoluteUrl } from "@/lib/seo";
import { buildMetadataFromSeo } from "@/lib/site-content";

import {
  CustomizeContent,
  buildCustomizeStructuredData,
} from "./customize-content";

export function generateMetadata() {
  const base = buildMetadataFromSeo("customize");
  return {
    ...base,
    keywords: [
      "custom pottery",
      "personalized ceramics",
      "handmade mugs",
      "custom bowls",
      "pottery customization",
      "artisan pottery",
    ],
    alternates: {
      canonical: absoluteUrl("/customize"),
    },
  };
}

/**
 * Route: /customize
 * Page does: Product customization flow where users configure made-to-order pottery before checkout.
 * Key UI operations:
 * - Choose a base category, select option groups, and review the configured item before adding to cart.
 * - Move through wizard steps with loading fallbacks while options and pricing metadata resolve.
 * UI info needed for operations:
 * - Customization categories, option matrices, pricing rules, and preview media for each selection.
 * - Cart/user context required to persist configured selections into a cart line item.
 */
export default function CustomizePage() {
  return (
    <>
      <MobileHeaderContainer title="Customize Pottery" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildCustomizeStructuredData()),
          }}
        />
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
