"use client";

import { useUIStore } from "@/store/ui.store";
import { useCallback } from "react";

interface ShareOptions {
  title: string;
  text?: string;
  url?: string;
}

export function useShare() {
  const { addToast } = useUIStore();

  const share = useCallback(
    async ({ title, text, url }: ShareOptions) => {
      const shareUrl = url || window.location.href;
      const shareData = {
        title,
        text: text || title,
        url: shareUrl,
      };

      // Use Web Share API if available
      if (navigator.share && navigator.canShare?.(shareData)) {
        try {
          await navigator.share(shareData);
          return { success: true };
        } catch (error) {
          // User cancelled or error occurred
          if ((error as Error).name !== "AbortError") {
            console.error("Share failed:", error);
          }
          return { success: false };
        }
      }

      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        addToast({
          type: "success",
          message: "Link copied to clipboard!",
          duration: 3000,
        });
        return { success: true };
      } catch {
        addToast({
          type: "error",
          message: "Failed to copy link",
        });
        return { success: false };
      }
    },
    [addToast],
  );

  return { share };
}
