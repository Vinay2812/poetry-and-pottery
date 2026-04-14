import type { MetadataRoute } from "next";

import { createDate } from "@/lib/date";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
  const now = createDate();

  return STATIC_PUBLIC_ROUTES.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? ("daily" as const) : ("weekly" as const),
    priority: route === "/" ? 1 : 0.8,
  }));
}
