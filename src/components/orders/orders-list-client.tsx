"use client";

import { OrderStatus } from "@/prisma/generated/client";
import type { OrderWithItems } from "@/types";
import { ChevronRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { StatusIcon } from "@/components/shared";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

// Helper functions for order formatting
function formatOrderDate(dateString: Date | string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getStatusLabel(status: OrderStatus | null): string {
  const labels: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: "Pending",
    [OrderStatus.PROCESSING]: "Processing",
    [OrderStatus.PAID]: "Paid",
    [OrderStatus.SHIPPED]: "Shipped",
    [OrderStatus.DELIVERED]: "Delivered",
    [OrderStatus.CANCELLED]: "Cancelled",
    [OrderStatus.RETURNED]: "Returned",
    [OrderStatus.REFUNDED]: "Refunded",
  };
  return labels[status || OrderStatus.PROCESSING] || "Processing";
}

interface OrdersListClientProps {
  orders: OrderWithItems[];
}

export function OrdersListClient({ orders }: OrdersListClientProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-primary/10 mb-4 flex h-20 w-20 items-center justify-center rounded-full">
          <ShoppingBag className="text-primary h-10 w-10" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">No orders yet</h2>
        <p className="text-muted-foreground mb-6 max-w-sm text-sm">
          When you place an order, it will appear here. Start shopping to see
          your orders!
        </p>
        <Link href="/products">
          <Button className="rounded-full px-6">Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {orders.map((order) => {
        const items = order.ordered_products;
        const firstProductImage =
          items[0]?.product?.image_urls?.[0] || "/placeholder.jpg";
        const firstProductName = items[0]?.product?.name || "Product";

        return (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="group border-border bg-card hover:border-primary/30 block rounded-2xl border p-5 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            {/* Status Badge & Date */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    order.status === OrderStatus.DELIVERED && "bg-green-100",
                    order.status === OrderStatus.SHIPPED && "bg-blue-100",
                    order.status === OrderStatus.PROCESSING && "bg-yellow-100",
                  )}
                >
                  <StatusIcon status={order.status} className="h-4 w-4" />
                </div>
                <div>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      order.status === OrderStatus.DELIVERED &&
                        "text-green-600",
                      order.status === OrderStatus.SHIPPED && "text-blue-600",
                      order.status === OrderStatus.PROCESSING &&
                        "text-yellow-600",
                    )}
                  >
                    {getStatusLabel(order.status)}
                  </span>
                  <p className="text-muted-foreground text-xs">
                    {formatOrderDate(order.created_at)}
                  </p>
                </div>
              </div>
              <ChevronRight className="text-muted-foreground h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </div>

            {/* Product Images */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex -space-x-3">
                {items.slice(0, 3).map((item, index) => (
                  <div
                    key={item.id}
                    className="relative h-14 w-14 overflow-hidden rounded-xl border-2 border-white shadow-sm"
                    style={{ zIndex: items.length - index }}
                  >
                    <Image
                      src={item.product?.image_urls?.[0] || "/placeholder.jpg"}
                      alt={item.product?.name || "Product"}
                      width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
                {items.length > 3 && (
                  <div className="bg-muted text-muted-foreground flex h-14 w-14 items-center justify-center rounded-xl border-2 border-white text-xs font-semibold shadow-sm">
                    +{items.length - 3}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {firstProductName}
                  {items.length > 1 && ` +${items.length - 1} more`}
                </p>
                <p className="text-muted-foreground text-xs">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </p>
              </div>
            </div>

            {/* Order ID & Total */}
            <div className="border-border flex items-center justify-between border-t pt-4">
              <p className="text-muted-foreground text-xs font-medium">
                {order.id}
              </p>
              <p className="text-primary text-lg font-bold">
                ₹{order.total.toFixed(2)}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
