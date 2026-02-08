import { AboutPageClient } from "@/components/pages";

import { absoluteUrl } from "@/lib/seo";

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Poetry & Pottery",
            url: absoluteUrl("/about"),
            description:
              "Discover the story of Poetry & Pottery and our handcrafted ceramic journey from Sangli, Maharashtra.",
          }),
        }}
      />
      <AboutPageClient />
    </>
  );
}
