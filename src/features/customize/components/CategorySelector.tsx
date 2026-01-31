"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

import type { CategorySelectorProps } from "../types";

export function CategorySelector({
  categories,
  isLoading,
  onSelect,
}: CategorySelectorProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-xl bg-neutral-200"
          />
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-neutral-500">
          No customizable categories available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-lg font-bold text-neutral-900">
          Choose a Category
        </h2>
        <p className="text-sm text-neutral-500">
          Select the type of pottery you want to customize
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <button
            key={category.category}
            onClick={() => onSelect(category.category)}
            className={cn(
              "group hover:border-primary-light relative flex flex-col items-center rounded-xl border-2 bg-white p-4 text-center transition-all",
              category.isSelected
                ? "border-primary bg-primary-light/30"
                : "shadow-soft border-transparent",
            )}
          >
            {/* Image or Placeholder */}
            <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-full bg-neutral-100">
              {category.imageUrl ? (
                <Image
                  src={category.imageUrl}
                  alt={category.category}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl">
                  {getCategoryEmoji(category.category)}
                </div>
              )}
            </div>

            {/* Name */}
            <span className="text-sm font-semibold text-neutral-900">
              {category.category}
            </span>

            {/* Price */}
            <span className="mt-1 text-xs text-neutral-500">
              From {category.basePriceFormatted}
            </span>

            {/* Options count */}
            <span className="mt-1 text-[10px] text-neutral-400">
              {category.optionsCount} options
            </span>

            {/* Selected indicator */}
            {category.isSelected && (
              <div className="bg-primary absolute top-2 right-2 h-2 w-2 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function getCategoryEmoji(category: string): string {
  const lower = category.toLowerCase();
  if (lower.includes("mug") || lower.includes("cup")) return "☕";
  if (lower.includes("bowl")) return "🥣";
  if (lower.includes("vase")) return "🏺";
  if (lower.includes("plate")) return "🍽️";
  if (lower.includes("pot")) return "🪴";
  return "🏺";
}
