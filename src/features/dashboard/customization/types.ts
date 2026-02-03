import type {
  AdminCategory,
  AdminCustomizationCategorySummary,
  AdminCustomizationOption,
  AdminCustomizationOptionsResponse,
  AdminCustomizationTypeSummary,
  AdminCustomizeCategoriesResponse,
  AdminCustomizeCategory,
} from "@/graphql/generated/types";

// View model for a single customization option row in the table.
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

// View model for pagination.
export interface PaginationViewModel {
  page: number;
  totalPages: number;
  limit: number;
  total: number;
  showingFrom: number;
  showingTo: number;
}

// View model for CustomizationOptionsTable.
export interface CustomizationOptionsTableViewModel {
  options: CustomizationOptionRowViewModel[];
  pagination: PaginationViewModel;
  searchValue: string;
  categoryFilter: string;
  typeFilter: string;
  activeFilter: string;
}

// Props for the presentational CustomizationOptionsTable component.
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

// Props for the CustomizationOptionsTableContainer.
export interface CustomizationOptionsTableContainerProps {
  data: AdminCustomizationOptionsResponse;
  categories: AdminCustomizationCategorySummary[];
  types: AdminCustomizationTypeSummary[];
}

// View model for customization option form.
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

// Props for the CustomizationOptionForm component.
export interface CustomizationOptionFormProps {
  viewModel: CustomizationOptionFormViewModel;
  existingCategories: string[];
  existingTypes: string[];
  isEditing: boolean;
  onSubmit: (data: CustomizationOptionFormData) => Promise<void> | void;
  onCancel: () => void;
}

// Form data for creating/updating a customization option.
export interface CustomizationOptionFormData {
  category: string;
  type: string;
  name: string;
  value: string;
  priceModifier: number;
  sortOrder: number;
  isActive: boolean;
}

// Props for the CustomizationOptionFormContainer.
export interface CustomizationOptionFormContainerProps {
  option?: AdminCustomizationOption;
  categories: AdminCustomizationCategorySummary[];
  types: AdminCustomizationTypeSummary[];
}

// Build customization option row view model from raw data.
export function buildCustomizationOptionRowViewModel(
  option: AdminCustomizationOption,
): CustomizationOptionRowViewModel {
  return {
    id: option.id,
    category: option.category_name,
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

// Build pagination view model from result data.
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

// Build customization options table view model.
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

// Build customization option form view model from option detail.
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
    category: option.category_name,
    type: option.type,
    name: option.name,
    value: option.value,
    priceModifier: option.price_modifier,
    sortOrder: option.sort_order,
    isActive: option.is_active,
  };
}

// Format price modifier in INR.
export function formatPriceModifier(price: number): string {
  if (price === 0) return "No change";
  const prefix = price > 0 ? "+" : "";
  return `${prefix}${new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price)}`;
}

// Format date for display.
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ============================================
// New Dashboard with Category Cards
// ============================================

// View model for options grouped by type within a category.
export interface OptionsByTypeViewModel {
  type: string;
  options: CustomizationOptionRowViewModel[];
}

// View model for a category card on the dashboard.
export interface CustomizeCategoryCardViewModel {
  id: number;
  category: string;
  basePrice: number;
  basePriceFormatted: string;
  imageUrl: string | null;
  isActive: boolean;
  optionsCount: number;
  optionsByType: OptionsByTypeViewModel[];
}

// View model for the customization dashboard.
export interface CustomizationDashboardViewModel {
  categories: CustomizeCategoryCardViewModel[];
  totalCategories: number;
}

// Props for CustomizationDashboard presentational component.
export interface CustomizationDashboardProps {
  viewModel: CustomizationDashboardViewModel;
  existingTypes: string[];
  availableCategories: AvailableCategoryOption[];
  isPending: boolean;
  addCategoryOpen: boolean;
  addOptionForCategory: { id: number; name: string } | null;
  onAddCategoryOpen: () => void;
  onAddCategoryClose: () => void;
  onAddCategory: (data: CreateCategoryFormData) => Promise<void>;
  onAddOptionOpen: (categoryId: number, categoryName: string) => void;
  onAddOptionClose: () => void;
  onAddOption: (
    categoryId: number,
    data: CreateOptionFormData,
  ) => Promise<void>;
  onEditCategory: (categoryId: number) => void;
  onToggleCategoryActive: (categoryId: number) => void;
  onDeleteCategory: (categoryId: number) => void;
  onToggleOptionActive: (optionId: number) => void;
  onDeleteOption: (optionId: number) => void;
  onEditOption: (optionId: number) => void;
}

