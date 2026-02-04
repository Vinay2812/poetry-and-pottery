import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

interface ProductCarouselSkeletonProps {
  className?: string;
  showTitle?: boolean;
  title?: string;
  subtitle?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
}

export function ProductCarouselSkeleton({
  className,
  showTitle = true,
  title = "Curated Favorites",
  subtitle = "Handpicked pieces for your home.",
  viewAllLabel = "View All →",
  viewAllHref,
}: ProductCarouselSkeletonProps) {
  return (
    <section className={cn("relative", className)}>
      {showTitle && (
        <div className="mb-4 lg:mb-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold tracking-tight lg:text-2xl">
              {title}
            </h2>
            {viewAllHref ? (
              <span className="text-primary text-sm font-medium">
                {viewAllLabel}
              </span>
            ) : null}
          </div>
          {subtitle && (
            <p className="text-muted-foreground mt-3 max-w-lg text-base lg:mt-4">
              {subtitle}
            </p>
          )}
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
