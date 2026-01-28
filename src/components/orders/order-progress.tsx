"use client";

import { OrderStatus } from "@/types";
import {
  Ban,
  CreditCard,
  Home,
  Package,
  PackageCheck,
  Truck,
} from "lucide-react";
import { useCallback } from "react";

import {
  type ProgressStep,
  ProgressStepper,
} from "@/components/shared/progress-stepper";

import { formatProgressDate } from "@/lib/date";

export const ORDER_STEPS: readonly ProgressStep[] = [
  {
    status: OrderStatus.PENDING,
    label: "Order Placed",
    pastDescription: "Order was placed",
    currentDescription: "Order placed",
    futureDescription: "Order will be placed",
    icon: Package,
  },
  {
    status: OrderStatus.PROCESSING,
    label: "Processing",
    pastDescription: "Order was processed",
    currentDescription: "Order being processed",
    futureDescription: "Order will be processed",
    icon: PackageCheck,
  },
  {
    status: OrderStatus.PAID,
    label: "Payment Confirmed",
    pastDescription: "Payment was confirmed",
    currentDescription: "Payment confirmed",
    futureDescription: "Payment will be confirmed",
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
    icon: Home,
  },
] as const;

const ORDER_STATUS_ORDER: readonly string[] = [
  OrderStatus.PENDING,
  OrderStatus.PROCESSING,
  OrderStatus.PAID,
  OrderStatus.SHIPPED,
  OrderStatus.DELIVERED,
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
  const isCancelled = status === OrderStatus.CANCELLED;

  const getStepDate = useCallback(
    (stepStatus: string): Date | string | null => {
      switch (stepStatus) {
        case OrderStatus.PENDING:
          return requestAt ?? createdAt;
        case OrderStatus.PROCESSING:
          return approvedAt ?? null;
        case OrderStatus.PAID:
          return paidAt ?? null;
        case OrderStatus.SHIPPED:
          return shippedAt ?? null;
        case OrderStatus.DELIVERED:
          return deliveredAt ?? null;
        default:
          return null;
      }
    },
    [requestAt, createdAt, approvedAt, paidAt, shippedAt, deliveredAt],
  );

  if (isCancelled) {
    return (
      <div className="rounded-2xl">
        <h2 className="mb-6 text-xs font-bold tracking-widest text-neutral-400 uppercase">
          Order Status
        </h2>
        <div className="flex items-center gap-4 rounded-xl bg-red-50 p-4 dark:bg-red-950/20">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <Ban className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">
              Order Cancelled
            </p>
            {cancelledAt && (
              <time className="mt-0.5 block text-[10px] font-bold tracking-wider text-red-500 uppercase">
                {formatProgressDate(cancelledAt)}
              </time>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProgressStepper
      title="Order Progress"
      steps={ORDER_STEPS}
      currentStatus={status}
      statusOrder={ORDER_STATUS_ORDER}
      getStepDate={getStepDate}
    />
  );
}
