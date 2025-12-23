import { Skeleton } from "@/components/ui/skeleton";

export default function EventDetailLoading() {
  return (
    <main className="pt-14 pb-40 lg:pt-20 lg:pb-12">
      <div className="container mx-auto px-0 py-0 lg:px-8 lg:py-12">
        <div className="grid gap-0 lg:grid-cols-3 lg:gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image Skeleton */}
            <Skeleton className="mb-0 aspect-square w-full lg:mb-4 lg:aspect-video lg:rounded-2xl" />

            <div className="px-4 pt-4 lg:px-0 lg:pt-0">
              {/* Title & Price Skeleton */}
              <div className="mb-4 border-b border-neutral-100 pb-4 dark:border-neutral-800">
                <Skeleton className="mb-2 h-4 w-32" />
                <Skeleton className="mb-2 h-10 w-3/4" />
                <Skeleton className="h-8 w-24" />
              </div>

              {/* Quick Info Skeleton */}
              <div className="mb-6 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-neutral-100 py-6 sm:grid-cols-4 dark:border-neutral-800">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="mt-1 h-4 w-4" />
                    <div>
                      <Skeleton className="mb-1 h-3 w-16" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Description Skeleton */}
              <div className="mb-10">
                <Skeleton className="mb-4 h-4 w-40" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>

              {/* What's Included Skeleton */}
              <div className="mb-10">
                <Skeleton className="mb-4 h-4 w-32" />
                <div className="rounded-2xl border border-neutral-50 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Sidebar Skeleton */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-neutral-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <Skeleton className="mb-4 h-4 w-24" />
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
                <div className="my-4 border-t border-neutral-100 dark:border-neutral-800" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
