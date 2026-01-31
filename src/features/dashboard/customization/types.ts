import type {
  AdminCustomizationCategorySummary,
  AdminCustomizationOption,
  AdminCustomizationOptionsResponse,
  AdminCustomizationTypeSummary,
} from "@/graphql/generated/types";

/**
 * View model for a single customization option row in the table.
 */
export interface CustomizationOptionRowViewModel {
  id: number;
  category: string;
  type: string;
  name: string;
  value: string;
  priceModifier: number;
  priceModifierFormatted: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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
 * View model for CustomizationOptionsTable.
 */
export interface CustomizationOptionsTableViewModel {
  options: CustomizationOptionRowViewModel[];
  pagination: PaginationViewModel;
  searchValue: string;
  categoryFilter: string;
  typeFilter: string;
  activeFilter: string;
}

/**
 * Props for the presentational CustomizationOptionsTable component.
 */
export interface CustomizationOptionsTableProps {
  viewModel: CustomizationOptionsTableViewModel;
  categories: AdminCustomizationCategorySummary[];
  types: AdminCustomizationTypeSummary[];
  isPending: boolean;
  onSearch: (value: string) => void;
  onCategoryFilter: (value: string) => void;
  onTypeFilter: (value: string) => void;
  onActiveFilter: (value: string) => void;
  onPageChange: (page: number) => void;
  onToggleActive: (optionId: number) => void;
  onDelete: (optionId: number) => void;
}

/**
 * Props for the CustomizationOptionsTableContainer.
 */
export interface CustomizationOptionsTableContainerProps {
  data: AdminCustomizationOptionsResponse;
  categories: AdminCustomizationCategorySummary[];
  types: AdminCustomizationTypeSummary[];
}

/**
 * View model for customization option form.
 */
export interface CustomizationOptionFormViewModel {
  id?: number;
  category: string;
  type: string;
  name: string;
  value: string;
  priceModifier: number;
  sortOrder: number;
  isActive: boolean;
}

/**
 * Props for the CustomizationOptionForm component.
 */
export interface CustomizationOptionFormProps {
  viewModel: CustomizationOptionFormViewModel;
  existingCategories: string[];
  existingTypes: string[];
  isEditing: boolean;
  onSubmit: (data: CustomizationOptionFormData) => Promise<void> | void;
  onCancel: () => void;
}

/**
 * Form data for creating/updating a customization option.
 */
export interface CustomizationOptionFormData {
  category: string;
  type: string;
  name: string;
  value: string;
  priceModifier: number;
  sortOrder: number;
  isActive: boolean;
}

/**
 * Props for the CustomizationOptionFormContainer.
 */
export interface CustomizationOptionFormContainerProps {
  option?: AdminCustomizationOption;
  categories: AdminCustomizationCategorySummary[];
  types: AdminCustomizationTypeSummary[];
}

/**
 * Build customization option row view model from raw data.
 */
export function buildCustomizationOptionRowViewModel(
  option: AdminCustomizationOption,
): CustomizationOptionRowViewModel {
  return {
    id: option.id,
    category: option.category,
    type: option.type,
    name: option.name,
    value: option.value,
    priceModifier: option.price_modifier,
    priceModifierFormatted: formatPriceModifier(option.price_modifier),
    sortOrder: option.sort_order,
    isActive: option.is_active,
    createdAt: formatDate(option.created_at),
    updatedAt: formatDate(option.updated_at),
  };
}

/**
 * Build pagination view model from result data.
 */
export function buildPaginationViewModel(
  data: AdminCustomizationOptionsResponse,
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
 * Build customization options table view model.
 */
export function buildCustomizationOptionsTableViewModel(
  data: AdminCustomizationOptionsResponse,
  searchValue: string,
  categoryFilter: string,
  typeFilter: string,
  activeFilter: string,
): CustomizationOptionsTableViewModel {
  return {
    options: data.options.map(buildCustomizationOptionRowViewModel),
    pagination: buildPaginationViewModel(data),
    searchValue,
    categoryFilter,
    typeFilter,
    activeFilter,
  };
}

/**
 * Build customization option form view model from option detail.
 */
export function buildCustomizationOptionFormViewModel(
  option?: AdminCustomizationOption,
): CustomizationOptionFormViewModel {
  if (!option) {
    return {
      category: "",
      type: "",
      name: "",
      value: "",
      priceModifier: 0,
      sortOrder: 0,
      isActive: true,
    };
  }

  return {
    id: option.id,
    category: option.category,
    type: option.type,
    name: option.name,
    value: option.value,
    priceModifier: option.price_modifier,
    sortOrder: option.sort_order,
    isActive: option.is_active,
  };
}

/**
 * Format price modifier in INR.
 */
export function formatPriceModifier(price: number): string {
  if (price === 0) return "No change";
  const prefix = price > 0 ? "+" : "";
  return `${prefix}${new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price)}`;
}

/**
 * Format date for display.
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
