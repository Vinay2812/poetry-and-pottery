import { MobileHeaderContainer } from "@/features/layout";
import type { Metadata } from "next";
import { Suspense } from "react";

import { ListingPageHeader } from "@/components/shared";
import { CustomizeWizardSkeleton } from "@/components/skeletons";

import { absoluteUrl } from "@/lib/seo";

import {
  CustomizeContent,
  buildCustomizeStructuredData,
} from "./customize-content";

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
  alternates: {
    canonical: absoluteUrl("/customize"),
  },
  openGraph: {
    title: "Customize Your Pottery | Poetry & Pottery",
    description:
      "Create your own unique handcrafted pottery. Choose from mugs, bowls, vases, and plates.",
    type: "website",
    url: absoluteUrl("/customize"),
    images: [
      {
        url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Customize handcrafted pottery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customize Your Pottery | Poetry & Pottery",
    description:
      "Create personalized handcrafted pottery with custom colors, shapes, and engravings.",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
    ],
  },
};

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
