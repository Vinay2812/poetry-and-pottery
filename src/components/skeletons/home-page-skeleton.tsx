import { Skeleton } from "@/components/ui/skeleton";

import { CollectionsSectionSkeleton } from "./collections-section-skeleton";
import { ExploreSectionSkeleton } from "./explore-section-skeleton";
import { ProductCarouselSkeleton } from "./product-carousel-skeleton";
import { TestimonialsSectionSkeleton } from "./testimonials-section-skeleton";
import { WorkshopsSectionSkeleton } from "./workshops-section-skeleton";

export function HomePageSkeleton() {
  return (
    <main className="min-h-screen pt-14 lg:pt-20">
      <section className="md:container md:mx-auto md:px-4 md:py-4 lg:px-8 lg:py-6">
        <div className="relative aspect-4/3 w-full overflow-hidden md:aspect-5/3 md:rounded-[2rem] md:shadow-xl lg:aspect-21/9 lg:rounded-[2.5rem]">
          <Skeleton className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.85)] via-[rgba(26,26,26,0.3)] to-transparent lg:bg-gradient-to-r lg:from-[rgba(26,26,26,0.85)] lg:via-[rgba(26,26,26,0.4)] lg:to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8 lg:p-12 lg:px-16">
            <div className="max-w-xl space-y-3">
              <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md md:px-4 md:py-1.5 md:text-[11px]">
                HANDCRAFTED IN SANGLI
              </span>
              <h1 className="font-display text-2xl leading-[1.15] font-bold tracking-tight text-white md:text-4xl lg:text-6xl">
                Where earth meets artistry
              </h1>
              <p className="max-w-md text-xs leading-relaxed text-white/85 md:text-sm lg:text-base">
                Each piece tells a story of patience, fire, and the quiet beauty
                of handmade things.
              </p>
              <div className="flex gap-2.5 pt-2 pb-6 md:gap-3 md:pt-0 md:pb-0">
                <span className="bg-primary inline-flex h-9 items-center rounded-lg px-5 text-[13px] font-semibold text-white md:h-11 md:rounded-[10px] md:px-7 md:text-[15px] lg:h-12">
                  Shop
                </span>
                <span className="inline-flex h-9 items-center rounded-lg border-[1.5px] border-white/40 px-5 text-[13px] font-medium text-white md:h-11 md:rounded-[10px] md:px-7 md:text-[15px] lg:h-12">
                  Our Story
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ExploreSectionSkeleton />

      <section className="bg-white">
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

      <section className="bg-white">
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
