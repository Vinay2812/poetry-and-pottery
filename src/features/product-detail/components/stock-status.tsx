import type { ProductAvailabilityStatus } from "../types";

interface StockStatusProps {
  availabilityStatus: ProductAvailabilityStatus;
  availableQuantity: number;
}

export function StockStatus({
  availabilityStatus,
  availableQuantity,
}: StockStatusProps) {
  const { isOutOfStock, isLowStock, isInactive, isCollectionArchived } =
    availabilityStatus;

  if (isInactive || isCollectionArchived) {
    return null;
  }

  if (isOutOfStock) {
    return (
      <div className="mb-4">
        <span className="text-xs font-medium text-red-500">Sold Out</span>
      </div>
    );
  }

  if (isLowStock) {
    return (
      <div className="mb-4">
        <span className="text-xs font-medium text-amber-600">
          Only {availableQuantity} left in stock
        </span>
      </div>
    );
  }

  return null;
}
