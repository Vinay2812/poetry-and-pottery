"use client";

import { LucideIcon } from "lucide-react";

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

function formatDate(dateValue: Date | string): string {
  const date = new Date(dateValue);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getStepStatus(
  stepStatus: string,
  currentStatus: string,
  statusOrder: readonly string[],
): "completed" | "current" | "upcoming" {
  const currentIndex = statusOrder.indexOf(currentStatus);
  const stepIndex = statusOrder.indexOf(stepStatus);

  if (stepIndex < currentIndex) return "completed";
  if (stepIndex === currentIndex) return "current";
  return "upcoming";
}

function getDescription(
  step: ProgressStep,
  stepStatus: "completed" | "current" | "upcoming",
): string {
  if (stepStatus === "completed") return step.pastDescription;
  if (stepStatus === "current") return step.currentDescription;
  return step.futureDescription;
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
      <h2 className="mb-6 text-xs font-bold tracking-widest text-neutral-400 uppercase">
        {title}
      </h2>

      <div className="relative">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const stepStatus = getStepStatus(
            step.status,
            currentStatus,
            statusOrder,
          );
          const stepDate = getStepDate(step.status);
          const isFirst = index === 0;
          const isLast = index === steps.length - 1;
          const description = getDescription(step, stepStatus);

          return (
            <div key={step.status} className="relative flex">
              {/* Left side: Icon + Line */}
              <div className="mr-4 flex flex-col items-center">
                {/* Icon */}
                <div
                  className={cn(
                    "z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                    stepStatus === "completed" &&
                      "border-primary bg-primary text-white",
                    stepStatus === "current" &&
                      "border-primary bg-primary text-white",
                    stepStatus === "upcoming" &&
                      "border-neutral-200 bg-neutral-50 text-neutral-300 dark:border-neutral-700 dark:bg-neutral-800",
                  )}
                >
                  <StepIcon className="h-4 w-4" />
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div
                    className={cn(
                      "h-12 w-0.5",
                      isFirst ||
                        getStepStatus(
                          steps[index].status,
                          currentStatus,
                          statusOrder,
                        ) === "completed"
                        ? "bg-primary"
                        : "bg-neutral-100 dark:bg-neutral-800",
                    )}
                  />
                )}
              </div>

              {/* Right side: Content */}
              <div
                className={cn(
                  "flex-1 pb-8",
                  isLast && "pb-0",
                  stepStatus === "upcoming" && "opacity-40",
                )}
              >
                <div className="flex items-center gap-2">
                  <h3
                    className={cn(
                      "text-sm font-bold",
                      stepStatus === "upcoming"
                        ? "text-neutral-500"
                        : "text-neutral-900 dark:text-neutral-100",
                    )}
                  >
                    {step.label}
                  </h3>
                  {stepStatus === "current" && (
                    <span className="bg-primary ring-primary/20 flex h-1.5 w-1.5 animate-pulse rounded-full ring-4" />
                  )}
                </div>

                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                  {description}
                </p>

                {stepDate && stepStatus !== "upcoming" && (
                  <time className="text-primary mt-1.5 block text-[10px] font-bold tracking-wider uppercase">
                    {formatDate(stepDate)}
                  </time>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
