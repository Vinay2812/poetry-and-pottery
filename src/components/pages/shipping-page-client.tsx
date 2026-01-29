"use client";

import { MobileHeaderContainer } from "@/features/layout";
import { Package, Search, Truck } from "lucide-react";

import { ListingPageHeader } from "@/components/shared";

import type { ShippingPageContent } from "@/graphql/generated/types";

interface ShippingPageClientProps {
  content: ShippingPageContent;
}

// Default shipping rates if not provided by content
const SHIPPING_RATES = [
  {
    method: "Standard Shipping",
    delivery: "5-7 business days",
    price: "₹99",
  },
  {
    method: "Express Shipping",
    delivery: "2-3 business days",
    price: "₹199",
  },
  {
    method: "Free Shipping",
    delivery: "Orders above ₹1,500",
    price: "Free",
  },
];

export function ShippingPageClient({ content }: ShippingPageClientProps) {
  return (
    <>
      <MobileHeaderContainer title="Shipping" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Desktop Page Header */}
          <div className="hidden lg:block">
            <ListingPageHeader
              title="Shipping Information"
              breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Help", href: "/faq" },
                { label: "Shipping" },
              ]}
            />
          </div>

          {/* Mobile Page Header */}
          <div className="mb-6 pt-4 lg:hidden">
            <h1 className="font-display text-2xl font-bold text-neutral-900">
              Shipping Information
            </h1>
            <div className="bg-primary mt-3 h-[3px] w-12 rounded-full" />
          </div>

          {/* Content */}
          <div className="mx-auto max-w-3xl">
            {/* Shipping Rates */}
            <section className="mb-10">
              <h2 className="font-display mb-4 text-xl font-semibold text-neutral-900">
                Shipping Rates
              </h2>
              <div className="shadow-soft overflow-hidden rounded-2xl bg-white">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-100 bg-neutral-50">
                      <th className="px-5 py-3 text-left text-sm font-medium text-neutral-900">
                        Method
                      </th>
                      <th className="px-5 py-3 text-left text-sm font-medium text-neutral-900">
                        Delivery Time
                      </th>
                      <th className="px-5 py-3 text-right text-sm font-medium text-neutral-900">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {SHIPPING_RATES.map((rate) => (
                      <tr key={rate.method}>
                        <td className="px-5 py-4 text-sm font-medium text-neutral-900">
                          {rate.method}
                        </td>
                        <td className="text-muted-foreground px-5 py-4 text-sm">
                          {rate.delivery}
                        </td>
                        <td className="text-primary px-5 py-4 text-right text-sm font-medium">
                          {rate.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Packaging & Handling */}
            <section className="mb-10">
              <h2 className="font-display mb-4 text-xl font-semibold text-neutral-900">
                Packaging & Handling
              </h2>
              <div className="shadow-soft rounded-2xl bg-white p-5 lg:p-6">
                <div className="flex gap-4">
                  <div className="bg-primary-lighter text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-muted-foreground leading-relaxed">
                      We take extra care to ensure your pottery arrives safely.
                      Each piece is individually wrapped in protective materials
                      and placed in custom-fitted boxes designed to minimize
                      movement during transit.
                    </p>
                    <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="bg-primary h-1.5 w-1.5 rounded-full" />
                        Bubble wrap protection for fragile items
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="bg-primary h-1.5 w-1.5 rounded-full" />
                        Custom-fitted cardboard inserts
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="bg-primary h-1.5 w-1.5 rounded-full" />
                        Eco-friendly packaging materials
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Order Tracking */}
            <section className="mb-10">
              <h2 className="font-display mb-4 text-xl font-semibold text-neutral-900">
                Order Tracking
              </h2>
              <div className="shadow-soft rounded-2xl bg-white p-5 lg:p-6">
                <div className="flex gap-4">
                  <div className="bg-primary-lighter text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                    <Search className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-muted-foreground leading-relaxed">
                      Once your order ships, you&apos;ll receive an email with a
                      tracking number. You can track your package through our
                      website or directly on the carrier&apos;s website.
                    </p>
                    <p className="text-muted-foreground mt-3 text-sm">
                      Tracking updates are typically available within 24 hours
                      of shipping.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Delivery Areas */}
            <section className="mb-10">
              <h2 className="font-display mb-4 text-xl font-semibold text-neutral-900">
                Delivery Areas
              </h2>
              <div className="shadow-soft rounded-2xl bg-white p-5 lg:p-6">
                <div className="flex gap-4">
                  <div className="bg-primary-lighter text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-muted-foreground leading-relaxed">
                      We currently deliver across India. Remote areas may
                      require additional delivery time. For international
                      shipping inquiries, please contact us directly.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Questions CTA */}
            <div className="bg-primary-lighter rounded-2xl p-6 text-center lg:p-8">
              <h3 className="font-display mb-2 text-lg font-semibold text-neutral-900">
                Have questions about shipping?
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Our team is happy to help with any shipping-related questions.
              </p>
              <a
                href="/contact"
                className="bg-primary hover:bg-primary-hover inline-flex rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
