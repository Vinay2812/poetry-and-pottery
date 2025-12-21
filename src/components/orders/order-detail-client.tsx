"use client";

import {
  type OrderItemWithReviewStatus,
  type OrderWithReviewStatus,
  createProductReview,
} from "@/actions";
import { OrderStatus } from "@/types";
import { MapPin, Package, Phone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { OrderProgress } from "@/components/orders";
import {
  ReviewForm,
  StatusIcon,
  WhatsAppContactButton,
} from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { openWhatsAppFollowUp } from "@/lib/contact-business";
import { cn } from "@/lib/utils";

// Type for shipping address JSON field
interface ShippingAddress {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  contactNumber?: string;
}

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
    <div className="shadow-soft rounded-2xl border border-neutral-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex gap-4">
        <Link href={`/products/${productSlug}`}>
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <Image
              src={productImage}
              alt={productName}
              width={80}
              height={80}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        </Link>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <Link href={`/products/${productSlug}`}>
              <h3 className="hover:text-primary line-clamp-1 text-sm font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
                {productName}
              </h3>
            </Link>
            {product?.color_name && (
              <p className="text-xs text-neutral-500">{product.color_name}</p>
            )}
            <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-primary text-sm font-bold">
              ₹
              {Math.max(
                0,
                item.price * item.quantity - item.discount,
              ).toLocaleString()}
            </p>
            {item.discount > 0 && (
              <span className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-600">
                -₹{item.discount.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {canReview && (
        <div className="mt-4 border-t border-neutral-100 pt-4 dark:border-neutral-800">
          <ReviewForm
            title={`Review ${productName}`}
            hasReviewed={item.hasReviewed}
            variant="full-width"
            onSubmit={handleReviewSubmit}
          />
        </div>
      )}
    </div>
  );
}

interface OrderDetailClientProps {
  order: OrderWithReviewStatus | null;
}

export function OrderDetailClient({ order }: OrderDetailClientProps) {
  const canReview = order?.status === OrderStatus.DELIVERED;
  const items = order?.ordered_products;
  const showWhatsAppButton = order?.status !== OrderStatus.DELIVERED;
  const shippingAddress = order?.shipping_address as ShippingAddress | null;
  const totalDiscount =
    items?.reduce((sum, item) => sum + item.discount, 0) ?? 0;

  const handleWhatsAppContact = useCallback(() => {
    if (!order) return;
    openWhatsAppFollowUp({
      type: "order-followup",
      orderId: order.id.toUpperCase(),
      orderStatus: getStatusLabel(order.status as OrderStatus),
      orderTotal: order.total,
      customerName: order.user.name || order.user.email,
      customerEmail: order.user.email,
    });
  }, [order]);

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

  return (
    <div className="container mx-auto px-4 py-4 lg:px-8 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Sidebar - Order Details (Desktop) */}
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {/* Status Card */}
            <div className="shadow-soft rounded-2xl border border-neutral-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <p className="mb-4 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                Order Status
              </p>
              <div className="mb-6 flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    order.status === OrderStatus.DELIVERED &&
                      "bg-emerald-50 text-emerald-600",
                    order.status === OrderStatus.SHIPPED &&
                      "bg-blue-50 text-blue-600",
                    order.status === OrderStatus.PROCESSING &&
                      "bg-amber-50 text-amber-600",
                  )}
                >
                  <StatusIcon status={order.status} className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {getStatusLabel(order.status as OrderStatus)}
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] text-neutral-400">
                    #{order.id.toUpperCase()}
                  </p>
                </div>
              </div>

              <OrderProgress
                status={order.status || OrderStatus.PROCESSING}
                createdAt={order.created_at}
                shippedAt={order.shipped_at}
                deliveredAt={order.delivered_at}
                requestAt={order.request_at}
                approvedAt={order.approved_at}
                paidAt={order.paid_at}
                cancelledAt={order.cancelled_at}
              />
            </div>

            {/* Payment Summary Card */}
            <div className="shadow-soft rounded-2xl border border-neutral-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <p className="mb-4 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                Payment Summary
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    ₹{order.subtotal.toLocaleString()}
                  </span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Discount</span>
                    <span className="font-medium text-emerald-600">
                      -₹{totalDiscount.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Shipping</span>
                  <span
                    className={cn(
                      "font-medium",
                      order.shipping_fee === 0
                        ? "text-emerald-600"
                        : "text-neutral-900 dark:text-neutral-100",
                    )}
                  >
                    {order.shipping_fee === 0
                      ? "Free"
                      : `₹${order.shipping_fee.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex items-baseline justify-between border-t border-neutral-100 pt-3 dark:border-neutral-800">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                    Total
                  </span>
                  <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    ₹{order.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Address Card */}
            {shippingAddress && (
              <div className="shadow-soft rounded-2xl border border-neutral-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <p className="mb-4 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                  Shipping Address
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="text-primary h-4 w-4 shrink-0" />
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {shippingAddress.name}
                    </span>
                  </div>
                  {shippingAddress.contactNumber && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0 text-neutral-400" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {shippingAddress.contactNumber}
                      </span>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {shippingAddress.addressLine1}
                      {shippingAddress.addressLine2 &&
                        `, ${shippingAddress.addressLine2}`}
                      {`, ${shippingAddress.city}`}
                      {`, ${shippingAddress.state}`}
                      {` - ${shippingAddress.zip}`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {canReview && (
              <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/20">
                <p className="text-center text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  Your order has been delivered! Leave reviews for your items.
                </p>
              </div>
            )}

            {showWhatsAppButton && (
              <WhatsAppContactButton onClick={handleWhatsAppContact} />
            )}
          </div>
        </div>

        {/* Right Content - Items (Desktop) / Full Content (Mobile) */}
        <div className="lg:col-span-2">
          {/* Mobile Header */}
          <div className="mb-8 lg:hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-1 text-xs font-bold tracking-widest text-neutral-400 uppercase">
                  Order
                </p>
                <h1 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  #{order.id.toUpperCase()}
                </h1>
                <p className="mt-1 text-xs text-neutral-500">
                  Placed on {formatOrderDate(order.created_at)}
                </p>
              </div>
              <Badge
                className={cn(
                  "border-none px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase",
                  order.status === OrderStatus.DELIVERED &&
                    "bg-emerald-50 text-emerald-600",
                  order.status === OrderStatus.SHIPPED &&
                    "bg-blue-50 text-blue-600",
                  order.status === OrderStatus.PROCESSING &&
                    "bg-amber-50 text-amber-600",
                )}
              >
                {getStatusLabel(order.status as OrderStatus)}
              </Badge>
            </div>

            {/* Mobile Progress */}
            <div className="mt-6">
              <OrderProgress
                status={order.status || OrderStatus.PROCESSING}
                createdAt={order.created_at}
                shippedAt={order.shipped_at}
                deliveredAt={order.delivered_at}
              />
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h3 className="mb-4 text-sm font-semibold text-neutral-900 lg:text-lg dark:text-neutral-100">
              Items ({items?.length || 0})
            </h3>
            <div className="space-y-4">
              {items?.map((item) => (
                <OrderItemCard
                  key={item.id}
                  item={item}
                  canReview={canReview}
                />
              ))}
            </div>
          </div>

          {/* Mobile Payment Summary */}
          <div className="shadow-soft rounded-2xl border border-neutral-100 bg-white p-4 lg:hidden dark:border-neutral-800 dark:bg-neutral-900">
            <p className="mb-4 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
              Payment Summary
            </p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Subtotal</span>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  ₹{order.subtotal.toLocaleString()}
                </span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Discount</span>
                  <span className="font-medium text-emerald-600">
                    -₹{totalDiscount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Shipping</span>
                <span
                  className={cn(
                    "font-medium",
                    order.shipping_fee === 0
                      ? "text-emerald-600"
                      : "text-neutral-900 dark:text-neutral-100",
                  )}
                >
                  {order.shipping_fee === 0
                    ? "Free"
                    : `₹${order.shipping_fee.toLocaleString()}`}
                </span>
              </div>
              <div className="flex items-baseline justify-between border-t border-neutral-100 pt-3 dark:border-neutral-800">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Total Paid
                </span>
                <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  ₹{order.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Shipping Address */}
          {shippingAddress && (
            <div className="shadow-soft mt-4 rounded-2xl border border-neutral-100 bg-white p-4 lg:hidden dark:border-neutral-800 dark:bg-neutral-900">
              <p className="mb-3 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                Shipping Address
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="text-primary h-4 w-4 shrink-0" />
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {shippingAddress.name}
                  </span>
                </div>
                {shippingAddress.contactNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-neutral-400" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {shippingAddress.contactNumber}
                    </span>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {shippingAddress.addressLine1}
                    {shippingAddress.addressLine2 &&
                      `, ${shippingAddress.addressLine2}`}
                    {`, ${shippingAddress.city}`}
                    {`, ${shippingAddress.state}`}
                    {` - ${shippingAddress.zip}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {canReview && (
            <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-center lg:hidden dark:bg-emerald-950/20">
              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                Your order has been delivered! Leave reviews for your items.
              </p>
            </div>
          )}

          {showWhatsAppButton && (
            <div className="mt-6 lg:hidden">
              <WhatsAppContactButton onClick={handleWhatsAppContact} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
