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

      {/* Mobile: Vertical Layout */}
      <div className="md:hidden">
        <div className="relative">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const stepStatus = getStepStatus(
              step.status,
              currentStatus,
              statusOrder,
            );
            const stepDate = getStepDate(step.status);
            const isLast = index === steps.length - 1;
            const nextStepStatus =
              index < steps.length - 1
                ? getStepStatus(
                    steps[index + 1].status,
                    currentStatus,
                    statusOrder,
                  )
                : null;

            return (
              <div key={step.status} className="relative flex">
                {/* Left side: Icon + Line */}
                <div className="mr-4 flex flex-col items-center">
                  {/* Icon Circle */}
                  <div
                    className={cn(
                      "z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                      stepStatus === "completed" && "bg-primary text-white",
                      stepStatus === "current" &&
                        "bg-primary-light text-primary",
                      stepStatus === "upcoming" &&
                        "bg-neutral-100 text-neutral-400",
                    )}
                  >
                    {stepStatus === "completed" ? (
                      <Check className="h-5 w-5" strokeWidth={2.5} />
                    ) : (
                      <StepIcon className="h-5 w-5" />
                    )}
                  </div>

                  {/* Connector Line */}
                  {!isLast && (
                    <div
                      className={cn(
                        "h-14 w-0.5",
                        nextStepStatus === "upcoming"
                          ? "border-l-2 border-dashed border-neutral-200"
                          : "bg-primary",
                      )}
                    />
                  )}
                </div>

                {/* Right side: Content */}
                <div className={cn("flex-1 pb-6", isLast && "pb-0")}>
                  <h3
                    className={cn(
                      "text-sm font-semibold",
                      stepStatus === "upcoming"
                        ? "text-neutral-400"
                        : "text-neutral-900 dark:text-neutral-100",
                    )}
                  >
                    {step.label}
                  </h3>

                  {stepDate && stepStatus !== "upcoming" ? (
                    <time className="mt-0.5 block text-xs text-neutral-500">
                      {formatProgressDate(stepDate)}
                    </time>
                  ) : stepStatus === "upcoming" ? (
                    <span className="mt-0.5 block text-xs text-neutral-400">
                      Pending
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tablet/Desktop: Horizontal Layout */}
      <div className="hidden md:block">
        <div className="flex items-start justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const stepStatus = getStepStatus(
              step.status,
              currentStatus,
              statusOrder,
            );
            const stepDate = getStepDate(step.status);
            const isLast = index === steps.length - 1;
            const nextStepStatus =
              index < steps.length - 1
                ? getStepStatus(
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
                        stepStatus === "upcoming"
                          ? "border-t-2 border-dashed border-neutral-200"
                          : "bg-primary",
                      )}
                    />
                  )}

                  {/* Icon Circle */}
                  <div
                    className={cn(
                      "z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                      stepStatus === "completed" && "bg-primary text-white",
                      stepStatus === "current" &&
                        "bg-primary-light text-primary",
                      stepStatus === "upcoming" &&
                        "bg-neutral-100 text-neutral-400",
                    )}
                  >
                    {stepStatus === "completed" ? (
                      <Check className="h-5 w-5" strokeWidth={2.5} />
                    ) : (
                      <StepIcon className="h-5 w-5" />
                    )}
                  </div>

                  {/* Right connector line (for non-last items) */}
                  {!isLast && (
                    <div
                      className={cn(
                        "h-0.5 flex-1",
                        nextStepStatus === "upcoming"
                          ? "border-t-2 border-dashed border-neutral-200"
                          : "bg-primary",
                      )}
                    />
                  )}
                </div>

                {/* Text below circle */}
                <div className="mt-3 text-center">
                  <h3
                    className={cn(
                      "text-sm font-semibold",
                      stepStatus === "upcoming"
                        ? "text-neutral-400"
                        : "text-neutral-900 dark:text-neutral-100",
                    )}
                  >
                    {step.label}
                  </h3>

                  {stepDate && stepStatus !== "upcoming" ? (
                    <time className="mt-0.5 block text-xs text-neutral-500">
                      {formatProgressDate(stepDate)}
                    </time>
                  ) : stepStatus === "upcoming" ? (
                    <span className="mt-0.5 block text-xs text-neutral-400">
                      Pending
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
