import type {
  AdminCollection,
  AdminCollectionDetail,
  AdminCollectionsResponse,
} from "@/graphql/generated/types";

// Collection status based on time window.
export type CollectionStatus = "active" | "scheduled" | "ended" | "always";

// View model for a single collection row in the table.
export interface CollectionRowViewModel {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  startsAt: Date | null;
  endsAt: Date | null;
  productsCount: number;
  status: CollectionStatus;
  createdAt: Date | string;
}

// View model for pagination.
export interface PaginationViewModel {
  page: number;
  totalPages: number;
  limit: number;
  total: number;
  showingFrom: number;
  showingTo: number;
}

// View model for CollectionsTable.
export interface CollectionsTableViewModel {
  collections: CollectionRowViewModel[];
  pagination: PaginationViewModel;
  searchValue: string;
  statusFilter: string;
}

// Props for the presentational CollectionsTable component.
export interface CollectionsTableProps {
  viewModel: CollectionsTableViewModel;
  isPending: boolean;
  onSearch: (value: string) => void;
  onStatusFilter: (value: string) => void;
  onPageChange: (page: number) => void;
  onDelete: (collectionId: number) => void;
}

// Props for the CollectionsTableContainer.
export interface CollectionsTableContainerProps {
  data: AdminCollectionsResponse;
}

// View model for collection form.
export interface CollectionFormViewModel {
  id?: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  startsAt: string; // ISO string for datetime-local input
  endsAt: string;
}

// Form data for creating/updating a collection.
export interface CollectionFormData {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  startsAt: Date | null;
  endsAt: Date | null;
}

// Props for the CollectionForm component.
export interface CollectionFormProps {
  viewModel: CollectionFormViewModel;
  isEditing: boolean;
  isPending: boolean;
  onSubmit: (data: CollectionFormData) => Promise<void> | void;
  onCancel: () => void;
}

// Props for the CollectionFormContainer.
export interface CollectionFormContainerProps {
  collection?: AdminCollectionDetail;
}

// View model for a product in a collection.
export interface CollectionProductViewModel {
  id: number;
  name: string;
  slug: string;
  imageUrl: string | null;
  price: number;
  priceFormatted: string;
  isActive: boolean;
}

// Props for the CollectionProductsSection component.
export interface CollectionProductsSectionProps {
  products: CollectionProductViewModel[];
  isPending: boolean;
  onRemoveProduct: (productId: number) => void;
  onManageProducts: () => void;
}

// Props for the CollectionProductsContainer.
export interface CollectionProductsContainerProps {
  collection: AdminCollectionDetail;
}

// Get collection status based on time window.
export function getCollectionStatus(
  startsAt: Date | null,
  endsAt: Date | null,
): CollectionStatus {
  const now = new Date();

  if (!startsAt && !endsAt) return "always";
  if (startsAt && startsAt > now) return "scheduled";
  if (endsAt && endsAt < now) return "ended";
  return "active";
}

// Build collection row view model from raw data.
export function buildCollectionRowViewModel(
  collection: AdminCollection,
): CollectionRowViewModel {
  const startsAt = collection.starts_at ? new Date(collection.starts_at) : null;
  const endsAt = collection.ends_at ? new Date(collection.ends_at) : null;

  return {
    id: collection.id,
    slug: collection.slug,
    name: collection.name,
    description: collection.description ?? null,
    imageUrl: collection.image_url ?? null,
    startsAt,
    endsAt,
    productsCount: collection.products_count,
    status: getCollectionStatus(startsAt, endsAt),
    createdAt: collection.created_at,
  };
}

// Build pagination view model from result data.
export function buildPaginationViewModel(
  data: AdminCollectionsResponse,
): PaginationViewModel {
  return {
    page: data.page,
    totalPages: data.totalPages,
    limit: data.limit,
    total: data.total,
    showingFrom: data.total > 0 ? (data.page - 1) * data.limit + 1 : 0,
    showingTo: Math.min(data.page * data.limit, data.total),
  };
}

// Build collections table view model.
export function buildCollectionsTableViewModel(
  data: AdminCollectionsResponse,
  searchValue: string,
  statusFilter: string,
): CollectionsTableViewModel {
  return {
    collections: data.collections.map(buildCollectionRowViewModel),
    pagination: buildPaginationViewModel(data),
    searchValue,
    statusFilter,
  };
}

// Build collection form view model from collection detail.
export function buildCollectionFormViewModel(
  collection?: AdminCollectionDetail,
): CollectionFormViewModel {
  if (!collection) {
    return {
      name: "",
      slug: "",
      description: "",
      imageUrl: "",
      startsAt: "",
      endsAt: "",
    };
  }

  return {
    id: collection.id,
    name: collection.name,
    slug: collection.slug,
    description: collection.description || "",
    imageUrl: collection.image_url || "",
    startsAt: collection.starts_at
      ? new Date(collection.starts_at).toISOString().slice(0, 16)
      : "",
    endsAt: collection.ends_at
      ? new Date(collection.ends_at).toISOString().slice(0, 16)
      : "",
  };
}

// Build collection product view model.
export function buildCollectionProductViewModel(
  product: AdminCollectionDetail["products"][number],
): CollectionProductViewModel {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    imageUrl: product.image_url ?? null,
    price: product.price,
    priceFormatted: formatPrice(product.price),
    isActive: product.is_active,
  };
}

// Format price in INR.
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

// Generate slug from name.
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Format date for display.
export function formatDate(date: Date | string | null): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Format datetime for display.
export function formatDateTime(date: Date | string | null): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
