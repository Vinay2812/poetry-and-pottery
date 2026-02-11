"use client";

import {
  Ban,
  CreditCard,
  Home,
  Package,
  PackageCheck,
  Truck,
} from "lucide-react";
import { useCallback } from "react";

import { CancelledStatusBanner } from "@/components/shared/cancelled-status-banner";
import {
  type ProgressStep,
  ProgressStepper,
} from "@/components/shared/progress-stepper";

import { OrderStatus } from "@/graphql/generated/types";

export const ORDER_STEPS: readonly ProgressStep[] = [
  {
    status: OrderStatus.Pending,
    label: "Order Placed",
    pastDescription: "Order was placed",
    currentDescription: "Order placed",
    futureDescription: "Order will be placed",
    icon: Package,
  },
  {
    status: OrderStatus.Processing,
    label: "Processing",
    pastDescription: "Order was processed",
    currentDescription: "Order being processed",
    futureDescription: "Order will be processed",
    icon: PackageCheck,
  },
  {
    status: OrderStatus.Paid,
    label: "Payment Confirmed",
    pastDescription: "Payment was confirmed",
    currentDescription: "Payment confirmed",
    futureDescription: "Payment will be confirmed",
    icon: CreditCard,
  },
  {
    status: OrderStatus.Shipped,
    label: "Shipped",
    pastDescription: "Order was shipped",
    currentDescription: "Order shipped",
    futureDescription: "Order will be shipped",
    icon: Truck,
  },
  {
    status: OrderStatus.Delivered,
    label: "Delivered",
    pastDescription: "Order was delivered",
    currentDescription: "Order delivered",
    futureDescription: "Order will be delivered",
    icon: Home,
  },
] as const;

const ORDER_STATUS_ORDER: readonly string[] = [
  OrderStatus.Pending,
  OrderStatus.Processing,
  OrderStatus.Paid,
  OrderStatus.Shipped,
  OrderStatus.Delivered,
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
  const isCancelled = status === OrderStatus.Cancelled;

  const getStepDate = useCallback(
    (stepStatus: string): Date | string | null => {
      switch (stepStatus) {
        case OrderStatus.Pending:
          return requestAt ?? createdAt;
        case OrderStatus.Processing:
          return approvedAt ?? null;
        case OrderStatus.Paid:
          return paidAt ?? null;
        case OrderStatus.Shipped:
          return shippedAt ?? null;
        case OrderStatus.Delivered:
          return deliveredAt ?? null;
        default:
          return null;
      }
    },
    [requestAt, createdAt, approvedAt, paidAt, shippedAt, deliveredAt],
  );

  if (isCancelled) {
    return (
      <CancelledStatusBanner
        title="Order Status"
        label="Order Cancelled"
        icon={Ban}
        timestamp={cancelledAt}
      />
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
