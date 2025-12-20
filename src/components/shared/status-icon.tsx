import { ClassValue } from "clsx";
import { CheckCircle2, Clock, Package, Truck } from "lucide-react";

import { cn } from "@/lib/utils";

import { ORDER_STEPS } from "../orders/order-progress";

type StatusIconProps = {
  status: string | null;
  className?: ClassValue;
};

export function StatusIcon({ status, className }: StatusIconProps) {
  const step =
    ORDER_STEPS.find((step) => step.status === status) || ORDER_STEPS[0];

  const StepIcon = step.icon;
  return <StepIcon className={cn("h-4 w-4", className)} />;
}
