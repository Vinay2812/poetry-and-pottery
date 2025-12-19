"use client";

import {
  type OrderItemWithReviewStatus,
  type OrderWithReviewStatus,
  createProductReview,
} from "@/actions";
import { OrderStatus } from "@/types";
import { Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { OrderProgress } from "@/components/orders";
import { ReviewForm, StatusIcon } from "@/components/shared";
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
  return status?.toString() || "Processing";
}

interface OrderItemCardProps {
  item: OrderItemWithReviewStatus;
  canReview: boolean;
}

function OrderItemCard({ item, canReview }: OrderItemCardProps) {
  const router = useRouter();

  const product = item.product;
  const productImage = product?.image_urls?.[0] || "/placeholder.jpg";
  const productName = product?.name || "Product";
  const productSlug = product?.slug || String(item.product_id);

  const handleReviewSubmit = useCallback(
    async (rating: number, review?: string) => {
      const result = await createProductReview({
        productId: item.product_id,
        rating,
        review,
      });

      if (result.success) {
        router.refresh();
      }

      return {
        success: result.success,
        error: result.success ? undefined : result.error,
      };
    },
    [item.product_id, router],
  );

  return (
    <div className="shadow-soft rounded-2xl bg-white p-4">
      <div className="flex gap-4">
        <Link href={`/products/${productSlug}`}>
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl transition-transform hover:scale-105">
            <Image
              src={productImage}
              alt={productName}
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </div>
        </Link>

        <div className="min-w-0 flex-1">
          <Link href={`/products/${productSlug}`}>
            <h3 className="hover:text-primary text-sm font-medium transition-colors">
              {productName}
            </h3>
          </Link>
          {product?.color_name && (
            <p className="text-muted-foreground text-xs">
              {product.color_name}
            </p>
          )}
          <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
          <p className="text-primary mt-1 text-sm font-bold">
            ₹{(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>

      {canReview && (
        <ReviewForm
          title={`Review ${productName}`}
          hasReviewed={item.hasReviewed}
          variant="full-width"
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
}

interface OrderDetailClientProps {
  order: OrderWithReviewStatus | null;
}

export function OrderDetailClient({ order }: OrderDetailClientProps) {
  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-primary/10 mb-4 flex h-20 w-20 items-center justify-center rounded-full">
          <Package className="text-primary h-10 w-10" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Order not found</h2>
        <p className="text-muted-foreground mb-6 max-w-sm text-sm">
          We couldn&apos;t find this order. It may have been removed or you may
          not have access to it.
        </p>
        <Link href="/orders">
          <Button className="rounded-full px-6">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const canReview = order.status === OrderStatus.DELIVERED;
  const items = order.ordered_products;

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Left Sidebar - Order Details (Desktop) */}
      <div className="hidden lg:block">
        <div className="shadow-soft sticky top-24 space-y-6 rounded-2xl bg-white p-6">
          {/* Status Badge */}
          <div
            className={cn(
              "flex items-center gap-2 rounded-xl p-3",
              order.status === OrderStatus.DELIVERED && "bg-green-50",
              order.status === OrderStatus.SHIPPED && "bg-blue-50",
              order.status === OrderStatus.PROCESSING && "bg-yellow-50",
            )}
          >
            <StatusIcon status={order.status} className="h-5 w-5" />
            <span
              className={cn(
                "font-medium",
                order.status === OrderStatus.DELIVERED && "text-green-700",
                order.status === OrderStatus.SHIPPED && "text-blue-700",
                order.status === OrderStatus.PROCESSING && "text-yellow-700",
              )}
            >
              {getStatusLabel(order.status as OrderStatus)}
            </span>
          </div>

          {/* Order Info */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Order ID</span>
              <span className="text-xs font-medium">{order.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ordered On</span>
              <span>{formatOrderDate(order.created_at)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Items</span>
              <span>{items.length}</span>
            </div>
          </div>

          <div className="border-border border-t" />

          {/* Order Progress */}
          <OrderProgress
            status={order.status || OrderStatus.PROCESSING}
            createdAt={order.created_at}
            shippedAt={order.shipped_at}
            deliveredAt={order.delivered_at}
          />

          <div className="border-border border-t" />

          {/* Order Summary */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span
                className={cn(
                  "font-medium",
                  order.shipping_fee === 0 && "text-green-600",
                )}
              >
                {order.shipping_fee === 0
                  ? "Free"
                  : `₹${order.shipping_fee.toFixed(2)}`}
              </span>
            </div>
            <div className="border-border flex justify-between border-t pt-3">
              <span className="font-semibold">Total</span>
              <span className="text-primary text-xl font-bold">
                ₹{order.total.toFixed(2)}
              </span>
            </div>
          </div>

          {canReview && (
            <>
              <div className="border-border border-t" />
              <div className="bg-primary/10 rounded-xl p-3 text-center">
                <p className="text-primary text-sm font-medium">
                  Leave reviews for your items!
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Content - Items (Desktop) / Full Content (Mobile) */}
      <div className="lg:col-span-2">
        {/* Product Images Hero - Mobile Only */}
        <div className="relative mb-6 lg:hidden">
          <div className="flex gap-2 overflow-hidden rounded-2xl">
            {items.slice(0, 2).map((item) => (
              <div
                key={item.id}
                className={cn(
                  "relative aspect-square overflow-hidden",
                  items.length === 1 ? "w-full" : "w-1/2",
                )}
              >
                <Image
                  src={item.product?.image_urls?.[0] || "/placeholder.jpg"}
                  alt={item.product?.name || "Product"}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          {/* Status Badge Overlay */}
          <div className="absolute right-3 bottom-3">
            <div
              className={cn(
                "flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-white",
                order.status === OrderStatus.DELIVERED && "bg-green-600",
                order.status === OrderStatus.SHIPPED && "bg-blue-600",
                order.status === OrderStatus.PROCESSING && "bg-yellow-600",
              )}
            >
              <StatusIcon
                status={order.status}
                className="h-4 w-4 text-white"
              />
              {getStatusLabel(order.status as OrderStatus)}
            </div>
          </div>
        </div>

        {/* Order Title - Mobile Only */}
        <div className="mb-4 lg:hidden">
          <h2 className="text-lg font-bold">Order {order.id}</h2>
          <p className="text-muted-foreground text-sm">
            Ordered on {formatOrderDate(order.created_at)}
          </p>
        </div>

        {/* Order Progress - Mobile Only */}
        <div className="mb-6 lg:hidden">
          <OrderProgress
            status={order.status || OrderStatus.PROCESSING}
            createdAt={order.created_at}
            shippedAt={order.shipped_at}
            deliveredAt={order.delivered_at}
          />
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="mb-4 text-sm font-semibold lg:text-lg">
            Items ({items.length})
          </h3>
          <div className="space-y-4">
            {items.map((item) => (
              <OrderItemCard key={item.id} item={item} canReview={canReview} />
            ))}
          </div>
        </div>

        {/* Order Summary - Mobile Only */}
        <div className="shadow-soft mb-6 rounded-2xl bg-white p-4 lg:hidden">
          <h3 className="mb-4 text-sm font-semibold">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span
                className={cn(
                  "font-medium",
                  order.shipping_fee === 0 && "text-green-600",
                )}
              >
                {order.shipping_fee === 0
                  ? "Free"
                  : `₹${order.shipping_fee.toFixed(2)}`}
              </span>
            </div>
            <div className="border-border flex justify-between border-t pt-3">
              <span className="font-semibold">Total</span>
              <span className="text-primary text-lg font-bold">
                ₹{order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {canReview && (
          <div className="bg-primary/10 rounded-2xl p-4 text-center lg:hidden">
            <p className="text-primary text-sm font-medium">
              Your order has been delivered! Leave reviews for your items.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
