"use client";

import { useCategoriesWithImagesQuery } from "@/graphql/generated/graphql";

import { ExploreSection } from "./explore-section";

function ExploreSectionSkeleton() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
        <div className="mb-5 flex items-center justify-between lg:mb-6">
          <div className="h-7 w-24 animate-pulse rounded-lg bg-stone-200" />
          <div className="h-5 w-20 animate-pulse rounded bg-stone-200" />
        </div>
        <div className="flex gap-2.5 overflow-hidden lg:gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-28 shrink-0 animate-pulse rounded-full bg-stone-200 lg:h-12 lg:w-32"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExploreSectionContainer() {
  const { data, loading } = useCategoriesWithImagesQuery();

  if (loading || !data) {
    return <ExploreSectionSkeleton />;
  }

  return <ExploreSection categories={data.categoriesWithImages.slice(0, 8)} />;
}
