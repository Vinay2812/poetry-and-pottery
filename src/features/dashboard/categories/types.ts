import type { Category, GetCategoriesResult } from "@/actions/admin";

/**
 * View model for a single category row.
 */
export interface CategoryRowViewModel {
  name: string;
  icon: string;
  productCount: number;
}

/**
 * View model for CategoriesTable.
 */
export interface CategoriesTableViewModel {
  categories: CategoryRowViewModel[];
  total: number;
}

/**
 * Props for the presentational CategoriesTable component.
 */
export interface CategoriesTableProps {
  viewModel: CategoriesTableViewModel;
  iconOptions: { value: string; label: string }[];
  isPending: boolean;
  onIconChange: (name: string, icon: string) => void;
  onRename: (oldName: string, newName: string) => void;
  onDelete: (name: string) => void;
  onAdd: (name: string, icon: string) => void;
}

/**
 * Props for the CategoriesTableContainer.
 */
export interface CategoriesTableContainerProps {
  data: GetCategoriesResult;
  iconOptions: { value: string; label: string }[];
}

/**
 * Build category row view model from raw data.
 */
export function buildCategoryRowViewModel(
  category: Category,
): CategoryRowViewModel {
  return {
    name: category.name,
    icon: category.icon,
    productCount: category.productCount,
  };
}

/**
 * Build categories table view model.
 */
export function buildCategoriesTableViewModel(
  data: GetCategoriesResult,
): CategoriesTableViewModel {
  return {
    categories: data.categories.map(buildCategoryRowViewModel),
    total: data.total,
  };
}
