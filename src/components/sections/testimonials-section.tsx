"use client";

import { Star } from "lucide-react";

import { Marquee } from "@/components/ui/marquee";

import type { FeaturedReviewsQuery } from "@/graphql/generated/types";

interface TestimonialsSectionProps {
  reviews: FeaturedReviewsQuery["featuredReviews"];
}

interface TestimonialCardProps {
  rating: number;
  text: string;
  name: string;
  initial: string;
}

function TestimonialCard({
  rating,
  text,
  name,
  initial,
}: TestimonialCardProps) {
  return (
    <div className="flex w-[300px] shrink-0 flex-col gap-3 rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
              i < rating
                ? "fill-amber-400 text-amber-400"
                : "fill-neutral-200 text-neutral-200"
            }`}
          />
        ))}
      </div>
      <p className="text-[13px] leading-relaxed text-neutral-600">
        &ldquo;{text}&rdquo;
      </p>
      <div className="mt-auto flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8ddd4] text-[11px] font-bold text-[#8b7355]">
          {initial}
        </div>
        <span className="text-foreground text-xs font-semibold">{name}</span>
      </div>
    </div>
  );
}

export function TestimonialsSection({ reviews }: TestimonialsSectionProps) {
  const testimonials = reviews
    .filter((r) => r.review)
    .map((r) => ({
      id: r.id,
      rating: r.rating,
      text: r.review!,
      name: r.user.name || "Anonymous",
      initial: (r.user.name || "A").charAt(0).toUpperCase(),
    }));

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
      <div className="mb-6 flex flex-col lg:mb-8">
        <h2 className="font-display text-xl font-bold tracking-tight lg:text-2xl">
          Loved by Our Community
        </h2>
        <p className="text-muted-foreground mt-3 max-w-md text-sm lg:text-base">
          Join hundreds of happy pottery enthusiasts
        </p>
      </div>

      <div className="relative overflow-hidden py-2">
        {/* Edge fades */}
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r to-transparent lg:w-20" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l to-transparent lg:w-20" />

        <Marquee pauseOnHover className="[--duration:30s] [--gap:1.25rem]">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              rating={testimonial.rating}
              text={testimonial.text}
              name={testimonial.name}
              initial={testimonial.initial}
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
