import { unstable_noStore as noStore } from "next/cache";

import { AboutPageClient } from "@/components/pages";

import { absoluteUrl } from "@/lib/seo";

/**
 * Route: /about
 * Page does: Brand story page with sections for journey, values, stats, team, and conversion CTAs.
 * Key UI operations:
 * - Read narrative sections and follow CTA links to workshops or product discovery.
 * - Navigate between informational sections optimized for mobile and desktop layouts.
 * UI info needed for operations:
 * - About-page section content (story copy, metrics, team/member data, CTA labels and links).
 * - Media assets and section ordering used by the about page client composition.
 */
export default function AboutPage() {
  noStore();

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
