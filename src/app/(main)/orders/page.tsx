"use client";

import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { ChevronRight, Package, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { MobileHeader } from "@/components/layout";
import { StatusIcon } from "@/components/status-icon";
import { Button } from "@/components/ui/button";

import {
  formatOrderDate,
  getStatusLabel,
  seedOrdersForUserIfEmpty,
} from "@/lib/orders";
import { cn } from "@/lib/utils";

function OrdersList() {
  const { user } = useUser();
  const userId = user?.id;

  const orders = useMemo(() => {
    if (!userId || typeof window === "undefined") return [];
    const allOrders = seedOrdersForUserIfEmpty(userId);
    // Sort by createdAt, latest first
    return [...allOrders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [userId]);

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
        <p className="text-muted-foreground mt-4 text-sm">Loading orders...</p>
      </div>
    );
  }

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
                    order.status === "delivered" && "bg-green-100",
                    order.status === "shipped" && "bg-blue-100",
                    order.status === "processing" && "bg-yellow-100",
                  )}
                >
                  <StatusIcon status={order.status} className="h-4 w-4" />
                </div>
                <div>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      order.status === "delivered" && "text-green-600",
                      order.status === "shipped" && "text-blue-600",
                      order.status === "processing" && "text-yellow-600",
                    )}
                  >
                    {getStatusLabel(order.status)}
                  </span>
                  <p className="text-muted-foreground text-xs">
                    {formatOrderDate(order.createdAt)}
                  </p>
                </div>
              </div>
              <ChevronRight className="text-muted-foreground h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </div>

            {/* Product Images */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex -space-x-3">
                {order.items.slice(0, 3).map((item, index) => (
                  <div
                    key={item.id}
                    className="relative h-14 w-14 overflow-hidden rounded-xl border-2 border-white shadow-sm"
                    style={{ zIndex: order.items.length - index }}
                  >
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className="bg-muted text-muted-foreground flex h-14 w-14 items-center justify-center rounded-xl border-2 border-white text-xs font-semibold shadow-sm">
                    +{order.items.length - 3}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {order.items[0].productName}
                  {order.items.length > 1 && ` +${order.items.length - 1} more`}
                </p>
                <p className="text-muted-foreground text-xs">
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"}
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

function SignedOutCTA() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-primary/10 mb-4 flex h-20 w-20 items-center justify-center rounded-full">
        <Package className="text-primary h-10 w-10" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">Sign in to view orders</h2>
      <p className="text-muted-foreground mb-6 max-w-sm text-sm">
        Sign in to your account to view your order history and track your
        shipments.
      </p>
      <SignInButton mode="modal">
        <Button className="rounded-full px-6">Sign In</Button>
      </SignInButton>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <>
      <MobileHeader title="My Orders" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-0 lg:pb-12">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          <h1 className="mb-6 hidden text-2xl font-bold lg:block">My Orders</h1>

          <SignedIn>
            <OrdersList />
          </SignedIn>

          <SignedOut>
            <SignedOutCTA />
          </SignedOut>
        </div>
      </main>
    </>
  );
}
