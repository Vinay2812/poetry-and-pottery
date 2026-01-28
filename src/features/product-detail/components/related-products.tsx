"use client";

import type { ProductBase } from "@/data/products/types";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { ProductCard } from "@/components/cards";

import { cn } from "@/lib/utils";

interface RelatedProductsProps {
  products: ProductBase[];
  title?: string;
  viewAllHref?: string;
  className?: string;
}

export function RelatedProducts({
  products,
  title = "You Might Also Like",
  viewAllHref = "/products",
  className,
}: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const totalItems = products.length + 1; // +1 for View All card

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;

    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);

    // Estimate current index based on scroll position
    const children = el.children;
    if (children.length === 0) return;
    const firstChild = children[0] as HTMLElement;
    const cardWidth = firstChild.offsetWidth;
    const gap = 12; // approximate gap
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setCurrentIndex(Math.min(index, totalItems - 1));
  }, [totalItems]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  const scrollToDirection = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const children = el.children;
    if (children.length === 0) return;
    const firstChild = children[0] as HTMLElement;
    const cardWidth = firstChild.offsetWidth;
    const gap = parseFloat(getComputedStyle(el).gap) || 16;

    const scrollAmount =
      direction === "right" ? cardWidth + gap : -(cardWidth + gap);

    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }, []);

  if (products.length === 0) return null;

  // Calculate dot count for mobile pagination
  const dotCount = Math.min(5, Math.ceil(totalItems / 2));

  return (
    <section className={cn("relative", className)}>
      {/* Header */}
      <div className="mb-5 flex items-center justify-between px-4 lg:mb-6 lg:px-0">
        <h2 className="font-display text-lg font-bold tracking-tight text-neutral-900 lg:text-2xl">
          {title}
        </h2>

        <div className="flex items-center gap-3">
          {/* View All Link - tablet+ */}
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-primary hidden text-sm font-medium hover:underline md:inline-flex"
            >
              View All &rarr;
            </Link>
          )}

          {/* Arrow Navigation - desktop only */}
          <div className="hidden items-center gap-2 lg:flex">
            <span className="text-xs text-neutral-400">
              {currentIndex + 1} / {totalItems}
            </span>
            <button
              onClick={() => scrollToDirection("left")}
              disabled={!canScrollLeft}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 transition-colors hover:bg-neutral-50 disabled:opacity-30"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToDirection("right")}
              disabled={!canScrollRight}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 transition-colors hover:bg-neutral-50 disabled:opacity-30"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pr-4 pl-4 md:gap-4 lg:gap-5 lg:pr-0 lg:pl-0"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[156px] shrink-0 snap-start md:w-[200px] lg:w-[240px]"
          >
            <ProductCard product={product} disableImageCarousel />
          </div>
        ))}

        {/* View All End Card */}
        <Link
          href={viewAllHref}
          className="flex w-[156px] shrink-0 snap-start flex-col items-center justify-center rounded-2xl bg-neutral-50 transition-colors hover:bg-neutral-100 md:w-[200px] lg:w-[240px]"
        >
          <div className="bg-primary/10 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
            <ArrowRight className="text-primary h-5 w-5" />
          </div>
          <span className="text-primary text-sm font-semibold">View All</span>
          <span className="mt-0.5 text-xs text-neutral-500">
            Browse collection
          </span>
        </Link>
      </div>

      {/* Dot Pagination - mobile only */}
      <div className="mt-4 flex justify-center gap-1.5 lg:hidden">
        {Array.from({ length: dotCount }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              Math.floor(currentIndex / 2) === i
                ? "bg-primary w-4"
                : "w-1.5 bg-neutral-300",
            )}
          />
        ))}
      </div>
    </section>
  );
}
