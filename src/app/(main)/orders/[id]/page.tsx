import type { Metadata } from "next";
import { Suspense } from "react";

import { OrderDetailSkeleton } from "@/components/skeletons";

import {
  OrderDetailContent,
  type OrderDetailPageParams,
} from "./order-detail-content";

interface OrderDetailPageProps {
  params: Promise<OrderDetailPageParams>;
}

export async function generateMetadata({
  params,
}: OrderDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Order ${id} | Poetry & Pottery`,
    description:
      "View your order details, track shipment status, and leave reviews.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

/**
 * Route: /orders/[id]
 * Page does: Order detail page for shipment state, item breakdown, and post-purchase actions.
 * Key UI operations:
 * - Inspect order timeline/items and navigate follow-up actions such as writing reviews.
 * - Return to order history while keeping route-specific order context.
 * UI info needed for operations:
 * - Route param `id` used to fetch a single order record for the signed-in user.
 * - Order payload (items, shipping address, payment totals, shipment status, review eligibility).
 */
export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  return (
    <Suspense fallback={<OrderDetailSkeleton />}>
      <OrderDetailContent params={params} />
    </Suspense>
  );
}
