"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";

import { EmptyState } from "@/components/sections";
import { InfiniteScrollTrigger, OptimizedImage } from "@/components/shared";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { OrderStatus } from "../types";
import type {
  OrderCardViewModel,
  OrderStatusFilter,
  OrdersListProps,
} from "../types";

// Status filter options
const STATUS_FILTERS: Array<{ value: OrderStatusFilter; label: string }> = [
  { value: "all", label: "All Orders" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

// Status badge styles
function getStatusBadgeStyles(status: OrderStatus) {
  switch (status) {
    case OrderStatus.Delivered:
      return "bg-green-100 text-green-600";
    case OrderStatus.Shipped:
      return "bg-blue-100 text-blue-600";
    case OrderStatus.Processing:
    case OrderStatus.Pending:
    case OrderStatus.Paid:
      return "bg-amber-100 text-amber-600";
    case OrderStatus.Cancelled:
    case OrderStatus.Refunded:
    case OrderStatus.Returned:
      return "bg-red-100 text-red-600";
    default:
      return "bg-neutral-100 text-neutral-600";
  }
}

interface StatusFilterChipsProps {
  activeFilter: OrderStatusFilter;
  onFilterChange: (filter: OrderStatusFilter) => void;
}

function StatusFilterChips({
  activeFilter,
  onFilterChange,
}: StatusFilterChipsProps) {
  return (
    <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:px-0">
      {STATUS_FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
            activeFilter === filter.value
              ? "bg-primary text-white"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200",
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

interface OrderCardProps {
  order: OrderCardViewModel;
}

function OrderCard({ order }: OrderCardProps) {
  const maxVisibleThumbnails = 3;
  const visibleImages = order.productImages.slice(0, maxVisibleThumbnails);
  const remainingCount = order.totalItemsCount - visibleImages.length;

  return (
    <Link
      href={`/orders/${order.id}`}
      className="group shadow-soft hover:shadow-card block rounded-2xl bg-white p-4 transition-all duration-200 hover:-translate-y-1 lg:p-5"
    >
      {/* Header: Product Title, Status Badge */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-display truncate text-sm text-neutral-900">
            <span className="font-bold">{order.firstProductName}</span>
            {order.otherItemsCount > 0 && (
              <span className="ml-1.5 text-xs font-bold text-neutral-500">
                +{order.otherItemsCount} more
              </span>
            )}
          </p>
          <p className="mt-0.5 text-xs text-neutral-500">
            #{order.id} · {order.formattedDate}
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase",
            getStatusBadgeStyles(order.status),
          )}
        >
          {order.statusLabel}
        </span>
      </div>

      {/* Product Thumbnails */}
      <div className="mb-4 flex items-center gap-2">
        {visibleImages.map((image) => (
          <div
            key={image.id}
            className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-neutral-100"
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-xs font-semibold text-neutral-500">
            +{remainingCount}
          </div>
        )}
      </div>

      {/* Footer: Total and CTA */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-neutral-500">
            Total ({order.totalItemsCount}{" "}
            {order.totalItemsCount === 1 ? "item" : "items"})
          </p>
          <p className="font-display text-base font-bold text-neutral-900">
            ₹{order.total.toLocaleString()}
          </p>
        </div>
        <Button variant="default" size="sm" className="rounded-lg text-xs">
          View Details
        </Button>
      </div>
    </Link>
  );
}

export function OrdersList({
  viewModel,
  loadMoreRef,
  onStatusFilterChange,
}: OrdersListProps) {
  const { orders, hasOrders, hasMore, isLoading, statusFilter } = viewModel;

  return (
    <div className="space-y-6">
      {/* Status Filter Chips */}
      <StatusFilterChips
        activeFilter={statusFilter}
        onFilterChange={onStatusFilterChange}
      />

      {!hasOrders ? (
        <div className="py-8 lg:py-16">
          <EmptyState
            icon={ShoppingBag}
            title={statusFilter !== "all" ? "No orders found" : "No orders yet"}
            description={
              statusFilter !== "all"
                ? "No orders match this filter. Try selecting a different status."
                : "When you place an order, it will appear here. Start shopping to see your orders!"
            }
            actionText="Browse Products"
            actionHref="/products"
          />
        </div>
      ) : (
        <>
          {/* Orders Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>

          {/* Load more trigger */}
          <InfiniteScrollTrigger
            hasMore={hasMore}
            isLoading={isLoading}
            loadMoreRef={loadMoreRef}
          />
        </>
      )}
    </div>
  );
}
