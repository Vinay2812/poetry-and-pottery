import { OptimizedImage } from "@/components/shared";

import { formatPrice } from "@/lib/format";

import type { SearchProductResultItemProps } from "../types";

export function SearchProductResultItem({
  imageUrl,
  name,
  price,
  isOutOfStock,
  onClick,
}: SearchProductResultItemProps) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[10px] bg-neutral-100 dark:bg-neutral-800">
        <OptimizedImage
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {name}
        </p>
        {isOutOfStock && (
          <p className="text-xs text-neutral-500">Out of stock</p>
        )}
      </div>
      <p className="text-primary shrink-0 text-sm font-semibold">
        {formatPrice(price)}
      </p>
    </button>
  );
}