// Props for CustomizationDashboardContainer.
export interface CustomizationDashboardContainerProps {
  data: AdminCustomizeCategoriesResponse;
  types: AdminCustomizationTypeSummary[];
  productCategories: AdminCategory[];
}

// Form data for creating a new category.
export interface CreateCategoryFormData {
  category: string;
  basePrice: number;
  imageUrl?: string;
}

// Form data for creating an option within a category.
export interface CreateOptionFormData {
  type: string;
  name: string;
  value: string;
  priceModifier: number;
  sortOrder: number;
}

// Available category option for dropdown.
export interface AvailableCategoryOption {
  name: string;
  icon: string;
}

// Props for AddCategoryModal.
export interface AddCategoryModalProps {
  isOpen: boolean;
  availableCategories: AvailableCategoryOption[];
  onClose: () => void;
  onSubmit: (data: CreateCategoryFormData) => Promise<void>;
}

// Props for AddOptionModal.
export interface AddOptionModalProps {
  categoryId: number;
  categoryName: string;
  existingTypes: string[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateOptionFormData) => Promise<void>;
}

// Build category card view model from API data.
export function buildCustomizeCategoryCardViewModel(
  category: AdminCustomizeCategory,
): CustomizeCategoryCardViewModel {
  // Group options by type
  const optionsByTypeMap = new Map<string, CustomizationOptionRowViewModel[]>();

  category.options.forEach((option) => {
    const existing = optionsByTypeMap.get(option.type) || [];
    existing.push({
      id: option.id,
      category: category.category,
      type: option.type,
      name: option.name,
      value: option.value,
      priceModifier: option.price_modifier,
      priceModifierFormatted: formatPriceModifier(option.price_modifier),
      sortOrder: option.sort_order,
      isActive: option.is_active,
      createdAt: formatDate(option.created_at),
      updatedAt: formatDate(option.updated_at),
    });
    optionsByTypeMap.set(option.type, existing);
  });

  // Convert map to array sorted by type name
  const optionsByType: OptionsByTypeViewModel[] = Array.from(
    optionsByTypeMap.entries(),
  )
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([type, options]) => ({
      type,
      options: options.sort((a, b) => a.sortOrder - b.sortOrder),
    }));

  return {
    id: category.id,
    category: category.category,
    basePrice: category.base_price,
    basePriceFormatted: formatPrice(category.base_price),
    imageUrl: category.image_url ?? null,
    isActive: category.is_active,
    optionsCount: category.options_count,
    optionsByType,
  };
}

// Build dashboard view model from API response.
export function buildCustomizationDashboardViewModel(
  data: AdminCustomizeCategoriesResponse,
): CustomizationDashboardViewModel {
  return {
    categories: data.categories.map(buildCustomizeCategoryCardViewModel),
    totalCategories: data.total,
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

// ============================================
// Edit Category Form
// ============================================

// View model for edit category form.
export interface EditCategoryFormViewModel {
  id: number;
  category: string;
  basePrice: number;
  imageUrl: string | null;
  isActive: boolean;
}

// Form data for updating a category.
export interface UpdateCategoryFormData {
  category: string;
  basePrice: number;
  imageUrl?: string;
  isActive: boolean;
}

// Props for EditCategoryForm component.
export interface EditCategoryFormProps {
  viewModel: EditCategoryFormViewModel;
  availableCategories: AvailableCategoryOption[];
  onSubmit: (data: UpdateCategoryFormData) => Promise<void>;
  onCancel: () => void;
}

// Props for EditCategoryFormContainer.
export interface EditCategoryFormContainerProps {
  category: AdminCustomizeCategory;
  productCategories: AdminCategory[];
  customizeCategories: AdminCustomizeCategory[];
}

// Build edit category form view model from API data.
export function buildEditCategoryFormViewModel(
  category: AdminCustomizeCategory,
): EditCategoryFormViewModel {
  return {
    id: category.id,
    category: category.category,
    basePrice: category.base_price,
    imageUrl: category.image_url ?? null,
    isActive: category.is_active,
  };
}
