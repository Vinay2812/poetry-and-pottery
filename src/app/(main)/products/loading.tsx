import { MobileHeader } from "@/components/layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <>
      <MobileHeader title="Shop Pottery" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-0 lg:pb-0">
        {/* Mobile Category Pills Skeleton */}
        <div className="scrollbar-hide border-border/50 flex gap-2 overflow-x-auto border-b px-4 py-3 lg:hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-8 w-20 shrink-0 rounded-full" />
          ))}
        </div>

        {/* Mobile Filter Bar Skeleton */}
        <div className="bg-background sticky top-14 z-40 flex items-center gap-2 px-4 py-3 lg:hidden">
          <Skeleton className="h-9 w-24 rounded-full" />
          <Skeleton className="h-9 w-48 rounded-full" />
        </div>

        <div className="container mx-auto px-4 py-2 lg:px-8 lg:py-6">
          <div className="flex gap-8">
            {/* Desktop Sidebar Skeleton */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-20">
                <Skeleton className="mb-6 h-7 w-24" />
                <div className="space-y-6">
                  {/* Categories */}
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-32" />
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Skeleton key={i} className="h-5 w-full" />
                    ))}
                  </div>
                  {/* Materials */}
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-28" />
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-5 w-full" />
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid Skeleton */}
            <div className="flex-1">
              {/* Desktop Sort Bar */}
              <div className="mb-6 hidden items-center justify-between lg:flex">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-48" />
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-square rounded-xl lg:rounded-2xl" />
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
