import { SITE_MEDIA } from "@/consts/site-content";

const FALLBACK_SITE_URL = "https://poetryandpottery.com";

function normalizeSiteUrl(rawDomain: string): string {
  const trimmed = rawDomain.trim();
  if (!trimmed) {
    return FALLBACK_SITE_URL;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export const SITE_NAME = "Poetry & Pottery";
export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_DOMAIN ?? FALLBACK_SITE_URL,
);

export const SITE_METADATA_BASE = (() => {
  try {
    return new URL(SITE_URL);
  } catch {
    return new URL(FALLBACK_SITE_URL);
  }
})();

export function absoluteUrl(pathname: string): string {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalizedPath, SITE_URL).toString();
}

export function resolveSocialImageUrl(imageUrl?: string | null): string {
  if (!imageUrl) {
    return SITE_MEDIA.defaultSocialImage;
  }

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  return absoluteUrl(imageUrl);
}
