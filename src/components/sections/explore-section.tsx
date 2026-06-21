"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { StaggeredGrid } from "@/components/shared";

import { cn } from "@/lib/utils";

import type { CategoryWithImage } from "@/graphql/generated/graphql";

const CATEGORY_EMOJIS: Record<string, string> = {
  vases: "🏺",
  mugs: "☕",
  plates: "🍽️",
  bowls: "🥣",
  planters: "🪴",
  sets: "🎁",
  cups: "☕",
  pots: "🏺",
  accessories: "✨",
  serveware: "🍽️",
};

interface ExploreSectionProps {
  categories: CategoryWithImage[];
  className?: string;
  /** Render inline chips only (no section wrapper / heading) for embedding. */
  embedded?: boolean;
}

export function ExploreSection({
  categories,
  className,
  embedded = false,
}: ExploreSectionProps) {
  const formatCategoryName = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const chips = (
    <StaggeredGrid className="scrollbar-hide flex flex-wrap gap-2 overflow-x-auto pb-1 lg:gap-2.5">
      {categories.map((category) => {
        const emoji = CATEGORY_EMOJIS[category.name.toLowerCase()] || "🏺";
        return (
          <Link
            key={category.name}
            href={`/products?categories=${encodeURIComponent(category.name)}`}
            className="hover:border-primary hover:bg-primary/5 hover:text-primary border-border flex shrink-0 items-center gap-2 rounded-full border bg-transparent px-3.5 py-2 text-[13px] font-medium text-stone-700 transition-all duration-200 lg:px-4 lg:py-2.5 lg:text-sm"
          >
            <span className="text-base">{emoji}</span>
            {formatCategoryName(category.name)}
          </Link>
        );
      })}
    </StaggeredGrid>
  );

  if (embedded) {
    return (
      <div className={className}>
        <p className="mb-3 text-xs font-semibold tracking-widest text-neutral-500 uppercase">
          Browse by category
        </p>
        {chips}
      </div>
    );
  }

  return (
    <section>
      <div
        className={cn(
          "container mx-auto px-4 py-8 lg:px-8 lg:py-12",
          className,
        )}
      >
        <div className="mb-5 flex items-center justify-between lg:mb-6">
          <h2 className="font-display text-xl font-bold tracking-tight lg:text-2xl">
            Explore
          </h2>
          <Link
            href="/products"
            className="text-primary hover:text-primary-hover group flex items-center gap-1 text-sm font-medium transition-colors"
          >
            View All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {chips}
      </div>
    </section>
  );
}
