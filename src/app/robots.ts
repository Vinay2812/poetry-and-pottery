import {
  getEventSitemapChunks,
  getProductSitemapChunks,
} from "@/data/sitemap/server";
import type { MetadataRoute } from "next";

import { SITE_URL, absoluteUrl } from "@/lib/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const [productChunks, eventChunks] = await Promise.all([
    getProductSitemapChunks(),
    getEventSitemapChunks(),
  ]);

  const dynamicProductSitemaps = productChunks.map((chunk) =>
    absoluteUrl(`/products/sitemap/${chunk.id}.xml`),
  );
  const dynamicEventSitemaps = eventChunks.map((chunk) =>
    absoluteUrl(`/events/sitemap/${chunk.id}.xml`),
  );

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/cart",
          "/orders",
          "/wishlist",
          "/profile",
          "/events/registrations",
          "/sign-in",
          "/sign-up",
          "/post-login",
        ],
      },
    ],
    sitemap: [
      absoluteUrl("/sitemap.xml"),
      ...dynamicProductSitemaps,
      ...dynamicEventSitemaps,
    ],
    host: SITE_URL,
  };
}
