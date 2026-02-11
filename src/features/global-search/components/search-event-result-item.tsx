import { formatPrice } from "@/lib/format";

import type { SearchEventResultItemProps } from "../types";

export function SearchEventResultItem({
  title,
  startsAt,
  startsAtTime,
  location,
  price,
  onClick,
}: SearchEventResultItemProps) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
    >
      <div className="bg-primary/10 flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-[10px]">
        <span className="text-primary text-[10px] leading-none font-bold uppercase">
          {startsAt.split(" ")[0]}
        </span>
        <span className="text-primary text-base leading-none font-bold">
          {startsAt.split(" ")[1]?.replace(",", "")}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {title}
        </p>
        <p className="text-muted-foreground truncate text-xs">
          {startsAtTime} · {location}
        </p>
      </div>
      <p className="text-primary shrink-0 text-sm font-semibold">
        {formatPrice(price)}
      </p>
    </button>
  );
}
