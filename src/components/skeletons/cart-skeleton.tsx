import { Skeleton } from "@/components/ui/skeleton";

export function CartItemSkeleton() {
  return (
    <div className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm">
      <Skeleton className="h-24 w-24 shrink-0 rounded-xl" />
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
}

export function CartSkeleton() {
  return (
    <main className="pt-14 pb-24 lg:pt-20 lg:pb-0">
      <div className="container mx-auto px-4 py-6 lg:px-8">
        <div className="mb-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-4 lg:col-span-2">
              {[1, 2, 3].map((i) => (
                <CartItemSkeleton key={i} />
              ))}
            </div>

            {/* Order Summary - Desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-4 rounded-2xl border p-6">
                <Skeleton className="h-6 w-32" />
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-px w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <section>
          <Skeleton className="mb-4 h-6 w-40" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
