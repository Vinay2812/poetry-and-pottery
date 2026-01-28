"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { StaggeredGrid } from "@/components/shared";

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
}

export function ExploreSection({ categories }: ExploreSectionProps) {
  const formatCategoryName = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
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

        <StaggeredGrid className="scrollbar-hide flex gap-2.5 overflow-x-auto pb-1 lg:gap-3">
          {categories.map((category) => {
            const emoji = CATEGORY_EMOJIS[category.name.toLowerCase()] || "🏺";
            return (
              <Link
                key={category.name}
                href={`/products?category=${category.name.toLowerCase()}`}
                className="hover:border-primary/30 hover:bg-primary/5 hover:text-primary flex shrink-0 items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-all duration-200 lg:px-5 lg:py-3 lg:text-base"
              >
                <span className="text-base lg:text-lg">{emoji}</span>
                {formatCategoryName(category.name)}
              </Link>
            );
          })}
        </StaggeredGrid>
      </div>
    </section>
  );
}
