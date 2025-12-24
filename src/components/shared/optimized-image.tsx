"use client";

import NextImage, { ImageProps } from "next/image";
import { useCallback, useState } from "react";

import { cn } from "@/lib/utils";

export interface OptimizedImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  showLoadingState?: boolean;
  onError?: (error: Error) => void;
}

const DEFAULT_FALLBACK = "/placeholder.jpg";

function ImageSkeleton() {
  return (
    <div className="bg-primary-light absolute inset-0 flex items-center justify-center overflow-hidden dark:bg-neutral-800">
      <div className="relative z-10">
        <div className="border-t-primary dark:border-t-primary h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 dark:border-neutral-600" />
      </div>
    </div>
  );
}

export function OptimizedImage({
  src,
  alt,
  className,
  fallbackSrc = DEFAULT_FALLBACK,
  showLoadingState = true,
  onError,
  sizes,
  loading = "lazy",
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
      onError?.(new Error(`Failed to load image: ${src}`));
    }
  }, [src, fallbackSrc, hasError, onError]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Default sizes for responsive images if not provided and using fill
  const defaultSizes =
    props.fill && !sizes
      ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      : sizes;

  return (
    <>
      {showLoadingState && isLoading && <ImageSkeleton />}
      <NextImage
        src={imgSrc}
        alt={alt}
        className={cn(
          "object-cover",
          // When fill is true, use absolute positioning to fill parent container
          // This matches Next.js Image behavior with fill prop
          // fill ? "absolute inset-0 h-full w-full" : "h-full w-full",
          isLoading && "opacity-0",
          !isLoading && "opacity-100 transition-opacity duration-300",
          className,
        )}
        loading={loading}
        sizes={defaultSizes}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </>
  );
}
