import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

interface ProductCarouselSkeletonProps {
  className?: string;
  showTitle?: boolean;
}

export function ProductCarouselSkeleton({
  className,
  showTitle = true,
}: ProductCarouselSkeletonProps) {
  return (
    <section className={cn("relative", className)}>
      {showTitle && (
        <div className="mb-4 lg:mb-6">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
      )}

      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="min-w-0 shrink-0 basis-[47%] sm:basis-[34%] lg:basis-[24%]"
          >
            <Skeleton className="aspect-square rounded-xl lg:rounded-2xl" />
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Dots Skeleton */}
      <div className="mt-4 flex justify-center gap-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton
            key={i}
            className={cn("h-2 rounded-full", i === 1 ? "w-6" : "w-2")}
          />
        ))}
      </div>
    </section>
  );
}
