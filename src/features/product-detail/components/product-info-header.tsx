import type { ProductDetail as ProductDetailType } from "@/data/products/types";

import { Rating } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

import type { ProductAvailabilityStatus } from "../types";
import { StatusBadges } from "./status-badges";

interface ProductInfoHeaderProps {
  product: ProductDetailType;
  availabilityStatus: ProductAvailabilityStatus;
}

export function ProductInfoHeader({
  product,
  availabilityStatus,
}: ProductInfoHeaderProps) {
  const category = product.categories[0] || product.material || "Pottery";

  return (
    <div className="mb-4 md:mb-6">
      <StatusBadges availabilityStatus={availabilityStatus} />

      <Badge variant="primary" size="sm" className="mb-3">
        {category}
      </Badge>

      <h1 className="font-display mb-2 text-xl font-bold tracking-tight text-neutral-900 md:text-2xl lg:text-3xl dark:text-white">
        {product.name}
      </h1>

      {product.reviews_count > 0 && (
        <div className="mb-3 flex items-center gap-2">
          <Rating
            rating={product.avg_rating}
            reviewCount={product.reviews_count}
            size="sm"
          />
        </div>
      )}

      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            "text-xl font-bold md:text-2xl",
            availabilityStatus.isUnavailable
              ? "text-neutral-500 dark:text-neutral-400"
              : "text-neutral-900 dark:text-white",
          )}
        >
          ₹{product.price.toLocaleString()}
        </span>
      </div>

      {product.description && (
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {product.description}
        </p>
      )}
    </div>
  );
}
