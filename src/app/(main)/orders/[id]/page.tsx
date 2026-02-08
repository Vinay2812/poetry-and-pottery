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

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  return (
    <Suspense fallback={<OrderDetailSkeleton />}>
      <OrderDetailContent params={params} />
    </Suspense>
  );
}
