import type { Metadata } from "next";
import { Suspense } from "react";

import { OrdersSkeleton } from "@/components/skeletons";

import { OrdersContent, type OrdersPageSearchParams } from "./orders-content";

export const metadata: Metadata = {
  title: "My Orders | Poetry & Pottery",
  description:
    "View your order history and track shipments for your handcrafted pottery purchases.",
  robots: {
    index: false,
    follow: false,
  },
};

interface OrdersPageProps {
  searchParams: Promise<OrdersPageSearchParams>;
}

/**
 * Route: /orders
 * Page does: Authenticated order history page with filter and detail drill-down flows.
 * Key UI operations:
 * - Filter by order status, search orders, and open any order's detail view.
 * - Review order summary cards and current fulfillment state from one list.
 * UI info needed for operations:
 * - Authenticated user context plus order list pagination/summary data.
 * - `search`/`status` query params controlling list filtering and server fetch criteria.
 */
export default function OrdersPage({ searchParams }: OrdersPageProps) {
  return (
    <Suspense fallback={<OrdersSkeleton />}>
      <OrdersContent searchParams={searchParams} />
    </Suspense>
  );
}
