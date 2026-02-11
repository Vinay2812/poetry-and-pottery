import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import type { PricingTierCardProps } from "../types";

export function PricingTierCard({
  hours,
  pricePerPersonLabel,
  piecesPerPerson,
  sortOrder,
  isActive,
  updatedAtLabel,
  isPending,
  onEdit,
  onDelete,
}: PricingTierCardProps) {
  return (
    <div className="rounded-xl border p-4">
      <div className="mb-2 flex items-start justify-between">
        <p className="font-semibold text-neutral-900">{hours} Hour Session</p>
        <Badge
          className={cn(
            "border",
            isActive
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-neutral-200 bg-neutral-100 text-neutral-600",
          )}
        >
          {isActive ? "Active" : "Inactive"}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm text-neutral-600">
        <p>Price: {pricePerPersonLabel}</p>
        <p>Pieces: {piecesPerPerson}</p>
        <p>Sort: {sortOrder}</p>
        <p className="text-xs">Updated: {updatedAtLabel}</p>
      </div>
      <div className="mt-3 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          disabled={isPending}
        >
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-red-600"
          onClick={onDelete}
          disabled={isPending}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
