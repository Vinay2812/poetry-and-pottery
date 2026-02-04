import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

interface ImageSkeletonProps {
  width?: number | `${number}`;
  height?: number | `${number}`;
  className?: string;
}

export function ImageSkeleton({
  width,
  height,
  className,
}: ImageSkeletonProps) {
  const style =
    width && height
      ? { width: Number(width), height: Number(height) }
      : undefined;

  return (
    <Skeleton
      className={cn(
        "bg-primary-light absolute inset-0 flex items-center justify-center overflow-hidden dark:bg-neutral-800",
        className,
      )}
      style={style}
    />
  );
}
