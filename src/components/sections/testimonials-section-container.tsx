"use client";

import { TestimonialsSectionSkeleton } from "@/components/skeletons";

import { useFeaturedReviewsQuery } from "@/graphql/generated/graphql";

import { TestimonialsSection } from "./testimonials-section";

export function TestimonialsSectionContainer() {
  const { data, loading } = useFeaturedReviewsQuery({
    variables: { limit: 10 },
  });

  if (loading || !data) {
    return <TestimonialsSectionSkeleton />;
  }

  return <TestimonialsSection reviews={data.featuredReviews} />;
}
