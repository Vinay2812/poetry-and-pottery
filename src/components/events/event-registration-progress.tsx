"use client";

import { EventRegistrationStatus } from "@/types";
import {
  Ban,
  CheckCircle2,
  Clock,
  CreditCard,
  ThumbsUp,
  XCircle,
} from "lucide-react";
import { useCallback } from "react";

import {
  type ProgressStep,
  ProgressStepper,
} from "@/components/shared/progress-stepper";

import { formatProgressDate } from "@/lib/date";

export const REGISTRATION_STEPS: readonly ProgressStep[] = [
  {
    status: EventRegistrationStatus.PENDING,
    label: "Requested",
    pastDescription: "Request was received",
    currentDescription: "Request received",
    futureDescription: "Request will be received",
    icon: Clock,
  },
  {
    status: EventRegistrationStatus.APPROVED,
    label: "Approved",
    pastDescription: "Registration was approved",
    currentDescription: "Registration approved",
    futureDescription: "Registration will be approved",
    icon: ThumbsUp,
  },
  {
    status: EventRegistrationStatus.PAID,
    label: "Payment Received",
    pastDescription: "Payment was received",
    currentDescription: "Payment received",
    futureDescription: "Payment will be received",
    icon: CreditCard,
  },
  {
    status: EventRegistrationStatus.CONFIRMED,
    label: "Confirmed",
    pastDescription: "Registration was confirmed",
    currentDescription: "Registration confirmed",
    futureDescription: "Registration will be confirmed",
    icon: CheckCircle2,
  },
] as const;

const REGISTRATION_STATUS_ORDER: readonly string[] = [
  EventRegistrationStatus.PENDING,
  EventRegistrationStatus.APPROVED,
  EventRegistrationStatus.PAID,
  EventRegistrationStatus.CONFIRMED,
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
  const isCancelled = status === EventRegistrationStatus.CANCELLED;
  const isRejected = status === EventRegistrationStatus.REJECTED;

  const getStepDate = useCallback(
    (stepStatus: string): Date | string | null => {
      switch (stepStatus) {
        case EventRegistrationStatus.PENDING:
          return requestAt ?? createdAt;
        case EventRegistrationStatus.APPROVED:
          return approvedAt ?? null;
        case EventRegistrationStatus.PAID:
          return paidAt ?? null;
        case EventRegistrationStatus.CONFIRMED:
          return confirmedAt ?? null;
        default:
          return null;
      }
    },
    [requestAt, createdAt, approvedAt, paidAt, confirmedAt],
  );

  if (isCancelled) {
    return (
      <div className="rounded-2xl">
        <h2 className="mb-6 text-xs font-bold tracking-widest text-neutral-400 uppercase">
          Registration Status
        </h2>
        <div className="flex items-center gap-4 rounded-xl bg-red-50 p-4 dark:bg-red-950/20">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <Ban className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">
              Registration Cancelled
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

  if (isRejected) {
    return (
      <div className="rounded-2xl">
        <h2 className="mb-6 text-xs font-bold tracking-widest text-neutral-400 uppercase">
          Registration Status
        </h2>
        <div className="flex items-center gap-4 rounded-xl bg-red-50 p-4 dark:bg-red-950/20">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">
              Registration Rejected
            </p>
            <p className="mt-0.5 text-xs text-red-500">
              Please contact support for more information
            </p>
          </div>
        </div>
      </div>
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
