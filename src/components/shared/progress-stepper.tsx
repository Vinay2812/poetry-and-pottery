"use client";

import { Check, LucideIcon } from "lucide-react";

import { formatProgressDate } from "@/lib/date";
import { cn } from "@/lib/utils";

export interface ProgressStep {
  status: string;
  label: string;
  pastDescription: string;
  currentDescription: string;
  futureDescription: string;
  icon: LucideIcon;
}

interface ProgressStepperProps {
  title: string;
  steps: readonly ProgressStep[];
  currentStatus: string;
  statusOrder: readonly string[];
  getStepDate: (stepStatus: string) => Date | string | null;
}

type StepState = "completed" | "current" | "upcoming";

function getStepState(
  stepStatus: string,
  currentStatus: string,
  statusOrder: readonly string[],
): StepState {
  const currentIndex = statusOrder.indexOf(currentStatus);
  const stepIndex = statusOrder.indexOf(stepStatus);

  if (stepIndex < currentIndex) return "completed";
  if (stepIndex === currentIndex) return "current";
  return "upcoming";
}

// Reusable icon circle for a progress step.
interface ProgressStepIconProps {
  icon: LucideIcon;
  stepState: StepState;
  size?: "sm" | "md";
}

function ProgressStepIcon({
  icon: StepIcon,
  stepState,
  size = "sm",
}: ProgressStepIconProps) {
  return (
    <div
      className={cn(
        "z-10 flex shrink-0 items-center justify-center rounded-full transition-all duration-300",
        size === "sm" ? "h-10 w-10" : "h-11 w-11",
        stepState === "completed" && "bg-primary text-white",
        stepState === "current" && "bg-primary-light text-primary",
        stepState === "upcoming" && "bg-neutral-100 text-neutral-400",
      )}
    >
      {stepState === "completed" ? (
        <Check className="h-5 w-5" strokeWidth={2.5} />
      ) : (
        <StepIcon className="h-5 w-5" />
      )}
    </div>
  );
}

// Reusable label and date display for a progress step.
interface ProgressStepLabelProps {
  label: string;
  stepState: StepState;
  stepDate: Date | string | null;
  className?: string;
}

function ProgressStepLabel({
  label,
  stepState,
  stepDate,
  className,
}: ProgressStepLabelProps) {
  return (
    <div className={className}>
      <h3
        className={cn(
          "text-sm font-semibold",
          stepState === "upcoming"
            ? "text-neutral-400"
            : "text-neutral-900 dark:text-neutral-100",
        )}
      >
        {label}
      </h3>

      {stepDate && stepState !== "upcoming" ? (
        <time className="mt-0.5 block text-xs text-neutral-500">
          {formatProgressDate(stepDate)}
        </time>
      ) : stepState === "upcoming" ? (
        <span className="mt-0.5 block text-xs text-neutral-400">Pending</span>
      ) : null}
    </div>
  );
}

export function ProgressStepper({
  title,
  steps,
  currentStatus,
  statusOrder,
  getStepDate,
}: ProgressStepperProps) {
  return (
    <div className="rounded-2xl">
      <h2 className="mb-5 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
        {title}
      </h2>

      {/* Mobile: Vertical Layout */}
      <div className="md:hidden">
        <div className="relative">
          {steps.map((step, index) => {
            const stepState = getStepState(
              step.status,
              currentStatus,
              statusOrder,
            );
            const stepDate = getStepDate(step.status);
            const isLast = index === steps.length - 1;
            const nextStepState =
              index < steps.length - 1
                ? getStepState(
                    steps[index + 1].status,
                    currentStatus,
                    statusOrder,
                  )
                : null;

            return (
              <div key={step.status} className="relative flex">
                {/* Left side: Icon + Line */}
                <div className="mr-4 flex flex-col items-center">
                  <ProgressStepIcon
                    icon={step.icon}
                    stepState={stepState}
                    size="sm"
                  />

                  {/* Connector Line */}
                  {!isLast && (
                    <div
                      className={cn(
                        "h-14 w-0.5",
                        nextStepState === "upcoming"
                          ? "border-l-2 border-dashed border-neutral-200"
                          : "bg-primary",
                      )}
                    />
                  )}
                </div>

                {/* Right side: Content */}
                <ProgressStepLabel
                  label={step.label}
                  stepState={stepState}
                  stepDate={stepDate}
                  className={cn("flex-1 pb-6", isLast && "pb-0")}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Tablet/Desktop: Horizontal Layout */}
      <div className="hidden md:block">
        <div className="flex items-start justify-between">
          {steps.map((step, index) => {
            const stepState = getStepState(
              step.status,
              currentStatus,
              statusOrder,
            );
            const stepDate = getStepDate(step.status);
            const isLast = index === steps.length - 1;
            const nextStepState =
              index < steps.length - 1
                ? getStepState(
                    steps[index + 1].status,
                    currentStatus,
                    statusOrder,
                  )
                : null;

            return (
              <div
                key={step.status}
                className="flex flex-1 flex-col items-center"
              >
                {/* Circle + Line Row */}
                <div className="flex w-full items-center">
                  {/* Left connector line (for non-first items) */}
                  {index > 0 && (
                    <div
                      className={cn(
                        "h-0.5 flex-1",
                        stepState === "upcoming"
                          ? "border-t-2 border-dashed border-neutral-200"
                          : "bg-primary",
                      )}
                    />
                  )}

                  <ProgressStepIcon
                    icon={step.icon}
                    stepState={stepState}
                    size="md"
                  />

                  {/* Right connector line (for non-last items) */}
                  {!isLast && (
                    <div
                      className={cn(
                        "h-0.5 flex-1",
                        nextStepState === "upcoming"
                          ? "border-t-2 border-dashed border-neutral-200"
                          : "bg-primary",
                      )}
                    />
                  )}
                </div>

                {/* Text below circle */}
                <ProgressStepLabel
                  label={step.label}
                  stepState={stepState}
                  stepDate={stepDate}
                  className="mt-3 text-center"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
