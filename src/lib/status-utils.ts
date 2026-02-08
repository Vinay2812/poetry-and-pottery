import {
  DailyWorkshopRegistrationStatus,
  EventLevel,
  EventRegistrationStatus,
  EventStatus,
  OrderStatus,
} from "@/graphql/generated/types";

// Order status options
export function getOrderStatusOptions(): {
  value: OrderStatus;
  label: string;
}[] {
  return [
    { value: OrderStatus.Pending, label: "Pending" },
    { value: OrderStatus.Processing, label: "Processing" },
    { value: OrderStatus.Paid, label: "Paid" },
    { value: OrderStatus.Shipped, label: "Shipped" },
    { value: OrderStatus.Delivered, label: "Delivered" },
    { value: OrderStatus.Cancelled, label: "Cancelled" },
    { value: OrderStatus.Returned, label: "Returned" },
    { value: OrderStatus.Refunded, label: "Refunded" },
  ];
}

// Order status color configuration
export function getOrderStatusColor(status: OrderStatus): string {
  const colors: Record<OrderStatus, string> = {
    [OrderStatus.Pending]: "bg-amber-100 text-amber-700 border-amber-200",
    [OrderStatus.Processing]: "bg-blue-100 text-blue-700 border-blue-200",
    [OrderStatus.Paid]: "bg-emerald-100 text-emerald-700 border-emerald-200",
    [OrderStatus.Shipped]: "bg-purple-100 text-purple-700 border-purple-200",
    [OrderStatus.Delivered]: "bg-primary/10 text-primary border-primary/20",
    [OrderStatus.Cancelled]: "bg-red-100 text-red-700 border-red-200",
    [OrderStatus.Returned]: "bg-orange-100 text-orange-700 border-orange-200",
    [OrderStatus.Refunded]:
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
    { value: EventRegistrationStatus.Pending, label: "Pending" },
    { value: EventRegistrationStatus.Approved, label: "Approved" },
    { value: EventRegistrationStatus.Rejected, label: "Rejected" },
    { value: EventRegistrationStatus.Paid, label: "Paid" },
    { value: EventRegistrationStatus.Confirmed, label: "Confirmed" },
    { value: EventRegistrationStatus.Cancelled, label: "Cancelled" },
  ];
}

// Registration status color configuration
export function getRegistrationStatusColor(
  status: EventRegistrationStatus,
): string {
  const colors: Record<EventRegistrationStatus, string> = {
    [EventRegistrationStatus.Pending]:
      "bg-amber-100 text-amber-700 border-amber-200",
    [EventRegistrationStatus.Approved]:
      "bg-blue-100 text-blue-700 border-blue-200",
    [EventRegistrationStatus.Rejected]:
      "bg-red-100 text-red-700 border-red-200",
    [EventRegistrationStatus.Paid]:
      "bg-emerald-100 text-emerald-700 border-emerald-200",
    [EventRegistrationStatus.Confirmed]:
      "bg-primary/10 text-primary border-primary/20",
    [EventRegistrationStatus.Cancelled]:
      "bg-neutral-100 text-neutral-700 border-neutral-200",
  };
  return colors[status];
}

export function getDailyWorkshopRegistrationStatusColor(
  status: DailyWorkshopRegistrationStatus,
): string {
  const colors: Record<DailyWorkshopRegistrationStatus, string> = {
    [DailyWorkshopRegistrationStatus.Pending]:
      "bg-amber-100 text-amber-700 border-amber-200",
    [DailyWorkshopRegistrationStatus.Approved]:
      "bg-blue-100 text-blue-700 border-blue-200",
    [DailyWorkshopRegistrationStatus.Rejected]:
      "bg-red-100 text-red-700 border-red-200",
    [DailyWorkshopRegistrationStatus.Paid]:
      "bg-emerald-100 text-emerald-700 border-emerald-200",
    [DailyWorkshopRegistrationStatus.Confirmed]:
      "bg-primary/10 text-primary border-primary/20",
    [DailyWorkshopRegistrationStatus.Cancelled]:
      "bg-neutral-100 text-neutral-700 border-neutral-200",
  };
  return colors[status];
}

// Event status color configuration
export function getEventStatusColor(status: EventStatus): string {
  const colors: Record<EventStatus, string> = {
    [EventStatus.Upcoming]: "bg-blue-100 text-blue-700 border-blue-200",
    [EventStatus.Active]: "bg-emerald-100 text-emerald-700 border-emerald-200",
    [EventStatus.Inactive]:
      "bg-neutral-100 text-neutral-700 border-neutral-200",
    [EventStatus.Completed]: "bg-primary/10 text-primary border-primary/20",
    [EventStatus.Cancelled]: "bg-red-100 text-red-700 border-red-200",
  };
  return colors[status];
}

// Event level color configuration
export function getEventLevelColor(level: EventLevel): string {
  const colors: Record<EventLevel, string> = {
    [EventLevel.Beginner]: "bg-green-100 text-green-700 border-green-200",
    [EventLevel.Intermediate]: "bg-amber-100 text-amber-700 border-amber-200",
    [EventLevel.Advanced]: "bg-purple-100 text-purple-700 border-purple-200",
  };
  return colors[level];
}
