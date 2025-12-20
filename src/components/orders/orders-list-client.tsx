"use client";

import { OrderStatus, type OrderWithItems } from "@/types";
import { ChevronRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { StatusIcon } from "@/components/shared";
import { Button } from "@/components/ui/button";

import { capitalize, cn } from "@/lib/utils";

// Helper functions for order formatting
function formatOrderDate(dateString: Date | string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getStatusLabel(status: OrderStatus): string {
  return capitalize(status.toString());
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {orders.map((order) => {
        const items = order.ordered_products;
        const firstProductName = items[0]?.product?.name || "Product";

        return (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-neutral-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
          >
            {/* Status Badge & Date */}
            <div className="mb-5 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 transition-colors dark:bg-neutral-800",
                    order.status === OrderStatus.DELIVERED &&
                      "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
                    order.status === OrderStatus.SHIPPED &&
                      "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                    order.status === OrderStatus.PROCESSING &&
                      "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
                    order.status === OrderStatus.PENDING &&
                      "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
                    order.status === OrderStatus.PAID &&
                      "text-primary bg-primary-light dark:text-primary-foreground",
                    order.status === OrderStatus.CANCELLED &&
                      "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
                    order.status === OrderStatus.RETURNED &&
                      "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
                    order.status === OrderStatus.REFUNDED &&
                      "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400",
                  )}
                >
                  <StatusIcon status={order.status} className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-neutral-900 dark:text-white">
                    {getStatusLabel(order.status as OrderStatus)}
                  </span>
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {formatOrderDate(order.created_at)}
                  </span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-neutral-400 transition-transform duration-300 group-hover:translate-x-1" />
            </div>

            {/* Product Images Preview */}
            <div className="mb-5">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4 pl-1">
                  {items.slice(0, 3).map((item, index) => (
                    <div
                      key={item.id}
                      className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-sm ring-1 ring-black/5 dark:border-neutral-900 dark:ring-white/10"
                      style={{ zIndex: items.length - index }}
                    >
                      <Image
                        src={
                          item.product?.image_urls?.[0] || "/placeholder.jpg"
                        }
                        alt={item.product?.name || "Product"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  {items.length > 3 && (
                    <div className="relative z-0 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-neutral-100 text-xs font-bold text-neutral-600 dark:border-neutral-900 dark:bg-neutral-800 dark:text-neutral-300">
                      +{items.length - 3}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-neutral-900 dark:text-white">
                    {firstProductName}
                  </p>
                  {items.length > 1 && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      & {items.length - 1} other item
                      {items.length > 2 ? "s" : ""}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Order Footer */}
            <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800">
              <span className="text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                Order #{order.id}
              </span>
              <span className="text-base font-bold text-neutral-900 dark:text-white">
                ₹{order.total.toLocaleString()}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
