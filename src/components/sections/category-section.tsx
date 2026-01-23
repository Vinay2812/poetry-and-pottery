"use client";

import { CATEGORY_ICONS } from "@/consts/client";
import {
  ArrowRight,
  Circle,
  Coffee,
  Flower2,
  Leaf,
  type LucideIcon,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const ICON_MAP: Record<string, LucideIcon> = {
  Flower2,
  Circle,
  Coffee,
  Leaf,
  Sparkles,
};

interface CategorySectionProps {
  categories: string[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getIcon = (category: string): LucideIcon => {
    const iconName = CATEGORY_ICONS[category.toLowerCase()];
    return ICON_MAP[iconName] || Circle;
  };

  const formatCategoryName = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <section className="container mx-auto px-4 py-6 lg:px-8 lg:py-16">
      <div className="mb-4 flex items-center justify-between lg:mb-6">
        <h2 className="font-display text-xl font-bold tracking-tight lg:text-2xl">
          Shop by Category
        </h2>
        <Link
          href="/products"
          className="group text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-medium transition-colors"
        >
          View All{" "}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div
        className="scrollbar-hide -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-8 lg:gap-6 lg:overflow-visible lg:px-0"
        ref={ref}
      >
        {categories.map((category, index) => {
          const Icon = getIcon(category);
          // Show all on mobile/scroll, grid on desktop
          return (
            <Link
              key={category}
              href={`/products?category=${category.toLowerCase()}`}
              className="group flex min-w-[100px] flex-col items-center gap-3 focus-visible:outline-none lg:min-w-0"
            >
              <div className="bg-secondary/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary relative flex aspect-square w-full items-center justify-center rounded-3xl backdrop-blur-sm transition-all duration-300 group-hover:shadow-lg sm:w-24 lg:w-full lg:rounded-2xl">
                <Icon
                  className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 lg:h-10 lg:w-10"
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-muted-foreground group-hover:text-foreground text-sm font-medium transition-colors duration-300">
                {formatCategoryName(category)}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
