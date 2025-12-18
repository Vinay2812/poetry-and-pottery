import { getOrders } from "@/actions";
import type { Metadata } from "next";

import { MobileHeader } from "@/components/layout";
import { OrdersListClient } from "@/components/orders";

export const metadata: Metadata = {
  title: "My Orders | Poetry & Pottery",
  description:
    "View your order history and track shipments for your handcrafted pottery purchases.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function OrdersPage() {
  const result = await getOrders();

  const orders = result.success ? result.data.data : [];
  const pagination = result.success
    ? {
        page: result.data.page,
        totalPages: result.data.totalPages,
        total: result.data.total,
      }
    : { page: 1, totalPages: 1, total: 0 };

  return (
    <>
      <MobileHeader title="My Orders" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-0 lg:pb-12">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          <h1 className="mb-6 hidden text-2xl font-bold lg:block">My Orders</h1>

          <OrdersListClient orders={orders} />
        </div>
      </main>
    </>
  );
}
