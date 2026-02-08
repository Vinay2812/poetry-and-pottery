import {
  getProductSitemapChunks,
  getProductSitemapEntriesByChunk,
} from "@/data/sitemap/server";
import type { MetadataRoute } from "next";

export async function generateSitemaps() {
  return getProductSitemapChunks();
}

export default async function sitemap({
  id,
}: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const sitemapIdRaw = await id;
  const sitemapId = Number.parseInt(sitemapIdRaw, 10);
  const normalizedSitemapId = Number.isNaN(sitemapId) ? 0 : sitemapId;
  return getProductSitemapEntriesByChunk(normalizedSitemapId);
}
