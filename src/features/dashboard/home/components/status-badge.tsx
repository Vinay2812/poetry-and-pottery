interface StatusBadgeProps {
  status: string;
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  PENDING: { label: "Pending", className: "bg-amber-100 text-amber-700" },
  PROCESSING: { label: "Processing", className: "bg-blue-100 text-blue-700" },
  APPROVED: { label: "Approved", className: "bg-blue-100 text-blue-700" },
  PAID: { label: "Paid", className: "bg-primary/10 text-primary" },
  CONFIRMED: { label: "Confirmed", className: "bg-primary/10 text-primary" },
  SHIPPED: { label: "Shipped", className: "bg-purple-100 text-purple-700" },
  DELIVERED: { label: "Delivered", className: "bg-primary/10 text-primary" },
  CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-700" },
  REJECTED: { label: "Rejected", className: "bg-red-100 text-red-700" },
  RETURNED: { label: "Returned", className: "bg-red-100 text-red-700" },
  REFUNDED: {
    label: "Refunded",
    className: "bg-neutral-100 text-neutral-700",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = STATUS_CONFIG[status] || {
    label: status,
    className: "bg-neutral-100 text-neutral-700",
  };

  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}
