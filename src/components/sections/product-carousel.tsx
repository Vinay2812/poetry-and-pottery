"use client";

import type { ProductBase } from "@/data/products/types";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { ProductCard } from "@/components/cards";

import { cn } from "@/lib/utils";

interface ProductCarouselProps {
  products: ProductBase[];
  title?: string;
  subtitle?: string;
  className?: string;
  viewAllHref?: string;
}

export function ProductCarousel({
  products,
  title,
  subtitle,
  className,
  viewAllHref,
}: ProductCarouselProps) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });

  if (products.length === 0) return null;

  return (
    <section className={cn("relative", className)}>
      {(title || subtitle) && (
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center justify-between">
            {title && (
              <h2 className="font-display text-2xl font-bold tracking-tight lg:text-4xl">
                {title}
              </h2>
            )}
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="text-primary text-sm font-medium hover:underline"
              >
                View All &rarr;
              </Link>
            )}
          </div>
          {subtitle && (
            <p className="text-muted-foreground mt-3 max-w-lg text-base lg:mt-4">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-0 shrink-0 basis-[80%] pl-4 sm:basis-[34%] lg:basis-[22%]"
            >
              <ProductCard product={product} disableImageCarousel />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
