"use client";

import { MobileHeaderContainer } from "@/features/layout";
import { Package, Search, Truck } from "lucide-react";

import { ListingPageHeader } from "@/components/shared";

import type { ShippingPageContent } from "@/graphql/generated/types";

import { ContactCtaBanner } from "./contact-cta-banner";
import { ShippingInfoSection } from "./shipping-info-section";
import { ShippingPaymentReturnsSection } from "./shipping-payment-returns-section";
import { ShippingRatesSection } from "./shipping-rates-section";

interface ShippingPageClientProps {
  content: ShippingPageContent;
}

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
            <ShippingRatesSection />

            {/* Packaging & Handling */}
            <ShippingInfoSection title="Packaging & Handling" icon={Package}>
              <p className="text-muted-foreground leading-relaxed">
                We take extra care to ensure your pottery arrives safely. Each
                piece is individually wrapped in protective materials and placed
                in custom-fitted boxes designed to minimize movement during
                transit.
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
            </ShippingInfoSection>

            {/* Order Tracking */}
            <ShippingInfoSection title="Order Tracking" icon={Search}>
              <p className="text-muted-foreground leading-relaxed">
                Once your order ships, you&apos;ll receive an email with a
                tracking number. You can track your package through our website
                or directly on the carrier&apos;s website.
              </p>
              <p className="text-muted-foreground mt-3 text-sm">
                Tracking updates are typically available within 24 hours of
                shipping.
              </p>
            </ShippingInfoSection>

            {/* Delivery Areas */}
            <ShippingInfoSection title="Delivery Areas" icon={Truck}>
              <p className="text-muted-foreground leading-relaxed">
                We deliver across India only. Remote areas may require
                additional delivery time. International shipping is not
                available.
              </p>
            </ShippingInfoSection>

            <ShippingPaymentReturnsSection />

            {/* Questions CTA */}
            <ContactCtaBanner
              title="Have questions about shipping?"
              description="Our team is happy to help with any shipping-related questions."
            />
          </div>
        </div>
      </main>
    </>
  );
}
