import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

interface ReviewsSkeletonProps {
  count?: number;
  className?: string;
}

export function ReviewsSkeleton({
  count = 3,
  className,
}: ReviewsSkeletonProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          {/* Header with avatar and name */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          {/* Rating stars */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, j) => (
              <Skeleton key={j} className="h-4 w-4" />
            ))}
          </div>

          {/* Review text */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Like button */}
          <Skeleton className="h-8 w-16" />
        </div>
      ))}
    </div>
  );
}
