import { EventRegistrationStatus, OrderStatus } from "@/prisma/generated/enums";

// Order status options
export function getOrderStatusOptions(): {
  value: OrderStatus;
  label: string;
}[] {
  return [
    { value: OrderStatus.PENDING, label: "Pending" },
    { value: OrderStatus.PROCESSING, label: "Processing" },
    { value: OrderStatus.PAID, label: "Paid" },
    { value: OrderStatus.SHIPPED, label: "Shipped" },
    { value: OrderStatus.DELIVERED, label: "Delivered" },
    { value: OrderStatus.CANCELLED, label: "Cancelled" },
    { value: OrderStatus.RETURNED, label: "Returned" },
    { value: OrderStatus.REFUNDED, label: "Refunded" },
  ];
}

// Order status color configuration
export function getOrderStatusColor(status: OrderStatus): string {
  const colors: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: "bg-amber-100 text-amber-700 border-amber-200",
    [OrderStatus.PROCESSING]: "bg-blue-100 text-blue-700 border-blue-200",
    [OrderStatus.PAID]: "bg-emerald-100 text-emerald-700 border-emerald-200",
    [OrderStatus.SHIPPED]: "bg-purple-100 text-purple-700 border-purple-200",
    [OrderStatus.DELIVERED]: "bg-primary/10 text-primary border-primary/20",
    [OrderStatus.CANCELLED]: "bg-red-100 text-red-700 border-red-200",
    [OrderStatus.RETURNED]: "bg-orange-100 text-orange-700 border-orange-200",
    [OrderStatus.REFUNDED]:
      "bg-neutral-100 text-neutral-700 border-neutral-200",
  };
  return colors[status];
}

// Registration status options
export function getRegistrationStatusOptions(): {
  value: EventRegistrationStatus;
  label: string;
}[] {
  return [
    { value: EventRegistrationStatus.PENDING, label: "Pending" },
    { value: EventRegistrationStatus.APPROVED, label: "Approved" },
    { value: EventRegistrationStatus.REJECTED, label: "Rejected" },
    { value: EventRegistrationStatus.PAID, label: "Paid" },
    { value: EventRegistrationStatus.CONFIRMED, label: "Confirmed" },
    { value: EventRegistrationStatus.CANCELLED, label: "Cancelled" },
  ];
}

// Registration status color configuration
export function getRegistrationStatusColor(
  status: EventRegistrationStatus,
): string {
  const colors: Record<EventRegistrationStatus, string> = {
    [EventRegistrationStatus.PENDING]:
      "bg-amber-100 text-amber-700 border-amber-200",
    [EventRegistrationStatus.APPROVED]:
      "bg-blue-100 text-blue-700 border-blue-200",
    [EventRegistrationStatus.REJECTED]:
      "bg-red-100 text-red-700 border-red-200",
    [EventRegistrationStatus.PAID]:
      "bg-emerald-100 text-emerald-700 border-emerald-200",
    [EventRegistrationStatus.CONFIRMED]:
      "bg-primary/10 text-primary border-primary/20",
    [EventRegistrationStatus.CANCELLED]:
      "bg-neutral-100 text-neutral-700 border-neutral-200",
  };
  return colors[status];
}
