import { MobileHeader } from "@/components/layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
  return (
    <>
      <MobileHeader title="Product Detail" showBack backHref="/products" />

      <main className="pt-14 pb-40 lg:pt-0 lg:pb-0">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image Gallery Skeleton */}
            <div className="space-y-4">
              <Skeleton className="aspect-square rounded-2xl" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-20 w-20 rounded-xl" />
                ))}
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-8 w-3/4" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-7 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Glaze Selector */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-24" />
                <div className="flex gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-10 w-10 rounded-full" />
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex gap-4">
                  {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-32 w-64 rounded-xl" />
                  ))}
                </div>
              </div>

              {/* Accordion */}
              <div className="space-y-2">
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>

              {/* Add to Cart Button */}
              <div className="hidden gap-3 lg:flex">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="h-12 flex-1 rounded-xl" />
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-12">
            <Skeleton className="mb-6 h-7 w-48" />
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fixed Bottom CTA Skeleton */}
      <div className="border-border fixed right-0 bottom-16 left-0 z-40 border-t bg-white/95 p-4 backdrop-blur-md lg:hidden">
        <div className="flex gap-3">
          <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />
          <Skeleton className="h-12 flex-1 rounded-xl" />
        </div>
      </div>
    </>
  );
}
