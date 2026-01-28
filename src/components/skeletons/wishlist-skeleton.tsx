import { Skeleton } from "@/components/ui/skeleton";

import { ProductCardSkeleton } from "./products-skeleton";

export function WishlistSkeleton() {
  return (
    <main className="pt-14 pb-24 lg:pt-20 lg:pb-0">
      <div className="container mx-auto px-4 py-6 lg:px-8">
        {/* Header - Items count */}
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Grid */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>

        {/* Recommendations */}
        <section>
          <Skeleton className="mb-4 h-6 w-40" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
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
