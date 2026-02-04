"use client";

import { CircleAlertIcon } from "lucide-react";
import NextImage, { ImageProps } from "next/image";
import { useCallback, useState } from "react";

import { ImageSkeleton } from "@/components/skeletons";

import { cn } from "@/lib/utils";

export interface OptimizedImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  showLoadingState?: boolean;
  onError?: (error: Error) => void;
}

const DEFAULT_FALLBACK = "/placeholder.jpg";

function FallbackImage({
  width,
  height,
}: {
  width?: number | `${number}`;
  height?: number | `${number}`;
}) {
  const style =
    width && height
      ? { width: Number(width), height: Number(height) }
      : undefined;

  return (
    <div
      className={cn(
        "bg-primary-light absolute inset-0 z-10 flex items-center justify-center overflow-hidden dark:bg-neutral-800",
      )}
      style={style}
    >
      <CircleAlertIcon className="text-primary size-6" />
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
      setIsLoading(false);
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

  const showSkeleton = showLoadingState && isLoading;

  return (
    <>
      {showSkeleton && (
        <ImageSkeleton width={props.width} height={props.height} />
      )}
      {hasError && <FallbackImage width={props.width} height={props.height} />}
      <NextImage
        src={imgSrc}
        alt={alt}
        className={cn(
          "object-cover",
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
