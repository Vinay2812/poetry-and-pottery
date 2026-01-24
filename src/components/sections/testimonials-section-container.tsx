"use client";

import { useFeaturedReviewsQuery } from "@/graphql/generated/graphql";

import { TestimonialsSection } from "./testimonials-section";

function TestimonialsSectionSkeleton() {
  return (
    <section className="container mx-auto px-4 py-8 lg:px-8 lg:py-16">
      <div className="mb-6 text-center lg:mb-8">
        <div className="mx-auto h-8 w-64 animate-pulse rounded-lg bg-neutral-200 lg:h-10 lg:w-80" />
        <div className="mx-auto mt-3 h-5 w-48 animate-pulse rounded bg-neutral-200" />
      </div>

      <div className="flex gap-5 overflow-hidden py-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-[300px] shrink-0 animate-pulse rounded-2xl bg-neutral-200 p-6"
            style={{ height: "160px" }}
          />
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSectionContainer() {
  const { data, loading } = useFeaturedReviewsQuery({
    variables: { limit: 10 },
  });

  if (loading || !data) {
    return <TestimonialsSectionSkeleton />;
  }

  return <TestimonialsSection reviews={data.featuredReviews} />;
}
