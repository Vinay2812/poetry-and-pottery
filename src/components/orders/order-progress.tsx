"use client";

import { OrderStatus } from "@/types";
import { CheckCircle2, Clock, CreditCard, Package, Truck } from "lucide-react";
import { useCallback } from "react";

import {
  type ProgressStep,
  ProgressStepper,
} from "@/components/shared/progress-stepper";

export const ORDER_STEPS: readonly ProgressStep[] = [
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
}: OrderProgressProps) {
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
