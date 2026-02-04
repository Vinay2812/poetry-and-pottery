"use client";

import { CategorySectionSkeleton } from "@/components/skeletons";

import { useCategoriesWithImagesQuery } from "@/graphql/generated/graphql";

import { CategorySection } from "./category-section";

export function CategorySectionContainer() {
  const { data, loading } = useCategoriesWithImagesQuery();

  if (loading || !data) {
    return <CategorySectionSkeleton />;
  }

  return <CategorySection categories={data.categoriesWithImages.slice(0, 8)} />;
}
