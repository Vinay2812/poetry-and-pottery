"use client";

import { ExploreSectionSkeleton } from "@/components/skeletons";

import { useCategoriesWithImagesQuery } from "@/graphql/generated/graphql";

import { ExploreSection } from "./explore-section";

export function ExploreSectionContainer() {
  const { data, loading } = useCategoriesWithImagesQuery();

  if (loading || !data) {
    return <ExploreSectionSkeleton />;
  }

  return <ExploreSection categories={data.categoriesWithImages.slice(0, 8)} />;
}
