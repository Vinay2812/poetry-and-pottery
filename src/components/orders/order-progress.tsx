"use client";

import { CheckCircle2, Clock, Package, Truck } from "lucide-react";

import { ORDER_STEPS } from "@/lib/orders";
import { cn } from "@/lib/utils";

type OrderStatusType = "processing" | "shipped" | "delivered";

interface OrderProgressProps {
  status: string;
  createdAt: Date | string;
  shippedAt?: Date | string | null;
  deliveredAt?: Date | string | null;
}

const STATUS_ICONS = {
  processing: Clock,
  shipped: Truck,
  delivered: CheckCircle2,
} as const;

function formatDate(dateValue: Date | string): string {
  const date = new Date(dateValue);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getStepDate(
  step: (typeof ORDER_STEPS)[number],
  props: OrderProgressProps,
): Date | string | null {
  switch (step.status) {
    case "processing":
      return props.createdAt;
    case "shipped":
      return props.shippedAt ?? null;
    case "delivered":
      return props.deliveredAt ?? null;
    default:
      return null;
  }
}

function getStepStatus(
  step: (typeof ORDER_STEPS)[number],
  currentStatus: string,
): "completed" | "current" | "upcoming" {
  const statusOrder: OrderStatusType[] = ["processing", "shipped", "delivered"];
  const currentIndex = statusOrder.indexOf(currentStatus as OrderStatusType);
  const stepIndex = statusOrder.indexOf(step.status);

  if (stepIndex < currentIndex) return "completed";
  if (stepIndex === currentIndex) return "current";
  return "upcoming";
}

export function OrderProgress({
  status,
  createdAt,
  shippedAt,
  deliveredAt,
}: OrderProgressProps) {
  return (
    <div className="border-border bg-card rounded-2xl border p-5 shadow-sm">
      <h2 className="mb-5 font-semibold">Order Progress</h2>

      <div className="relative">
        {ORDER_STEPS.map((step, index) => {
          const StepIcon = STATUS_ICONS[step.status];
          const stepStatus = getStepStatus(step, status);
          const stepDate = getStepDate(step, {
            status,
            createdAt,
            shippedAt,
            deliveredAt,
          });
          const isLast = index === ORDER_STEPS.length - 1;

          return (
            <div
              key={step.status}
              className="relative flex gap-4 pb-6 last:pb-0"
            >
              {/* Vertical line connector */}
              {!isLast && (
                <div
                  className={cn(
                    "absolute top-10 left-[19px] h-[calc(100%-24px)] w-0.5",
                    stepStatus === "completed" || stepStatus === "current"
                      ? "bg-primary"
                      : "bg-border",
                  )}
                />
              )}

              {/* Step icon */}
              <div
                className={cn(
                  "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors",
                  stepStatus === "completed" && "bg-primary text-white",
                  stepStatus === "current" && "bg-primary text-white",
                  stepStatus === "upcoming" && "bg-muted text-muted-foreground",
                )}
              >
                {stepStatus === "completed" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <StepIcon className="h-5 w-5" />
                )}
              </div>

              {/* Step content */}
              <div className="min-w-0 flex-1 pt-1">
                <div className="flex items-center justify-between gap-2">
                  <h3
                    className={cn(
                      "font-medium",
                      stepStatus === "upcoming" && "text-muted-foreground",
                    )}
                  >
                    {step.label}
                  </h3>
                  {stepStatus === "current" && (
                    <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-medium">
                      Current
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    "text-sm",
                    stepStatus === "upcoming"
                      ? "text-muted-foreground/60"
                      : "text-muted-foreground",
                  )}
                >
                  {step.description}
                </p>
                {stepDate &&
                  (stepStatus === "completed" || stepStatus === "current") && (
                    <p className="text-muted-foreground mt-1 text-xs">
                      {formatDate(stepDate)}
                    </p>
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
