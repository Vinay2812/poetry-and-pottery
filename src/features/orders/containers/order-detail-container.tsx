"use client";

import { useCreateProductReview } from "@/data/reviews/gateway/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { openWhatsAppFollowUp } from "@/lib/contact-business";

import { OrderDetail } from "../components/order-detail";
import type {
  OrderDetailContainerProps,
  OrderDetailViewModel,
  ShippingAddress,
} from "../types";
import { OrderStatus, buildOrderItemViewModel, getStatusLabel } from "../types";

export function OrderDetailContainer({ order }: OrderDetailContainerProps) {
  const router = useRouter();
  const { mutate: createProductReviewMutate } = useCreateProductReview();

  // Build view model
  const viewModel: OrderDetailViewModel | null = useMemo(() => {
    if (!order) return null;

    const items = order.ordered_products || [];
    const shippingAddress = order.shipping_address as ShippingAddress | null;
    const totalDiscount = items.reduce((sum, item) => sum + item.discount, 0);
    const canReview = order.status === OrderStatus.Delivered;
    const showWhatsAppButton = order.status !== OrderStatus.Delivered;

    return {
      orderId: order.id,
      status: order.status,
      statusLabel: getStatusLabel(order.status),
      createdAt: order.created_at,
      shippedAt: order.shipped_at ?? null,
      deliveredAt: order.delivered_at ?? null,
      requestAt: order.request_at ?? null,
      approvedAt: order.approved_at ?? null,
      paidAt: order.paid_at ?? null,
      cancelledAt: order.cancelled_at ?? null,
      items: items.map(buildOrderItemViewModel),
      shippingAddress: shippingAddress
        ? {
            name: shippingAddress.name || "",
            address_line_1: shippingAddress.address_line_1 || "",
            address_line_2: shippingAddress.address_line_2 || "",
            city: shippingAddress.city || "",
            state: shippingAddress.state || "",
            zip: shippingAddress.zip || "",
            contact_number: shippingAddress.contact_number || "",
          }
        : null,
      paymentSummary: {
        subtotal: order.subtotal,
        totalDiscount,
        shippingFee: order.shipping_fee,
        total: order.total,
        isFreeShipping: order.shipping_fee === 0,
      },
      canReview,
      showWhatsAppButton,
    };
  }, [order]);

  const handleReviewSubmit = useCallback(
    async (
      productId: number,
      rating: number,
      review?: string,
      imageUrls?: string[],
    ) => {
      const result = await createProductReviewMutate({
        productId,
        rating,
        review,
        imageUrls,
      });

      if (result.success) {
        router.refresh();
      }

      return {
        success: result.success,
        error: result.success ? undefined : result.error,
      };
    },
    [router, createProductReviewMutate],
  );

  const handleWhatsAppContact = useCallback(() => {
    if (!order || !viewModel) return;
    const shippingAddress = order.shipping_address as ShippingAddress | null;
    openWhatsAppFollowUp({
      type: "order-followup",
      orderId: order.id.toUpperCase(),
      orderStatus: viewModel.statusLabel,
      orderTotal: order.total,
      customerName: shippingAddress?.name || order.user.name || "Customer",
      customerEmail: order.user.email,
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
