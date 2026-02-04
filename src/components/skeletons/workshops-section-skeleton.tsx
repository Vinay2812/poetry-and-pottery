import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";

function EventCategorySkeleton({
  title,
  viewAllHref,
}: {
  title: string;
  viewAllHref: string;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between lg:mb-4">
        <h3 className="text-sm font-semibold text-stone-700 lg:text-base">
          {title}
        </h3>
        <Link
          href={viewAllHref}
          className="text-primary hover:text-primary-hover text-xs font-medium transition-colors"
        >
          View All →
        </Link>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="shadow-soft flex items-center gap-4 rounded-2xl bg-white p-4 lg:p-5"
          >
            <Skeleton className="aspect-4/3 w-16 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorkshopsSectionSkeleton() {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between lg:mb-6">
        <h2 className="font-display text-xl font-bold tracking-tight lg:text-2xl">
          <span className="hidden lg:inline">Upcoming </span>Events
        </h2>
      </div>
      <div className="space-y-6">
        <EventCategorySkeleton
          title="Pottery Workshops"
          viewAllHref="/events/upcoming?type=workshop"
        />
        <EventCategorySkeleton
          title="Poetry Open Mics"
          viewAllHref="/events/upcoming?type=open_mic"
        />
      </div>
    </div>
  );
}
