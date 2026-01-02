"use client";

import { MobileHeaderContainer } from "@/features/layout";
import {
  Clock,
  type LucideIcon,
  Package,
  RefreshCw,
  Shield,
  Truck,
} from "lucide-react";

import { CTASection, SectionHeader } from "@/components/sections";

import type { ShippingPageContent } from "@/graphql/generated/types";

interface ShippingPageClientProps {
  content: ShippingPageContent;
}

// Icon mapping for dynamic icon rendering
const ICON_MAP: Record<string, LucideIcon> = {
  truck: Truck,
  package: Package,
  clock: Clock,
  "refresh-cw": RefreshCw,
  shield: Shield,
};

function getIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName.toLowerCase()] || Package;
}

export function ShippingPageClient({ content }: ShippingPageClientProps) {
  return (
    <>
      <MobileHeaderContainer title="Shipping & Returns" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-0">
        {/* Shipping Options */}
        <section className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
          <SectionHeader
            title="Shipping Options"
            description="Choose the delivery speed that works best for you."
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {content.shippingOptions.map((option) => {
              const Icon = getIcon(option.icon);
              return (
                <div key={option.title} className="text-center">
                  <div className="bg-subtle-green mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl">
                    <Icon className="text-primary h-8 w-8" />
                  </div>
                  <h3 className="mb-2 font-semibold">{option.title}</h3>
                  <p className="text-muted-foreground mb-1 text-sm">
                    {option.description}
                  </p>
                  <p className="text-primary text-sm font-medium">
                    {option.price}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Shipping Details */}
        <section className="bg-subtle-green py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Mobile Layout */}
            <div className="lg:hidden">
              <SectionHeader
                title="Shipping Details"
                description="Everything you need to know about how we ship your order."
              />
              <div className="space-y-4">
                {content.shippingInfo.map((info) => (
                  <div
                    key={info.title}
                    className="shadow-soft rounded-2xl bg-white p-6"
                  >
                    <h3 className="mb-2 font-semibold">{info.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {info.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden gap-8 lg:grid lg:grid-cols-2">
              {/* Info Card */}
              <div className="bg-primary flex flex-col justify-center rounded-3xl p-10 text-white">
                <p className="mb-4 text-sm font-medium tracking-wider text-white/70 uppercase">
                  Delivery Info
                </p>
                <h2 className="mb-6 text-4xl font-bold">Shipping Details</h2>
                <p className="mb-8 text-lg leading-relaxed text-white/90">
                  Everything you need to know about how we ship your order.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Carefully Packaged</p>
                      <p className="text-sm text-white/80">
                        Every piece wrapped with care
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <Truck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Tracked Delivery</p>
                      <p className="text-sm text-white/80">
                        Know where your order is
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                {content.shippingInfo.map((info) => (
                  <div
                    key={info.title}
                    className="shadow-soft rounded-2xl bg-white p-6"
                  >
                    <h3 className="mb-2 font-semibold">{info.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {info.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Returns Policy */}
        <section className="container mx-auto px-4 py-12 lg:px-8 lg:py-20">
          <SectionHeader
            title="Returns Policy"
            description="We want you to love your purchase. If not, we make returns easy."
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {content.returnsPolicy.map((policy) => {
              const Icon = getIcon(policy.icon);
              return (
                <div key={policy.title} className="text-center">
                  <div className="bg-subtle-green mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl">
                    <Icon className="text-primary h-8 w-8" />
                  </div>
                  <h3 className="mb-2 font-semibold">{policy.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {policy.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Return Process */}
        <section className="bg-subtle-green py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Mobile Layout */}
            <div className="lg:hidden">
              <SectionHeader
                title="How to Return"
                description="Follow these simple steps to initiate a return."
              />
              <div className="space-y-4">
                {content.returnSteps.map((item) => (
                  <div
                    key={item.step}
                    className="shadow-soft flex gap-4 rounded-2xl bg-white p-6"
                  >
                    <div className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                      <span className="text-sm font-bold text-white">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden gap-8 lg:grid lg:grid-cols-2">
              {/* Info Card */}
              <div className="bg-primary flex flex-col justify-center rounded-3xl p-10 text-white">
                <p className="mb-4 text-sm font-medium tracking-wider text-white/70 uppercase">
                  Easy Returns
                </p>
                <h2 className="mb-6 text-4xl font-bold">How to Return</h2>
                <p className="mb-8 text-lg leading-relaxed text-white/90">
                  Follow these simple steps to initiate a return. We make the
                  process as easy as possible.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <RefreshCw className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">30-Day Window</p>
                      <p className="text-sm text-white/80">
                        Plenty of time to decide
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Full Refund</p>
                      <p className="text-sm text-white/80">
                        No questions asked
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {content.returnSteps.map((item) => (
                  <div
                    key={item.step}
                    className="shadow-soft flex gap-4 rounded-2xl bg-white p-6"
                  >
                    <div className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                      <span className="text-sm font-bold text-white">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Questions About Your Order?"
          description="Our customer support team is here to help. Reach out and we'll get back to you within 24 hours."
          primaryButtonText="Contact Support"
          primaryButtonHref="/contact"
          secondaryButtonText="Browse FAQ"
          secondaryButtonHref="/faq"
          variant="solid"
        />
      </main>
    </>
  );
}
