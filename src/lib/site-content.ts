// Single entrypoint for fetching per-page content in Server Components.
// The API is the single source of truth for content defaults. When the API
// is unreachable, this helper returns a minimal empty shell so the page
// renders without crashing — it does NOT try to mirror the API's defaults.
import type { Metadata } from "next";

import { getPublicClient } from "@/lib/apollo";

import { BRAND_ASSETS_QUERY } from "@/graphql/brand-assets.query";
import {
  type BrandAssetsQuery,
  type BrandAssetsQueryVariables,
  type PageContentQuery,
  type PageContentQueryVariables,
} from "@/graphql/generated/graphql";
import { PAGE_CONTENT_QUERY } from "@/graphql/page-content.query";

type PageContent = PageContentQuery["pageContent"];
export type BrandAssets = BrandAssetsQuery["brandAssets"];

const EMPTY_PAGE_CONTENT: PageContent = {
  hero: "",
  video: null,
  seo: {
    title: "Poetry & Pottery",
    description: "",
    ogImage: "",
    ogTitle: "Poetry & Pottery",
    ogDescription: "",
  },
  tagline: { heading: "", subheading: "", ctaText: "" },
} as PageContent;

const EMPTY_BRAND_ASSETS: BrandAssets = {
  logo: "",
  logoDark: "",
  favicon: "/favicon.ico",
  appleTouchIcon: "/apple-touch-icon.png",
  defaultOgImage: "",
} as BrandAssets;

export async function getPageContent(pageSlug: string): Promise<PageContent> {
  try {
    const { data } = await getPublicClient().query<
      PageContentQuery,
      PageContentQueryVariables
    >({
      query: PAGE_CONTENT_QUERY,
      variables: { pageSlug },
      context: { fetchOptions: { next: { tags: ["site-content"] } } },
    });
    if (!data?.pageContent) return EMPTY_PAGE_CONTENT;
    return data.pageContent;
  } catch (err) {
    console.warn(
      `[site-content] pageContent(${pageSlug}) failed, rendering empty shell:`,
      err,
    );
    return EMPTY_PAGE_CONTENT;
  }
}

export async function buildMetadataFromSeo(
  pageSlug: string,
): Promise<Metadata> {
  const { seo } = await getPageContent(pageSlug);
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

export async function getBrandAssets(): Promise<BrandAssets> {
  try {
    const { data } = await getPublicClient().query<
      BrandAssetsQuery,
      BrandAssetsQueryVariables
    >({
      query: BRAND_ASSETS_QUERY,
      context: { fetchOptions: { next: { tags: ["site-content"] } } },
    });
    if (!data?.brandAssets) return EMPTY_BRAND_ASSETS;
    return data.brandAssets;
  } catch (err) {
    console.warn(
      "[site-content] brandAssets failed, rendering empty shell:",
      err,
    );
    return EMPTY_BRAND_ASSETS;
  }
}
