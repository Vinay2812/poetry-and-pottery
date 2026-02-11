"use client";

import { EventRegistrationStatus } from "@/data/events/types";
import {
  Ban,
  CheckCircle2,
  Clock,
  CreditCard,
  ThumbsUp,
  XCircle,
} from "lucide-react";
import { useCallback } from "react";

import { CancelledStatusBanner } from "@/components/shared/cancelled-status-banner";
import {
  type ProgressStep,
  ProgressStepper,
} from "@/components/shared/progress-stepper";

export const REGISTRATION_STEPS: readonly ProgressStep[] = [
  {
    status: EventRegistrationStatus.Pending,
    label: "Requested",
    pastDescription: "Request was received",
    currentDescription: "Request received",
    futureDescription: "Request will be received",
    icon: Clock,
  },
  {
    status: EventRegistrationStatus.Approved,
    label: "Approved",
    pastDescription: "Registration was approved",
    currentDescription: "Registration approved",
    futureDescription: "Registration will be approved",
    icon: ThumbsUp,
  },
  {
    status: EventRegistrationStatus.Paid,
    label: "Payment Received",
    pastDescription: "Payment was received",
    currentDescription: "Payment received",
    futureDescription: "Payment will be received",
    icon: CreditCard,
  },
  {
    status: EventRegistrationStatus.Confirmed,
    label: "Confirmed",
    pastDescription: "Registration was confirmed",
    currentDescription: "Registration confirmed",
    futureDescription: "Registration will be confirmed",
    icon: CheckCircle2,
  },
] as const;

const REGISTRATION_STATUS_ORDER: readonly string[] = [
  EventRegistrationStatus.Pending,
  EventRegistrationStatus.Approved,
  EventRegistrationStatus.Paid,
  EventRegistrationStatus.Confirmed,
] as const;

interface EventRegistrationProgressProps {
  status: EventRegistrationStatus;
  requestAt?: Date | string | null;
  approvedAt?: Date | string | null;
  paidAt?: Date | string | null;
  confirmedAt?: Date | string | null;
  cancelledAt?: Date | string | null;
  createdAt: Date | string;
}

export function EventRegistrationProgress({
  status,
  requestAt,
  approvedAt,
  paidAt,
  confirmedAt,
  cancelledAt,
  createdAt,
}: EventRegistrationProgressProps) {
  const isCancelled = status === EventRegistrationStatus.Cancelled;
  const isRejected = status === EventRegistrationStatus.Rejected;

  const getStepDate = useCallback(
    (stepStatus: string): Date | string | null => {
      switch (stepStatus) {
        case EventRegistrationStatus.Pending:
          return requestAt ?? createdAt;
        case EventRegistrationStatus.Approved:
          return approvedAt ?? null;
        case EventRegistrationStatus.Paid:
          return paidAt ?? null;
        case EventRegistrationStatus.Confirmed:
          return confirmedAt ?? null;
        default:
          return null;
      }
    },
    [requestAt, createdAt, approvedAt, paidAt, confirmedAt],
  );

  if (isCancelled) {
    return (
      <CancelledStatusBanner
        title="Registration Status"
        label="Registration Cancelled"
        icon={Ban}
        timestamp={cancelledAt}
      />
    );
  }

  if (isRejected) {
    return (
      <CancelledStatusBanner
        title="Registration Status"
        label="Registration Rejected"
        icon={XCircle}
        subtitle="Please contact support for more information"
      />
    );
  }

  return (
    <ProgressStepper
      title="Registration Progress"
      steps={REGISTRATION_STEPS}
      currentStatus={status}
      statusOrder={REGISTRATION_STATUS_ORDER}
      getStepDate={getStepDate}
    />
  );
}
