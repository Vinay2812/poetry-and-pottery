"use client";

import {
  getCustomizationCategories,
  getCustomizationOptionsByCategory,
} from "@/data/customization/gateway/server";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

import type {
  CustomizationCategoriesResponse,
  CustomizationOptionsResponse,
} from "@/graphql/generated/types";

import { CategorySelector } from "../components/CategorySelector";
import { OptionsSelector } from "../components/OptionsSelector";
import { ReviewSummary } from "../components/ReviewSummary";
import { StepIndicator } from "../components/StepIndicator";
import type { CustomizeStep } from "../types";
import {
  buildCategoryCardViewModels,
  buildOptionGroupViewModels,
  buildReviewSummaryViewModel,
} from "../types";

interface CustomizeWizardContainerProps {
  initialCategories: CustomizationCategoriesResponse;
}

export function CustomizeWizardContainer({
  initialCategories,
}: CustomizeWizardContainerProps) {
  const [isPending, startTransition] = useTransition();

  // State
  const [currentStep, setCurrentStep] = useState<CustomizeStep>("category");
  const [completedSteps, setCompletedSteps] = useState<CustomizeStep[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [optionsData, setOptionsData] =
    useState<CustomizationOptionsResponse | null>(null);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Get base price for selected category
  const selectedCategoryData = useMemo(() => {
    if (!selectedCategory) return null;
    return initialCategories.categories.find(
      (c) => c.category === selectedCategory,
    );
  }, [initialCategories.categories, selectedCategory]);

  // Build view models
  const categoryViewModels = useMemo(
    () =>
      buildCategoryCardViewModels(
        initialCategories.categories,
        selectedCategory,
      ),
    [initialCategories.categories, selectedCategory],
  );

  const optionGroupViewModels = useMemo(() => {
    if (!optionsData) return [];
    return buildOptionGroupViewModels(optionsData.options_by_type, selections);
  }, [optionsData, selections]);

  const reviewViewModel = useMemo(() => {
    if (!selectedCategory || !optionsData || !selectedCategoryData) return null;
    return buildReviewSummaryViewModel(
      selectedCategory,
      selectedCategoryData.base_price,
      optionsData.options_by_type,
      selections,
    );
  }, [selectedCategory, optionsData, selectedCategoryData, selections]);

  // Check if user can continue from options step
  const canContinueFromOptions = useMemo(() => {
    if (!optionsData) return false;
    // Require at least one selection
    return Object.keys(selections).length > 0;
  }, [optionsData, selections]);

  // Load options when category is selected
  useEffect(() => {
    if (selectedCategory && currentStep === "options" && !optionsData) {
      setIsLoadingOptions(true);
      startTransition(async () => {
        try {
          const data = await getCustomizationOptionsByCategory({
            category: selectedCategory,
          });
          setOptionsData(data);
        } catch (error) {
          console.error("Failed to load options:", error);
        } finally {
          setIsLoadingOptions(false);
        }
      });
    }
  }, [selectedCategory, currentStep, optionsData]);

  // Handlers
  const handleSelectCategory = useCallback((category: string) => {
    setSelectedCategory(category);
    setSelections({});
    setOptionsData(null);
    setCompletedSteps(["category"]);
    setCurrentStep("options");
  }, []);

  const handleSelectOption = useCallback((type: string, optionId: number) => {
    setSelections((prev) => ({
      ...prev,
      [type]: optionId,
    }));
  }, []);

  const handleBackToCategory = useCallback(() => {
    setCurrentStep("category");
    setCompletedSteps([]);
  }, []);

  const handleContinueToReview = useCallback(() => {
    setCompletedSteps(["category", "options"]);
    setCurrentStep("review");
  }, []);

  const handleBackToOptions = useCallback(() => {
    setCurrentStep("options");
    setCompletedSteps(["category"]);
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (!reviewViewModel) return;

    setIsAddingToCart(true);
    try {
      // TODO: Implement actual add to cart with customization
      // For now, just simulate the action
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Added to cart! (Feature coming soon)");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  }, [reviewViewModel]);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Step Indicator */}
      <StepIndicator
        currentStep={currentStep}
        completedSteps={completedSteps}
      />

      {/* Step Content */}
      <div className="rounded-2xl bg-neutral-50 p-6">
        {currentStep === "category" && (
          <CategorySelector
            categories={categoryViewModels}
            isLoading={isPending}
            onSelect={handleSelectCategory}
          />
        )}

        {currentStep === "options" && selectedCategory && (
          <OptionsSelector
            category={selectedCategory}
            optionGroups={optionGroupViewModels}
            isLoading={isLoadingOptions}
            onSelectOption={handleSelectOption}
            onBack={handleBackToCategory}
            onContinue={handleContinueToReview}
            canContinue={canContinueFromOptions}
          />
        )}

        {currentStep === "review" && reviewViewModel && (
          <ReviewSummary
            viewModel={reviewViewModel}
            onBack={handleBackToOptions}
            onAddToCart={handleAddToCart}
            isAddingToCart={isAddingToCart}
          />
        )}
      </div>
    </div>
  );
}
