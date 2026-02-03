import type { EventStatus } from "@/graphql/generated/types";

// Page size options for bulk delete dialogs.
export const PAGE_SIZE_OPTIONS = [25, 50, 100, 200, 500] as const;

export type PageSizeOption = (typeof PAGE_SIZE_OPTIONS)[number];

// View model for a selectable product item in bulk delete.
export interface SelectableProductItem {
  id: number;
  name: string;
  imageUrl: string | null;
  isActive: boolean;
  availableQuantity: number;
  priceFormatted: string;
}

// View model for a selectable event item in bulk delete.
export interface SelectableEventItem {
  id: string;
  title: string;
  imageUrl: string | null;
  status: EventStatus;
  startsAtFormatted: string;
  location: string;
}

// Pagination view model for bulk delete dialogs.
export interface BulkDeletePaginationViewModel {
  page: number;
  totalPages: number;
  limit: number;
  total: number;
  showingFrom: number;
  showingTo: number;
}

// Format price in INR.
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
