import { Skeleton } from "@/components/ui/skeleton";

import { CollectionsSectionSkeleton } from "./collections-section-skeleton";
import { ProductCarouselSkeleton } from "./product-carousel-skeleton";
import { TestimonialsSectionSkeleton } from "./testimonials-section-skeleton";
import { WorkshopsSectionSkeleton } from "./workshops-section-skeleton";

export function HomePageSkeleton() {
  return (
    <main className="min-h-screen pt-14 lg:pt-20">
      <section className="container mx-auto px-4 pt-3 pb-8 lg:px-8 lg:pt-4 lg:pb-12">
        <div className="grid items-center gap-8 md:grid-cols-[340px_1fr] md:gap-10 lg:grid-cols-[440px_1fr] lg:gap-16">
          {/* Portrait media frame */}
          <div className="relative mx-auto aspect-4/5 w-full max-w-[400px] overflow-hidden rounded-[1.75rem] shadow-xl ring-1 ring-black/5 md:mx-0 md:max-w-none">
            <Skeleton className="absolute inset-0" />
          </div>

          {/* Copy */}
          <div className="flex flex-col justify-center gap-6 md:pr-2 lg:pr-6">
            <div className="space-y-4">
              <span className="bg-primary-light text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase md:px-4 md:py-1.5 md:text-[11px]">
                <span className="bg-primary inline-block h-1.5 w-1.5 rounded-full" />
                HANDCRAFTED IN SANGLI
              </span>
              <h1 className="font-display text-3xl leading-[1.1] font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl xl:text-6xl">
                Where earth meets artistry
              </h1>
              <p className="text-muted-foreground max-w-md text-sm leading-relaxed md:text-base">
                Each piece tells a story of patience, fire, and the quiet beauty
                of handmade things.
              </p>
            </div>

            <div className="space-y-5">
              <div className="max-w-md space-y-2">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-11/12 rounded" />
                <Skeleton className="h-4 w-2/3 rounded" />
              </div>

              <span className="bg-primary inline-flex h-11 w-fit items-center rounded-full px-6 text-[14px] font-semibold text-white md:h-12 md:px-8 md:text-[15px]">
                Shop Collection
              </span>
            </div>

            <div className="flex flex-wrap gap-2 lg:gap-2.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-24 rounded-full lg:h-10" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <CollectionsSectionSkeleton
          className="container mx-auto px-4 py-8 lg:px-8 lg:py-12"
          title="Shop by Collection"
          subtitle="Explore our curated seasonal collections"
          viewAllHref="/products"
        />
      </section>

      <section>
        <ProductCarouselSkeleton
          className="container mx-auto px-4 py-8 lg:px-8 lg:py-12"
          title="Featured Pieces"
          subtitle="Handpicked pieces for your home."
          viewAllHref="/products"
        />
      </section>

      <section>
        <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <WorkshopsSectionSkeleton />
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-40 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSectionSkeleton />
    </main>
  );
}
