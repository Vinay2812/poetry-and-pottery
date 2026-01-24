"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { CategoryWithImage } from "@/graphql/generated/types";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=800&fit=crop";

interface CategorySectionProps {
  categories: CategoryWithImage[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  const formatCategoryName = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <section>
      <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-16">
        <div className="mb-6 flex items-center justify-between lg:mb-8">
          <h2 className="font-display text-2xl font-bold tracking-tight lg:text-4xl">
            Shop by Category
          </h2>
          <Link
            href="/products"
            className="text-primary hover:text-primary-hover group flex items-center gap-1 text-sm font-medium transition-colors"
          >
            View All{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 lg:mx-0 lg:gap-4 lg:px-0">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${category.name.toLowerCase()}`}
              className="group relative h-32 min-w-[160px] shrink-0 overflow-hidden rounded-2xl lg:h-40 lg:min-w-[200px] lg:flex-1"
            >
              <Image
                src={category.image_url || FALLBACK_IMAGE}
                alt={formatCategoryName(category.name)}
                fill
                className="object-cover blur-xs brightness-50 transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 20vw, 160px"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-base font-bold tracking-wide text-white lg:text-lg">
                  {formatCategoryName(category.name)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
