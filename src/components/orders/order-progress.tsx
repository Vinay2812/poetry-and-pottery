"use client";

import { OrderStatus } from "@/types";
import {
  CheckCircle2,
  Clock,
  CreditCard,
  HandCoinsIcon,
  Package,
  Truck,
} from "lucide-react";

import { cn } from "@/lib/utils";

// Each step has descriptions for different states (past/present/future)
export const ORDER_STEPS = [
  {
    status: OrderStatus.PENDING,
    label: "Requested",
    pastDescription: "Request was received",
    currentDescription: "Request received",
    futureDescription: "Request will be received",
    icon: Clock,
  },
  {
    status: OrderStatus.PROCESSING,
    label: "Approved",
    pastDescription: "Order was approved",
    currentDescription: "Order approved",
    futureDescription: "Order will be approved",
    icon: Package,
  },
  {
    status: OrderStatus.PAID,
    label: "Payment Received",
    pastDescription: "Payment was received",
    currentDescription: "Payment received",
    futureDescription: "Payment will be received",
    icon: CreditCard,
  },
  {
    status: OrderStatus.SHIPPED,
    label: "Shipped",
    pastDescription: "Order was shipped",
    currentDescription: "Order shipped",
    futureDescription: "Order will be shipped",
    icon: Truck,
  },
  {
    status: OrderStatus.DELIVERED,
    label: "Delivered",
    pastDescription: "Order was delivered",
    currentDescription: "Order delivered",
    futureDescription: "Order will be delivered",
    icon: CheckCircle2,
  },
] as const;

interface OrderProgressProps {
  status: string;
  createdAt: Date | string;
  requestAt?: Date | string | null;
  approvedAt?: Date | string | null;
  paidAt?: Date | string | null;
  shippedAt?: Date | string | null;
  deliveredAt?: Date | string | null;
  cancelledAt?: Date | string | null;
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

function getStepDate(
  step: (typeof ORDER_STEPS)[number],
  props: OrderProgressProps,
): Date | string | null {
  switch (step.status) {
    case OrderStatus.PENDING:
      return props.requestAt ?? props.createdAt;
    case OrderStatus.PROCESSING:
      return props.approvedAt ?? null;
    case OrderStatus.PAID:
      return props.paidAt ?? null;
    case OrderStatus.SHIPPED:
      return props.shippedAt ?? null;
    case OrderStatus.DELIVERED:
      return props.deliveredAt ?? null;
    default:
      return null;
  }
}

function getStepStatus(
  step: (typeof ORDER_STEPS)[number],
  currentStatus: string,
): "completed" | "current" | "upcoming" {
  const statusOrder: string[] = [
    OrderStatus.PENDING,
    OrderStatus.PROCESSING,
    OrderStatus.PAID,
    OrderStatus.SHIPPED,
    OrderStatus.DELIVERED,
  ];

  const currentIndex = statusOrder.indexOf(currentStatus);
  const stepIndex = statusOrder.indexOf(step.status);

  if (stepIndex < currentIndex) return "completed";
  if (stepIndex === currentIndex) return "current";
  return "upcoming";
}

function getDescription(
  step: (typeof ORDER_STEPS)[number],
  stepStatus: "completed" | "current" | "upcoming",
): string {
  if (stepStatus === "completed") return step.pastDescription;
  if (stepStatus === "current") return step.currentDescription;
  return step.futureDescription;
}

export function OrderProgress({
  status,
  createdAt,
  requestAt,
  approvedAt,
  paidAt,
  shippedAt,
  deliveredAt,
  cancelledAt,
}: OrderProgressProps) {
  return (
    <div className="rounded-2xl">
      <h2 className="mb-6 text-xs font-bold tracking-widest text-neutral-400 uppercase">
        Order Progress
      </h2>

      <div className="relative">
        {ORDER_STEPS.map((step, index) => {
          const StepIcon = step.icon;
          const stepStatus = getStepStatus(step, status);
          const stepDate = getStepDate(step, {
            status,
            createdAt,
            requestAt,
            approvedAt,
            paidAt,
            shippedAt,
            deliveredAt,
            cancelledAt,
          });
          const isFirst = index === 0;
          const isLast = index === ORDER_STEPS.length - 1;
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
                {
                  <div
                    className={cn(
                      "w-0.5 flex-1",
                      isFirst ||
                        getStepStatus(ORDER_STEPS[index - 1], status) ===
                          "completed"
                        ? "bg-primary"
                        : "bg-neutral-100 dark:bg-neutral-800",
                    )}
                  />
                }
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
