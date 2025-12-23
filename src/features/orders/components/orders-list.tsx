"use client";

import { OrderStatus } from "@/types";
import { ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

import {
  InfiniteScrollTrigger,
  OptimizedImage,
  StatusIcon,
} from "@/components/shared";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import type { OrdersListProps } from "../types";

export function OrdersList({ viewModel, loadMoreRef }: OrdersListProps) {
  const { orders, hasOrders, hasMore, isLoading } = viewModel;

  if (!hasOrders) {
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
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {orders.map((order) => (
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
                    {order.statusLabel}
                  </span>
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {order.formattedDate}
                  </span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-neutral-400 transition-transform duration-300 group-hover:translate-x-1" />
            </div>

            {/* Product Images Preview */}
            <div className="mb-5">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4 pl-1">
                  {order.productImages.map((image, index) => (
                    <div
                      key={image.id}
                      className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-sm ring-1 ring-black/5 dark:border-neutral-900 dark:ring-white/10"
                      style={{ zIndex: order.productImages.length - index }}
                    >
                      <OptimizedImage
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  {order.otherItemsCount > 2 && (
                    <div className="relative z-0 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-neutral-100 text-xs font-bold text-neutral-600 dark:border-neutral-900 dark:bg-neutral-800 dark:text-neutral-300">
                      +{order.otherItemsCount - 2}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-neutral-900 dark:text-white">
                    {order.firstProductName}
                  </p>
                  {order.otherItemsCount > 0 && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      & {order.otherItemsCount} other item
                      {order.otherItemsCount > 1 ? "s" : ""}
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
        ))}
      </div>

      {/* Load more trigger */}
      <InfiniteScrollTrigger
        hasMore={hasMore}
        isLoading={isLoading}
        loadMoreRef={loadMoreRef}
      />
    </>
  );
}
