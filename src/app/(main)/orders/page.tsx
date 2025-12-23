import { getOrders } from "@/actions";
import { MobileHeaderContainer } from "@/features/layout";
import { OrdersListContainer } from "@/features/orders";
import type { Metadata } from "next";

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
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const params = await searchParams;
  const search = params.search || undefined;

  const result = await getOrders(1, 10, search);

  const orders = result.success ? result.data.data : [];
  const pagination = result.success
    ? { total: result.data.total, totalPages: result.data.totalPages }
    : { total: 0, totalPages: 0 };

  return (
    <>
      <MobileHeaderContainer title="My Orders" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          <h1 className="mb-6 hidden text-2xl font-bold lg:block">My Orders</h1>

          <OrdersListContainer
            initialOrders={orders}
            initialPagination={pagination}
          />
        </div>
      </main>
    </>
  );
}
