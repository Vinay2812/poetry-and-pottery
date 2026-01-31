"use client";

import { ArrowLeft, Loader2, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { ReviewSummaryProps } from "../types";

export function ReviewSummary({
  viewModel,
  onBack,
  onAddToCart,
  isAddingToCart,
}: ReviewSummaryProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-display text-lg font-bold text-neutral-900">
          Review Your Customization
        </h2>
        <p className="text-sm text-neutral-500">
          Confirm your selections before adding to cart
        </p>
      </div>

      {/* Summary Card */}
      <div className="shadow-soft rounded-2xl bg-white p-6">
        {/* Category */}
        <div className="mb-4 border-b pb-4">
          <span className="text-xs font-medium tracking-wider text-neutral-400 uppercase">
            Category
          </span>
          <p className="mt-1 text-lg font-semibold text-neutral-900">
            {viewModel.category}
          </p>
        </div>

        {/* Selections */}
        <div className="space-y-3">
          {/* Base Price */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-600">Base Price</span>
            <span className="text-sm font-medium text-neutral-900">
              {viewModel.basePriceFormatted}
            </span>
          </div>

          {/* Selected Options */}
          {viewModel.selections.map((selection) => (
            <div
              key={selection.type}
              className="flex items-center justify-between"
            >
              <div>
                <span className="text-sm text-neutral-600">
                  {selection.typeLabel}
                </span>
                <span className="ml-2 text-sm font-medium text-neutral-900">
                  ({selection.name})
                </span>
              </div>
              <span
                className={
                  selection.priceModifier > 0
                    ? "text-sm font-medium text-green-600"
                    : selection.priceModifier < 0
                      ? "text-sm font-medium text-red-600"
                      : "text-sm text-neutral-400"
                }
              >
                {selection.priceModifierFormatted || "Included"}
              </span>
            </div>
          ))}

          {/* Total */}
          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <span className="text-base font-semibold text-neutral-900">
              Total Price
            </span>
            <span className="text-primary text-lg font-bold">
              {viewModel.totalPriceFormatted}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onAddToCart} disabled={isAddingToCart}>
          {isAddingToCart ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ShoppingCart className="mr-2 h-4 w-4" />
          )}
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
