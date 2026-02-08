import { getCustomizationCategories } from "@/data/customization/gateway/server";
import { CustomizeWizardContainer } from "@/features/customize";
import { MobileHeaderContainer } from "@/features/layout";
import type { Metadata } from "next";
import { Suspense } from "react";

import { ListingPageHeader } from "@/components/shared";
import { CustomizeWizardSkeleton } from "@/components/skeletons";

import { absoluteUrl } from "@/lib/seo";

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

async function CustomizeContent() {
  const categories = await getCustomizationCategories();

  return <CustomizeWizardContainer initialCategories={categories} />;
}

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

function buildCustomizeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Pottery Design",
    serviceType: "Personalized Handcrafted Pottery",
    provider: {
      "@type": "Organization",
      name: "Poetry & Pottery",
      url: absoluteUrl("/"),
    },
    url: absoluteUrl("/customize"),
    areaServed: "India",
    description:
      "Design personalized handcrafted pottery by selecting product type, materials, finishes, and custom engraving options.",
  };
}
