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

export default function OrdersPage({ searchParams }: OrdersPageProps) {
  return (
    <Suspense fallback={<OrdersSkeleton />}>
      <OrdersContent searchParams={searchParams} />
    </Suspense>
  );
}
