import type {
  CustomizationCategory,
  CustomizationOption,
  CustomizationOptionsByType,
} from "@/graphql/generated/types";

/**
 * Steps in the customization wizard
 */
export type CustomizeStep = "category" | "options" | "review";

/**
 * User's current customization selections
 */
export interface CustomizationSelections {
  category: string | null;
  options: Record<string, number>; // type -> option_id
}

/**
 * View model for a category card
 */
export interface CategoryCardViewModel {
  category: string;
  optionsCount: number;
  basePrice: number;
  basePriceFormatted: string;
  imageUrl: string | null;
  isSelected: boolean;
}

/**
 * View model for an option chip
 */
export interface OptionChipViewModel {
  id: number;
  name: string;
  value: string;
  priceModifier: number;
  priceModifierFormatted: string;
  isSelected: boolean;
}

/**
 * View model for an option group (by type)
 */
export interface OptionGroupViewModel {
  type: string;
  typeLabel: string;
  options: OptionChipViewModel[];
}

/**
 * View model for the review summary
 */
export interface ReviewSummaryViewModel {
  category: string;
  basePrice: number;
  basePriceFormatted: string;
  selections: {
    type: string;
    typeLabel: string;
    name: string;
    priceModifier: number;
    priceModifierFormatted: string;
  }[];
  totalPrice: number;
  totalPriceFormatted: string;
}

/**
 * Props for CategorySelector
 */
export interface CategorySelectorProps {
  categories: CategoryCardViewModel[];
  isLoading: boolean;
  onSelect: (category: string) => void;
}

/**
 * Props for OptionsSelector
 */
export interface OptionsSelectorProps {
  category: string;
  optionGroups: OptionGroupViewModel[];
  isLoading: boolean;
  onSelectOption: (type: string, optionId: number) => void;
  onBack: () => void;
  onContinue: () => void;
  canContinue: boolean;
}

/**
 * Props for ReviewSummary
 */
export interface ReviewSummaryProps {
  viewModel: ReviewSummaryViewModel;
  onBack: () => void;
  onAddToCart: () => void;
  isAddingToCart: boolean;
}

/**
 * Props for StepIndicator
 */
export interface StepIndicatorProps {
  currentStep: CustomizeStep;
  completedSteps: CustomizeStep[];
}

/**
 * Build category card view models
 */
export function buildCategoryCardViewModels(
  categories: CustomizationCategory[],
  selectedCategory: string | null,
): CategoryCardViewModel[] {
  return categories.map((cat) => ({
    category: cat.category,
    optionsCount: cat.options_count,
    basePrice: cat.base_price,
    basePriceFormatted: formatPrice(cat.base_price),
    imageUrl: cat.image_url ?? null,
    isSelected: cat.category === selectedCategory,
  }));
}

/**
 * Build option group view models
 */
export function buildOptionGroupViewModels(
  optionsByType: CustomizationOptionsByType[],
  selections: Record<string, number>,
): OptionGroupViewModel[] {
  return optionsByType.map((group) => ({
    type: group.type,
    typeLabel: formatTypeLabel(group.type),
    options: group.options.map((opt) => ({
      id: opt.id,
      name: opt.name,
      value: opt.value,
      priceModifier: opt.price_modifier,
      priceModifierFormatted: formatPriceModifier(opt.price_modifier),
      isSelected: selections[group.type] === opt.id,
    })),
  }));
}

/**
 * Build review summary view model
 */
export function buildReviewSummaryViewModel(
  category: string,
  basePrice: number,
  optionsByType: CustomizationOptionsByType[],
  selections: Record<string, number>,
): ReviewSummaryViewModel {
  const selectedOptions: ReviewSummaryViewModel["selections"] = [];
  let totalModifier = 0;

  for (const group of optionsByType) {
    const selectedId = selections[group.type];
    if (selectedId) {
      const option = group.options.find((o) => o.id === selectedId);
      if (option) {
        selectedOptions.push({
          type: group.type,
          typeLabel: formatTypeLabel(group.type),
          name: option.name,
          priceModifier: option.price_modifier,
          priceModifierFormatted: formatPriceModifier(option.price_modifier),
        });
        totalModifier += option.price_modifier;
      }
    }
  }

  const totalPrice = basePrice + totalModifier;

  return {
    category,
    basePrice,
    basePriceFormatted: formatPrice(basePrice),
    selections: selectedOptions,
    totalPrice,
    totalPriceFormatted: formatPrice(totalPrice),
  };
}

/**
 * Format price in INR
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format price modifier (shows +/- prefix)
 */
export function formatPriceModifier(price: number): string {
  if (price === 0) return "";
  const prefix = price > 0 ? "+" : "";
  return `${prefix}${formatPrice(price)}`;
}

/**
 * Format type label (e.g., SIZE -> Size, TEXT_ENGRAVING -> Text Engraving)
 */
export function formatTypeLabel(type: string): string {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Get option by ID from options by type
 */
export function getOptionById(
  optionsByType: CustomizationOptionsByType[],
  optionId: number,
): CustomizationOption | null {
  for (const group of optionsByType) {
    const option = group.options.find((o) => o.id === optionId);
    if (option) return option;
  }
  return null;
}
