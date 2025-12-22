"use client";

import { createProductReview } from "@/actions";
import { OrderStatus } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { openWhatsAppFollowUp } from "@/lib/contact-business";

import { OrderDetail } from "../components/order-detail";
import type {
  OrderDetailContainerProps,
  OrderDetailViewModel,
  ShippingAddress,
} from "../types";
import { buildOrderItemViewModel, getStatusLabel } from "../types";

export function OrderDetailContainer({ order }: OrderDetailContainerProps) {
  const router = useRouter();

  // Build view model
  const viewModel: OrderDetailViewModel | null = useMemo(() => {
    if (!order) return null;

    const items = order.ordered_products || [];
    const shippingAddress = order.shipping_address as ShippingAddress | null;
    const totalDiscount = items.reduce((sum, item) => sum + item.discount, 0);
    const canReview = order.status === OrderStatus.DELIVERED;
    const showWhatsAppButton = order.status !== OrderStatus.DELIVERED;

    return {
      orderId: order.id,
      status: order.status as OrderStatus,
      statusLabel: getStatusLabel(order.status as OrderStatus),
      createdAt: order.created_at,
      shippedAt: order.shipped_at,
      deliveredAt: order.delivered_at,
      requestAt: order.request_at,
      approvedAt: order.approved_at,
      paidAt: order.paid_at,
      cancelledAt: order.cancelled_at,
      items: items.map(buildOrderItemViewModel),
      shippingAddress,
      paymentSummary: {
        subtotal: order.subtotal,
        totalDiscount,
        shippingFee: order.shipping_fee,
        total: order.total,
        isFreeShipping: order.shipping_fee === 0,
      },
      canReview,
      showWhatsAppButton,
      userName: order.user.name || order.user.email,
      userEmail: order.user.email,
    };
  }, [order]);

  const handleReviewSubmit = useCallback(
    async (productId: number, rating: number, review?: string) => {
      const result = await createProductReview({
        productId,
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
    [router],
  );

  const handleWhatsAppContact = useCallback(() => {
    if (!order || !viewModel) return;
    openWhatsAppFollowUp({
      type: "order-followup",
      orderId: order.id.toUpperCase(),
      orderStatus: viewModel.statusLabel,
      orderTotal: order.total,
      customerName: viewModel.userName,
      customerEmail: viewModel.userEmail,
    });
  }, [order, viewModel]);

  return (
    <OrderDetail
      viewModel={viewModel}
      onReviewSubmit={handleReviewSubmit}
      onWhatsAppContact={handleWhatsAppContact}
    />
  );
}
