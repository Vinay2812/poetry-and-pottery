import { MobileHeader } from "@/components/layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersLoading() {
  return (
    <>
      <MobileHeader title="My Orders" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-0 lg:pb-12">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          <Skeleton className="mb-6 hidden h-8 w-32 lg:block" />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border-border rounded-2xl border p-5 shadow-sm"
              >
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
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
