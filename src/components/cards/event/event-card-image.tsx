import type { ReactNode } from "react";

import { OptimizedImage } from "@/components/shared";

interface EventCardImageProps {
  src: string;
  alt: string;
  topLeftBadge?: ReactNode;
  bottomRightBadge?: ReactNode;
}

export function EventCardImage({
  src,
  alt,
  topLeftBadge,
  bottomRightBadge,
}: EventCardImageProps) {
  return (
    <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
      />

      {topLeftBadge && (
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {topLeftBadge}
        </div>
      )}

      {bottomRightBadge && (
        <div className="absolute right-3 bottom-3">{bottomRightBadge}</div>
      )}
    </div>
  );
}
