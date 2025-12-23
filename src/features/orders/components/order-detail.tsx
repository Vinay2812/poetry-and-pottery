"use client";

import { OrderStatus } from "@/types";
import { MapPin, Package, Phone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { OrderProgress } from "@/components/orders";
import {
  ReviewForm,
  StatusIcon,
  WhatsAppContactButton,
} from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import type {
  OrderDetailProps,
  OrderDetailViewModel,
  OrderItemViewModel,
  PaymentSummaryViewModel,
  ShippingAddress,
} from "../types";
import { formatOrderDate } from "../types";

interface OrderItemCardProps {
  item: OrderItemViewModel;
  canReview: boolean;
  onReviewSubmit: (
    rating: number,
    review?: string,
    imageUrls?: string[],
  ) => Promise<{ success: boolean; error?: string }>;
}

function OrderItemCard({
  item,
  canReview,
  onReviewSubmit,
}: OrderItemCardProps) {
  return (
    <div className="shadow-soft rounded-2xl border border-neutral-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex gap-4">
        <Link href={`/products/${item.productSlug}`}>
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <Image
              src={item.productImage}
              alt={item.productName}
              width={80}
              height={80}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        </Link>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <Link href={`/products/${item.productSlug}`}>
              <h3 className="hover:text-primary line-clamp-1 text-sm font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
                {item.productName}
              </h3>
            </Link>
            {item.colorName && (
              <p className="text-xs text-neutral-500">{item.colorName}</p>
            )}
            <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-primary text-sm font-bold">
              ₹{item.finalPrice.toLocaleString()}
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
            title={`Review ${item.productName}`}
            hasReviewed={item.hasReviewed}
            variant="full-width"
            onSubmit={onReviewSubmit}
          />
        </div>
      )}
    </div>
  );
}

interface PaymentSummaryCardProps {
  summary: PaymentSummaryViewModel;
  className?: string;
}

