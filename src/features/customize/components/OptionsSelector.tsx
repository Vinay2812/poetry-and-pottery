"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { CustomizeOptionsSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import type { OptionsSelectorProps } from "../types";

export function OptionsSelector({
  category,
  optionGroups,
  isLoading,
  onSelectOption,
  onBack,
  onContinue,
  canContinue,
}: OptionsSelectorProps) {
  if (isLoading) {
    return <CustomizeOptionsSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-display text-lg font-bold text-neutral-900">
          Customize Your {category}
        </h2>
        <p className="text-sm text-neutral-500">
          Select your preferred options for each category
        </p>
      </div>

      {/* Option Groups */}
      <div className="space-y-6">
        {optionGroups.map((group) => (
          <div key={group.type} className="space-y-3">
            <h3 className="text-sm font-bold text-neutral-900">
              {group.typeLabel}
            </h3>

            {group.type === "COLOR" ? (
              // Color swatches
              <div className="flex flex-wrap gap-3">
                {group.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => onSelectOption(group.type, option.id)}
                    className={cn(
                      "group relative h-10 w-10 rounded-full transition-all",
                      option.isSelected && "ring-primary ring-2 ring-offset-2",
                    )}
                    style={{ backgroundColor: option.value }}
                    title={option.name}
                  >
                    {option.priceModifier !== 0 && (
                      <span className="text-primary absolute -top-1 -right-1 rounded-full bg-white px-1.5 py-0.5 text-[9px] font-medium shadow-sm">
                        {option.priceModifierFormatted}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              // Regular chips
              <div className="flex flex-wrap gap-2">
                {group.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => onSelectOption(group.type, option.id)}
                    className={cn(
                      "rounded-full border-2 px-4 py-2 text-sm font-medium transition-all",
                      option.isSelected
                        ? "border-primary bg-primary-light text-primary"
                        : "border-transparent bg-neutral-100 text-neutral-600 hover:bg-neutral-200",
                    )}
                  >
                    {option.name}
                    {option.priceModifier !== 0 && (
                      <span className="text-primary ml-1.5 text-xs">
                        {option.priceModifierFormatted}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onContinue} disabled={!canContinue}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
