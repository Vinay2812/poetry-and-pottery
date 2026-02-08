import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

const STATIC_PUBLIC_ROUTES = [
  "/",
  "/products",
  "/events",
  "/events/daily-workshops",
  "/customize",
  "/about",
  "/faq",
  "/contact",
  "/care",
  "/shipping",
  "/privacy",
  "/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return STATIC_PUBLIC_ROUTES.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? ("daily" as const) : ("weekly" as const),
    priority: route === "/" ? 1 : 0.8,
  }));
}
