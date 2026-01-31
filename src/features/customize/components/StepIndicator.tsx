"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import type { CustomizeStep, StepIndicatorProps } from "../types";

const STEPS: { key: CustomizeStep; label: string; number: number }[] = [
  { key: "category", label: "Category", number: 1 },
  { key: "options", label: "Options", number: 2 },
  { key: "review", label: "Review", number: 3 },
];

export function StepIndicator({
  currentStep,
  completedSteps,
}: StepIndicatorProps) {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center justify-center gap-2">
      {STEPS.map((step, index) => {
        const isCompleted = completedSteps.includes(step.key);
        const isCurrent = step.key === currentStep;
        const isUpcoming = !isCompleted && !isCurrent;

        return (
          <div key={step.key} className="flex items-center gap-2">
            {/* Step Circle */}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors",
                  isCompleted && "bg-primary text-white",
                  isCurrent && "bg-primary text-white",
                  isUpcoming && "bg-neutral-200 text-neutral-400",
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  isCurrent && "font-semibold text-neutral-900",
                  isCompleted && "text-neutral-600",
                  isUpcoming && "text-neutral-400",
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-10 transition-colors",
                  currentIndex > index ? "bg-primary" : "bg-neutral-200",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
