"use client";

import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

interface CollectionsSectionSkeletonProps {
  className?: string;
  title?: string;
  subtitle?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
}

export function CollectionsSectionSkeleton({
  className,
  title = "Shop by Collection",
  subtitle = "Explore our curated seasonal collections",
  viewAllLabel = "View All",
  viewAllHref,
}: CollectionsSectionSkeletonProps) {
  return (
    <section className={cn("relative", className)}>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight lg:text-2xl">
            {title}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm lg:text-base">
            {subtitle}
          </p>
        </div>
        {viewAllHref ? (
          <span className="text-primary text-sm font-medium">
            {viewAllLabel}
          </span>
        ) : null}
      </div>

      {/* Grid Layout */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr] lg:gap-6">
        {/* Featured Collection Skeleton */}
        <div className="shadow-soft flex flex-col overflow-hidden rounded-2xl bg-white">
          <Skeleton className="aspect-4/3 min-h-0 w-full lg:aspect-auto lg:flex-1" />
          <div className="p-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="mt-2 h-4 w-full" />
          </div>
        </div>

        {/* List Items Skeleton */}
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="shadow-soft flex items-center gap-4 rounded-xl bg-white p-3"
            >
              <Skeleton className="h-16 w-16 shrink-0 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="mt-1 h-4 w-20" />
              </div>
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
