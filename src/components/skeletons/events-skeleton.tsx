import { Skeleton } from "@/components/ui/skeleton";

export function EventCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      {/* Image with badges */}
      <div className="relative aspect-[4/3]">
        <Skeleton className="h-full w-full" />
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        {/* Price pill */}
        <div className="absolute right-3 bottom-3">
          <Skeleton className="h-7 w-16 rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 p-4">
        {/* Title and date/time */}
        <div className="space-y-1">
          <Skeleton className="h-5 w-3/4" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Description */}
        <Skeleton className="h-4 w-full" />

        {/* Footer - location and seats */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

export function EventsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function EventsTabsSkeleton() {
  return (
    <div className="mb-6 flex gap-2 overflow-x-auto">
      <Skeleton className="h-10 w-32 shrink-0 rounded-full" />
      <Skeleton className="h-10 w-36 shrink-0 rounded-full" />
    </div>
  );
}

export function EventsListLayoutSkeleton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
      <div className="container mx-auto px-4 py-6 lg:px-8">
        {/* Header - desktop only */}
        <div className="mb-6 hidden lg:block">
          <Skeleton className="mb-2 h-8 w-48" />
          <Skeleton className="h-4 w-80" />
        </div>

        {/* Tabs */}
        <EventsTabsSkeleton />

        {/* Content */}
        {children}
      </div>
    </main>
  );
}

export function EventsSkeleton() {
  return (
    <EventsListLayoutSkeleton>
      <EventsGridSkeleton />
    </EventsListLayoutSkeleton>
  );
}

export function EventDetailSkeleton() {
  return (
    <main className="pt-14 pb-40 lg:pt-20 lg:pb-12">
      <div className="container mx-auto px-4 py-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Image */}
            <Skeleton className="mb-6 aspect-video w-full rounded-2xl" />

            {/* Title & Meta */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Info Grid */}
            <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2 rounded-xl bg-neutral-50 p-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-5 w-24" />
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:col-span-2 lg:block">
            <div className="sticky top-24 space-y-4 rounded-2xl border p-6">
              <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="h-px w-full" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="border-border fixed right-0 bottom-16 left-0 z-40 border-t bg-white/95 p-4 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-12 w-40 rounded-xl" />
        </div>
      </div>
    </main>
  );
}
