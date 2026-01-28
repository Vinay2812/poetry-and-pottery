import { getOrders } from "@/data/orders/gateway/server";
import { MobileHeaderContainer } from "@/features/layout";
import { OrdersListContainer } from "@/features/orders";
import type { Metadata } from "next";

import { ListingPageHeader } from "@/components/shared";

import { requireAuth } from "@/lib/auth";

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
    status?: string;
  }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  await requireAuth();
  const params = await searchParams;
  const search = params.search || undefined;

  const result = await getOrders(1, 10, search);

  const orders = result.success ? result.data.data : [];
  const pagination = result.success
    ? { total: result.data.total, totalPages: result.data.total_pages }
    : { total: 0, totalPages: 0 };

  return (
    <>
      <MobileHeaderContainer title="My Orders" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
        <div className="container mx-auto px-4 py-0 lg:px-8">
          {/* Desktop Page Header */}
          <ListingPageHeader
            title="My Orders"
            subtitle="Track your orders, view details, and manage your purchase history."
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "My Account", href: "/profile" },
              { label: "My Orders" },
            ]}
          />

          <OrdersListContainer
            initialOrders={orders}
            initialPagination={pagination}
          />
        </div>
      </main>
    </>
  );
}
