import { OptimizedImage } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

import { getOrderStatusColor } from "../types";
import type { SearchOrderResultItemProps } from "../types";

export function SearchOrderResultItem({
  orderNumber,
  createdAt,
  status,
  productCount,
  firstProductName,
  firstProductImage,
  onClick,
}: SearchOrderResultItemProps) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[10px] bg-neutral-100 dark:bg-neutral-800">
        <OptimizedImage
          src={firstProductImage}
          alt={firstProductName}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
          Order #{orderNumber}
        </p>
        <p className="text-muted-foreground text-xs">
          {createdAt} · {productCount} item{productCount > 1 ? "s" : ""}
        </p>
      </div>
      <Badge
        className={cn("shrink-0 text-[10px]", getOrderStatusColor(status))}
      >
        {status}
      </Badge>
    </button>
  );
}