function PaymentSummaryCard({ summary, className }: PaymentSummaryCardProps) {
  return (
    <div
      className={cn(
        "shadow-soft rounded-2xl border border-neutral-100 bg-white p-4 lg:p-6 dark:border-neutral-800 dark:bg-neutral-900",
        className,
      )}
    >
      <p className="mb-4 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
        Payment Summary
      </p>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Subtotal</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            ₹{summary.subtotal.toLocaleString()}
          </span>
        </div>
        {summary.totalDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Discount</span>
            <span className="font-medium text-emerald-600">
              -₹{summary.totalDiscount.toLocaleString()}
            </span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Shipping</span>
          <span
            className={cn(
              "font-medium",
              summary.isFreeShipping
                ? "text-emerald-600"
                : "text-neutral-900 dark:text-neutral-100",
            )}
          >
            {summary.isFreeShipping
              ? "Free"
              : `₹${summary.shippingFee.toLocaleString()}`}
          </span>
        </div>
        <div className="flex items-baseline justify-between border-t border-neutral-100 pt-3 dark:border-neutral-800">
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            Total
          </span>
          <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            ₹{summary.total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

interface ShippingAddressCardProps {
  address: ShippingAddress;
  className?: string;
}

function ShippingAddressCard({ address, className }: ShippingAddressCardProps) {
  return (
    <div
      className={cn(
        "shadow-soft rounded-2xl border border-neutral-100 bg-white p-4 lg:p-6 dark:border-neutral-800 dark:bg-neutral-900",
        className,
      )}
    >
      <p className="mb-3 text-[10px] font-bold tracking-widest text-neutral-400 uppercase lg:mb-4">
        Shipping Address
      </p>
      <div className="space-y-2 lg:space-y-3">
        <div className="flex items-center gap-2">
          <User className="text-primary h-4 w-4 shrink-0" />
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            {address.name}
          </span>
        </div>
        {address.contactNumber && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0 text-neutral-400" />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              {address.contactNumber}
            </span>
          </div>
        )}
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {address.addressLine1}
            {address.addressLine2 && `, ${address.addressLine2}`}
            {`, ${address.city}`}
            {`, ${address.state}`}
            {` - ${address.zip}`}
          </p>
        </div>
      </div>
    </div>
  );
}

interface StatusCardProps {
  viewModel: OrderDetailViewModel;
}

function StatusCard({ viewModel }: StatusCardProps) {
  return (
    <div className="shadow-soft rounded-2xl border border-neutral-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <p className="mb-4 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
        Order Status
      </p>
      <div className="mb-6 flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            viewModel.status === OrderStatus.DELIVERED &&
              "bg-emerald-50 text-emerald-600",
            viewModel.status === OrderStatus.SHIPPED &&
              "bg-blue-50 text-blue-600",
            viewModel.status === OrderStatus.PROCESSING &&
              "bg-amber-50 text-amber-600",
          )}
        >
          <StatusIcon status={viewModel.status} className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {viewModel.statusLabel}
          </p>
          <p className="mt-0.5 font-mono text-[9px] text-neutral-400">
            #{viewModel.orderId.toUpperCase()}
          </p>
        </div>
      </div>

      <OrderProgress
        status={viewModel.status || OrderStatus.PROCESSING}
        createdAt={viewModel.createdAt}
        shippedAt={viewModel.shippedAt}
        deliveredAt={viewModel.deliveredAt}
        requestAt={viewModel.requestAt}
        approvedAt={viewModel.approvedAt}
        paidAt={viewModel.paidAt}
        cancelledAt={viewModel.cancelledAt}
      />
    </div>
  );
}

interface DesktopSidebarProps {
  viewModel: OrderDetailViewModel;
  onWhatsAppContact: () => void;
}

function DesktopSidebar({ viewModel, onWhatsAppContact }: DesktopSidebarProps) {
  return (
    <div className="hidden lg:block">
      <div className="sticky top-24 space-y-6">
        <StatusCard viewModel={viewModel} />
        <PaymentSummaryCard summary={viewModel.paymentSummary} />
        {viewModel.shippingAddress && (
          <ShippingAddressCard address={viewModel.shippingAddress} />
        )}

        {viewModel.canReview && (
          <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/20">
            <p className="text-center text-xs font-medium text-emerald-700 dark:text-emerald-400">
              Your order has been delivered! Leave reviews for your items.
            </p>
          </div>
        )}

        {viewModel.showWhatsAppButton && (
          <WhatsAppContactButton onClick={onWhatsAppContact} />
        )}
      </div>
    </div>
  );
}

function OrderNotFound() {
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

export function OrderDetail({
  viewModel,
  onReviewSubmit,
  onWhatsAppContact,
}: OrderDetailProps) {
  if (!viewModel) {
    return <OrderNotFound />;
  }

  return (
    <div className="container mx-auto px-4 py-4 lg:px-8 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Sidebar - Order Details (Desktop) */}
        <DesktopSidebar
          viewModel={viewModel}
          onWhatsAppContact={onWhatsAppContact}
        />

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
                  #{viewModel.orderId.toUpperCase()}
                </h1>
                <p className="mt-1 text-xs text-neutral-500">
                  Placed on {formatOrderDate(viewModel.createdAt)}
                </p>
              </div>
              <Badge
                className={cn(
                  "border-none px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase",
                  viewModel.status === OrderStatus.DELIVERED &&
                    "bg-emerald-50 text-emerald-600",
                  viewModel.status === OrderStatus.SHIPPED &&
                    "bg-blue-50 text-blue-600",
                  viewModel.status === OrderStatus.PROCESSING &&
                    "bg-amber-50 text-amber-600",
                )}
              >
                {viewModel.statusLabel}
              </Badge>
            </div>

            {/* Mobile Progress */}
            <div className="mt-6">
              <OrderProgress
                status={viewModel.status || OrderStatus.PROCESSING}
                createdAt={viewModel.createdAt}
                shippedAt={viewModel.shippedAt}
                deliveredAt={viewModel.deliveredAt}
              />
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h3 className="mb-4 text-sm font-semibold text-neutral-900 lg:text-lg dark:text-neutral-100">
              Items ({viewModel.items.length})
            </h3>
            <div className="space-y-4">
              {viewModel.items.map((item) => (
                <OrderItemCard
                  key={item.id}
                  item={item}
                  canReview={viewModel.canReview}
                  onReviewSubmit={(rating, review, imageUrls) =>
                    onReviewSubmit(item.productId, rating, review, imageUrls)
                  }
                />
              ))}
            </div>
          </div>

          {/* Mobile Payment Summary */}
          <PaymentSummaryCard
            summary={viewModel.paymentSummary}
            className="lg:hidden"
          />

          {/* Mobile Shipping Address */}
          {viewModel.shippingAddress && (
            <ShippingAddressCard
              address={viewModel.shippingAddress}
              className="mt-4 lg:hidden"
            />
          )}

          {viewModel.canReview && (
            <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-center lg:hidden dark:bg-emerald-950/20">
              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                Your order has been delivered! Leave reviews for your items.
              </p>
            </div>
          )}

          {viewModel.showWhatsAppButton && (
            <div className="mt-6 lg:hidden">
              <WhatsAppContactButton onClick={onWhatsAppContact} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
