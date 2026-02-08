"use client";

import { OrderProgress } from "@/components/orders";
import { WhatsAppContactButton } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

import { OrderStatus } from "../types";
import type { OrderDetailProps } from "../types";
import { formatOrderDate } from "../types";
import { OrderItemCard } from "./order-item-card";
import { OrderNotFound } from "./order-not-found";
import { PaymentSummaryCard } from "./payment-summary-card";
import { ShippingAddressCard } from "./shipping-address-card";

export function OrderDetail({
  viewModel,
  onReviewSubmit,
  onWhatsAppContact,
}: OrderDetailProps) {
  if (!viewModel) {
    return <OrderNotFound />;
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-4 md:px-8 md:py-12">
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="mb-1 text-xs font-bold tracking-widest text-neutral-400 uppercase">
              Order
            </p>
            <h1 className="text-sm font-bold text-neutral-900 md:text-base dark:text-neutral-100">
              #{viewModel.orderId.toUpperCase()}
            </h1>
            <p className="mt-1 text-xs text-neutral-500">
              Placed on {formatOrderDate(viewModel.createdAt)}
            </p>
          </div>
          <Badge
            className={cn(
              "border-none px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase",
              viewModel.status === OrderStatus.Delivered &&
                "bg-emerald-50 text-emerald-600",
              viewModel.status === OrderStatus.Shipped &&
                "bg-blue-50 text-blue-600",
              viewModel.status === OrderStatus.Processing &&
                "bg-amber-50 text-amber-600",
            )}
          >
            {viewModel.statusLabel}
          </Badge>
        </div>

        <div className="mt-6">
          <OrderProgress
            status={viewModel.status || OrderStatus.Processing}
            createdAt={viewModel.createdAt}
            shippedAt={viewModel.shippedAt}
            deliveredAt={viewModel.deliveredAt}
            requestAt={viewModel.requestAt}
            approvedAt={viewModel.approvedAt}
            paidAt={viewModel.paidAt}
            cancelledAt={viewModel.cancelledAt}
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-sm font-semibold text-neutral-900 md:text-lg dark:text-neutral-100">
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

      <PaymentSummaryCard summary={viewModel.paymentSummary} />

      {viewModel.shippingAddress && (
        <ShippingAddressCard
          address={viewModel.shippingAddress}
          className="mt-4"
        />
      )}

      {viewModel.canReview && (
        <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-center dark:bg-emerald-950/20">
          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
            Your order has been delivered! Leave reviews for your items.
          </p>
        </div>
      )}

      {viewModel.showWhatsAppButton && (
        <div className="mt-6">
          <WhatsAppContactButton onClick={onWhatsAppContact} />
        </div>
      )}
    </div>
  );
}
