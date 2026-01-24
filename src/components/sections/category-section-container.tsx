"use client";

import { useCategoriesWithImagesQuery } from "@/graphql/generated/graphql";

import { CategorySection } from "./category-section";

function CategorySectionSkeleton() {
  return (
    <section>
      <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-16">
        <div className="mb-6 flex items-center justify-between lg:mb-8">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-neutral-200 lg:h-10 lg:w-64" />
          <div className="h-5 w-20 animate-pulse rounded bg-neutral-200" />
        </div>

        {/* Desktop skeleton */}
        <div
          className="hidden lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-4"
          style={{ height: "500px" }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`animate-pulse rounded-2xl bg-neutral-200 ${i === 0 ? "row-span-2" : ""}`}
            />
          ))}
        </div>

        {/* Mobile skeleton */}
        <div className="flex gap-3 overflow-hidden lg:hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[140px] shrink-0 animate-pulse rounded-2xl bg-neutral-200"
              style={{ aspectRatio: "3/4" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CategorySectionContainer() {
  const { data, loading } = useCategoriesWithImagesQuery();

  if (loading || !data) {
    return <CategorySectionSkeleton />;
  }

  return <CategorySection categories={data.categoriesWithImages.slice(0, 8)} />;
}
