"use client";

import { useEffect } from "react";

interface ImagePreloaderProps {
  /** Image URLs to warm into the browser cache. */
  images: readonly string[];
  /**
   * Skip the first N images — they're usually rendered with `priority` and
   * already requested by the time this runs.
   */
  skip?: number;
  /**
   * `next/image` candidate widths to prefetch. Defaults are the device sizes
   * the hero slot resolves to across breakpoints/DPRs (desktop ~440px → 640/1080,
   * tablet/mobile → 640/750/1080), so the warmed entry matches the URL the
   * carousel actually requests.
   */
  widths?: number[];
  /** Quality used by the target `next/image` (its default is 75). */
  quality?: number;
}

/**
 * Renders nothing. On mount it prefetches the optimized `next/image` URLs for
 * the given images during browser idle time, so a carousel/gallery can swap to
 * later slides without a visible load. Prefetching the optimized URLs (not the
 * raw source) is what lets the warmed entries actually hit the cache, since
 * `next/image` requests `/_next/image?url=...&w=...&q=...`.
 */
export function ImagePreloader({
  images,
  skip = 0,
  widths = [640, 750, 1080],
  quality = 75,
}: ImagePreloaderProps) {
  useEffect(() => {
    const targets = images.slice(skip).filter(Boolean);
    if (targets.length === 0) return;

    let cancelled = false;

    const warm = () => {
      if (cancelled) return;
      for (const src of targets) {
        for (const width of widths) {
          const img = new Image();
          img.decoding = "async";
          img.src = `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
        }
      }
    };

    // Warm during idle time so it never competes with the LCP image.
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(warm, { timeout: 3000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(warm, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [images, skip, widths, quality]);

  return null;
}
