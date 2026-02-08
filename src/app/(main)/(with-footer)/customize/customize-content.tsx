import { getCustomizationCategories } from "@/data/customization/gateway/server";
import { CustomizeWizardContainer } from "@/features/customize";

import { absoluteUrl } from "@/lib/seo";

export async function CustomizeContent() {
  const categories = await getCustomizationCategories();

  return <CustomizeWizardContainer initialCategories={categories} />;
}

export function buildCustomizeStructuredData() {
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
