import type {
  AdminProduct,
  AdminProductDetail,
  AdminProductsResponse,
} from "@/graphql/generated/types";

/**
 * View model for a single product row in the table.
 */
export interface ProductRowViewModel {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  priceFormatted: string;
  totalQuantity: number;
  availableQuantity: number;
  isActive: boolean;
  isLowStock: boolean;
  colorName: string;
  colorCode: string;
  material: string;
  imageUrls: string[];
  categories: string[];
  reviewsCount: number;
  wishlistCount: number;
  cartCount: number;
  createdAt: Date | string;
}

/**
 * View model for pagination.
 */
export interface PaginationViewModel {
  page: number;
  totalPages: number;
  limit: number;
  total: number;
  showingFrom: number;
  showingTo: number;
}

/**
 * View model for ProductsTable.
 */
export interface ProductsTableViewModel {
  products: ProductRowViewModel[];
  pagination: PaginationViewModel;
  searchValue: string;
  categoryFilter: string;
  collectionFilter: string;
  activeFilter: string;
}

/**
 * Props for the presentational ProductsTable component.
 */
export interface ProductsTableProps {
  viewModel: ProductsTableViewModel;
  categories: string[];
  collections: CollectionOption[];
  isPending: boolean;
  onSearch: (value: string) => void;
  onCategoryFilter: (value: string) => void;
  onCollectionFilter: (value: string) => void;
  onActiveFilter: (value: string) => void;
  onPageChange: (page: number) => void;
  onToggleActive: (productId: number) => void;
  onDelete: (productId: number) => void;
}

/**
 * Props for the ProductsTableContainer.
 */
export interface ProductsTableContainerProps {
  data: AdminProductsResponse;
  categories: string[];
  collections: CollectionOption[];
}

/**
 * View model for product form.
 */
export interface ProductFormViewModel {
  id?: number;
  name: string;
  slug: string;
  description: string;
  instructions: string[];
  price: number;
  totalQuantity: number;
  availableQuantity: number;
  soldQuantity?: number;
  isActive: boolean;
  colorName: string;
  colorCode: string;
  material: string;
  imageUrls: string[];
  categories: string[];
  collectionId: number | null;
}

/**
 * Collection option for the dropdown.
 */
export interface CollectionOption {
  id: number;
  name: string;
  slug: string;
}

/**
 * Props for the ProductForm component.
 */
export interface ProductFormProps {
  viewModel: ProductFormViewModel;
  availableCategories: string[];
  availableCollections: CollectionOption[];
  isEditing: boolean;
  onSubmit: (data: ProductFormData) => Promise<void> | void;
  onCancel: () => void;
}

/**
 * Form data for creating/updating a product.
 */
export interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  instructions: string[];
  price: number;
  totalQuantity: number;
  availableQuantity: number;
  isActive: boolean;
  colorName: string;
  colorCode: string;
  material: string;
  imageUrls: string[];
  categories: string[];
  collectionId: number | null;
}

/**
 * Props for the ProductFormContainer.
 */
export interface ProductFormContainerProps {
  product?: AdminProductDetail;
  categories: string[];
  collections: CollectionOption[];
}

/**
 * Build product row view model from raw data.
 */
export function buildProductRowViewModel(
  product: AdminProduct,
): ProductRowViewModel {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description ?? null,
    price: product.price,
    priceFormatted: formatPrice(product.price),
    totalQuantity: product.total_quantity,
    availableQuantity: product.available_quantity,
    isActive: product.is_active,
    isLowStock: product.available_quantity <= 5,
    colorName: product.color_name,
    colorCode: product.color_code,
    material: product.material,
    imageUrls: product.image_urls,
    categories: product.categories,
    reviewsCount: product._count.reviews,
    wishlistCount: product._count.wishlists,
    cartCount: product._count.carts,
    createdAt: product.created_at,
  };
}

/**
 * Build pagination view model from result data.
 */
export function buildPaginationViewModel(
  data: AdminProductsResponse,
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

/**
 * Build products table view model.
 */
export function buildProductsTableViewModel(
  data: AdminProductsResponse,
  searchValue: string,
  categoryFilter: string,
  collectionFilter: string,
  activeFilter: string,
): ProductsTableViewModel {
  return {
    products: data.products.map(buildProductRowViewModel),
    pagination: buildPaginationViewModel(data),
    searchValue,
    categoryFilter,
    collectionFilter,
    activeFilter,
  };
}

/**
 * Build product form view model from product detail.
 */
export function buildProductFormViewModel(
  product?: AdminProductDetail,
): ProductFormViewModel {
  if (!product) {
    return {
      name: "",
      slug: "",
      description: "",
      instructions: [],
      price: 0,
      totalQuantity: 0,
      availableQuantity: 0,
      soldQuantity: 0,
      isActive: true,
      colorName: "",
      colorCode: "#000000",
      material: "",
      imageUrls: [],
      categories: [],
      collectionId: null,
    };
  }

  // Calculate sold quantity as the difference between total and available
  const soldQuantity = product.total_quantity - product.available_quantity;

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description || "",
    instructions: product.instructions,
    price: product.price,
    totalQuantity: product.total_quantity,
    availableQuantity: product.available_quantity,
    soldQuantity,
    isActive: product.is_active,
    colorName: product.color_name,
    colorCode: product.color_code,
    material: product.material,
    imageUrls: product.image_urls,
    categories: product.categories,
    collectionId: product.collection_id ?? null,
  };
}

/**
 * Format price in INR.
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Generate slug from name.
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
