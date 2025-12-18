"use client";

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

import { CATEGORY_ICONS } from "@/lib/constants";

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
  const getIcon = (category: string): LucideIcon => {
    const iconName = CATEGORY_ICONS[category.toLowerCase()];
    return ICON_MAP[iconName] || Circle;
  };

  const formatCategoryName = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <section className="px-4 py-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Shop by Category</h2>
        <Link
          href="/products"
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm transition-colors duration-150"
        >
          SEE ALL <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-8 lg:overflow-visible">
        {categories.map((category, index) => {
          const Icon = getIcon(category);
          const isHiddenOnMobile = index >= 4;
          return (
            <Link
              key={category}
              href={`/products?category=${category.toLowerCase()}`}
              className={`flex min-w-[72px] flex-col items-center gap-2 focus-visible:outline-none ${
                isHiddenOnMobile ? "hidden lg:flex" : ""
              }`}
            >
              <div className="bg-subtle-green hover:bg-accent flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-150">
                <Icon className="text-primary h-6 w-6" />
              </div>
              <span className="text-xs font-medium">
                {formatCategoryName(category)}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
