// Public site content is hardcoded in src/consts/site-content.ts — edit values
// there, not via the dashboard.
import { SITE_SEO } from "@/consts/site-content";
import type { Metadata } from "next";

export function buildMetadataFromSeo(pageSlug: string): Metadata {
  const seo = SITE_SEO;
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
  };
}
