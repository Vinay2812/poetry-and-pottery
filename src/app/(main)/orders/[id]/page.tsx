import { getOrderById } from "@/actions";
import type { Metadata } from "next";

import { MobileHeader } from "@/components/layout";
import { OrderDetailClient } from "@/components/orders";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
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

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;

  const result = await getOrderById(id);
  const order = result.success ? result.data : null;

  return (
    <>
      <MobileHeader title="Order Details" showBack backHref="/orders" />

      <main className="pt-14 pb-24 lg:pt-0 lg:pb-12">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          <h1 className="mb-6 hidden text-2xl font-bold lg:block">
            Order Details
          </h1>

          <OrderDetailClient order={order} />
        </div>
      </main>
    </>
  );
}
