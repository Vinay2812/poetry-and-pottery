"use client";

import { ExploreSectionSkeleton } from "@/components/skeletons";

import { useCategoriesWithImagesQuery } from "@/graphql/generated/graphql";

import { ExploreSection } from "./explore-section";

interface ExploreSectionContainerProps {
  className?: string;
  embedded?: boolean;
}

export function ExploreSectionContainer({
  className,
  embedded,
}: ExploreSectionContainerProps) {
  const { data, loading } = useCategoriesWithImagesQuery();

  if (loading || !data) {
    return embedded ? null : <ExploreSectionSkeleton />;
  }

  return (
    <ExploreSection
      categories={data.categoriesWithImages.slice(0, 8)}
      className={className}
      embedded={embedded}
    />
  );
}
