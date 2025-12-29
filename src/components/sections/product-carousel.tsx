"use client";

import type { ProductWithCategories } from "@/types";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

import { ProductCard } from "@/components/cards";

import { cn } from "@/lib/utils";

interface ProductCarouselProps {
  products: ProductWithCategories[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function ProductCarousel({
  products,
  title,
  subtitle,
  className,
}: ProductCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });

  useEffect(() => {
    if (!emblaApi) return;

    function updateScrollSnaps() {
      if (!emblaApi) return;
      setScrollSnaps(emblaApi.scrollSnapList());
    }

    function onSelect() {
      if (!emblaApi) return;
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }

    updateScrollSnaps();
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  if (products.length === 0) return null;

  return (
    <section className={cn("relative", className)}>
      {(title || subtitle) && (
        <div className="mb-4 lg:mb-6">
          {title && (
            <h2 className="text-xl font-bold tracking-tight lg:text-2xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-muted-foreground mt-2 text-sm lg:text-base">
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
              className="min-w-0 shrink-0 basis-[85%] pl-4 sm:basis-[45%] lg:basis-[24%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Dots */}
      {scrollSnaps.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                index === selectedIndex
                  ? "bg-primary w-6"
                  : "bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-600",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
