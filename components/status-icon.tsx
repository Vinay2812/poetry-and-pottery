import { ClassValue } from "clsx";
import { CheckCircle2, Clock, Package, Truck } from "lucide-react";

import { OrderStatus } from "@/lib/orders";
import { cn } from "@/lib/utils";

type StatusIconProps = {
  status: OrderStatus;
  className?: ClassValue;
};

export function StatusIcon({ status, className }: StatusIconProps) {
  switch (status) {
    case "delivered":
      return (
        <CheckCircle2 className={cn("h-5 w-5 text-green-600", className)} />
      );
    case "shipped":
      return <Truck className={cn("h-5 w-5 text-blue-600", className)} />;
    case "processing":
      return <Clock className={cn("h-5 w-5 text-yellow-600", className)} />;
    default:
      return <Package className={cn("h-5 w-5 text-gray-600", className)} />;
  }
}
