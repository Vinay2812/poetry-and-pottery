"use client";

import { CircleAlertIcon, Loader2 } from "lucide-react";
import NextImage, { ImageProps } from "next/image";
import { useCallback, useState } from "react";

import { cn } from "@/lib/utils";

import { Skeleton } from "../ui/skeleton";

export interface OptimizedImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  showLoadingState?: boolean;
  onError?: (error: Error) => void;
}

const DEFAULT_FALLBACK = "/placeholder.jpg";

function ImageSkeleton({
  width,
  height,
}: {
  width?: number | `${number}`;
  height?: number | `${number}`;
}) {
  return (
    <div
      className={cn(
        "bg-primary-light absolute inset-0 flex items-center justify-center overflow-hidden dark:bg-neutral-800",
        width && height && `w-[${width}px] h-[${height}px]`,
      )}
    >
      <div className="relative z-10">
        <Loader2 className="text-primary size-6 animate-spin" />
      </div>
    </div>
  );
}

function FallbackImage({
  width,
  height,
}: {
  width?: number | `${number}`;
  height?: number | `${number}`;
}) {
  return (
    <div
      className={cn(
        "bg-primary-light absolute inset-0 z-10 flex items-center justify-center overflow-hidden dark:bg-neutral-800",
        width && height && `w-[${width}px] h-[${height}px]`,
      )}
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
