import { OrderService } from "@/services";
import type { OrderWithItems } from "@/types";
import { auth } from "@clerk/nextjs/server";
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
  const { userId } = await auth();

  // Fetch orders if user is authenticated
  let orders: OrderWithItems[] = [];
  if (userId) {
    try {
      orders = await OrderService.getOrdersByAuthId(userId);
    } catch {
      // User not found in DB or other error
      orders = [];
    }
  }

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
