import { Archive } from "lucide-react";

import type { ProductAvailabilityStatus } from "../types";

interface StatusBadgesProps {
  availabilityStatus: ProductAvailabilityStatus;
}

export function StatusBadges({ availabilityStatus }: StatusBadgesProps) {
  const { isOutOfStock, isInactive, isCollectionArchived } = availabilityStatus;

  if (isOutOfStock) {
    return (
      <div className="mb-3">
        <span className="bg-terracotta inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white">
          Sold Out
        </span>
      </div>
    );
  }

  if (isInactive || isCollectionArchived) {
    return (
      <div className="mb-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-500 px-3 py-1.5 text-xs font-semibold text-white">
          <Archive className="h-3.5 w-3.5" />
          {isInactive ? "Unavailable" : "Collection Ended"}
        </span>
      </div>
    );
  }

  return null;
}
