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

// View model for the bulk delete products dialog.
export interface BulkDeleteProductsDialogViewModel {
  products: SelectableProductItem[];
  selectedIds: number[];
  selectedCount: number;
  isAllSelected: boolean;
  isLoading: boolean;
  isPending: boolean;
  pagination: BulkDeletePaginationViewModel;
  search: string;
  categoryFilter: string;
  collectionFilter: string;
  activeFilter: string;
  pageSize: string;
  categories: string[];
  collections: { id: number; name: string }[];
}

// Props for the bulk delete products dialog presentational component.
export interface BulkDeleteProductsDialogProps {
  isOpen: boolean;
  viewModel: BulkDeleteProductsDialogViewModel;
  onSearch: (value: string) => void;
  onCategoryFilter: (value: string) => void;
  onCollectionFilter: (value: string) => void;
  onActiveFilter: (value: string) => void;
  onPageSizeChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onToggleSelection: (id: number) => void;
  onToggleSelectAll: () => void;
  onBulkDelete: () => void;
  onClose: () => void;
}

// View model for the bulk delete events dialog.
export interface BulkDeleteEventsDialogViewModel {
  events: SelectableEventItem[];
  selectedIds: string[];
  selectedCount: number;
  isAllSelected: boolean;
  isLoading: boolean;
  isPending: boolean;
  pagination: BulkDeletePaginationViewModel;
  search: string;
  statusFilter: string;
  levelFilter: string;
  pageSize: string;
  statusOptions: { value: string; label: string }[];
  levelOptions: { value: string; label: string }[];
}

// Props for the bulk delete events dialog presentational component.
export interface BulkDeleteEventsDialogProps {
  isOpen: boolean;
  viewModel: BulkDeleteEventsDialogViewModel;
  onSearch: (value: string) => void;
  onStatusFilter: (value: string) => void;
  onLevelFilter: (value: string) => void;
  onPageSizeChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onToggleSelection: (id: string) => void;
  onToggleSelectAll: () => void;
  onBulkDelete: () => void;
  onClose: () => void;
}

// Format price in INR.
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
