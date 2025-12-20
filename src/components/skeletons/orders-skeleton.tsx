import { Skeleton } from "@/components/ui/skeleton";

export function OrderCardSkeleton() {
  return (
    <div className="border-border rounded-2xl border p-5 shadow-sm">
      {/* Status & Date Skeleton */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-5 w-5" />
      </div>

      {/* Product Images Skeleton */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex -space-x-3">
          {[1, 2, 3].map((j) => (
            <Skeleton
              key={j}
              className="h-14 w-14 rounded-xl border-2 border-white"
            />
          ))}
        </div>
        <div className="flex-1 space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      {/* Order ID & Total Skeleton */}
      <div className="border-border flex items-center justify-between border-t pt-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
}

export function OrdersSkeleton() {
  return (
    <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
      <div className="container mx-auto px-4 py-6 lg:px-8">
        <Skeleton className="mb-6 hidden h-8 w-32 lg:block" />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <OrderCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}

export function OrderDetailSkeleton() {
  return (
    <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
      <div className="container mx-auto px-4 py-6 lg:px-8">
        <Skeleton className="mb-6 hidden h-8 w-40 lg:block" />

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Desktop Sidebar Skeleton */}
          <div className="hidden lg:block">
            <div className="shadow-soft space-y-6 rounded-2xl bg-white p-6">
              <Skeleton className="h-12 w-full rounded-xl" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-px w-full" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="lg:col-span-2">
            {/* Mobile Hero Skeleton */}
            <div className="mb-6 lg:hidden">
              <Skeleton className="aspect-square w-full rounded-2xl" />
            </div>

            {/* Title Skeleton */}
            <div className="mb-6 space-y-2 lg:hidden">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>

            {/* Items Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="shadow-soft flex gap-4 rounded-2xl bg-white p-4"
                >
                  <Skeleton className="h-20 w-20 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
