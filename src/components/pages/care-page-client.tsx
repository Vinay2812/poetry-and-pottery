"use client";

import { MobileHeaderContainer } from "@/features/layout";
import {
  Droplets,
  Flame,
  Hand,
  type LucideIcon,
  Sparkles,
  ThermometerSun,
  Zap,
} from "lucide-react";

import { ListingPageHeader } from "@/components/shared";

import type { CarePageContent } from "@/graphql/generated/types";

import { CareCard } from "./care-card";
import { ContactCtaBanner } from "./contact-cta-banner";
import { ProTipsCallout } from "./pro-tips-callout";

interface CarePageClientProps {
  content: CarePageContent;
}

// Icon mapping for dynamic icon rendering
const ICON_MAP: Record<string, LucideIcon> = {
  droplets: Droplets,
  thermometer: ThermometerSun,
  zap: Zap,
  hand: Hand,
  flame: Flame,
  sparkles: Sparkles,
};

function getIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName.toLowerCase()] || Sparkles;
}

// Default care tips
const CARE_CARDS = [
  {
    icon: Droplets,
    title: "Cleaning",
    description:
      "Hand wash with warm water and mild dish soap. Avoid abrasive scrubbers that can damage the glaze.",
  },
  {
    icon: ThermometerSun,
    title: "Temperature",
    description:
      "Avoid sudden temperature changes. Let pieces come to room temperature before exposing to heat or cold.",
  },
  {
    icon: Zap,
    title: "Microwave & Dishwasher",
    description:
      "Most glazed pieces are microwave safe. Check product details for dishwasher compatibility.",
  },
  {
    icon: Hand,
    title: "Storage",
    description:
      "Store with soft padding between pieces. Avoid stacking heavy items on delicate pottery.",
  },
];

const PRO_TIPS = [
  "Let hot pottery cool down naturally before washing",
  "Use rubber mats in sinks to prevent chips",
  "Rotate displayed pieces to prevent uneven fading",
  "For stubborn stains, soak in warm water with baking soda",
];

export function CarePageClient({ content }: CarePageClientProps) {
  return (
    <>
      <MobileHeaderContainer title="Care Guide" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Desktop Page Header */}
          <div className="hidden lg:block">
            <ListingPageHeader
              title="Care Instructions"
              breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Help", href: "/faq" },
                { label: "Care Instructions" },
              ]}
            />
          </div>

          {/* Mobile Page Header */}
          <div className="mb-6 pt-4 lg:hidden">
            <h1 className="font-display text-2xl font-bold text-neutral-900">
              Care Instructions
            </h1>
            <div className="bg-primary mt-3 h-[3px] w-12 rounded-full" />
          </div>

          {/* Care Cards Grid */}
          <div className="mx-auto max-w-[900px]">
            <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CARE_CARDS.map((card) => (
                <CareCard
                  key={card.title}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>

            {/* Pro Tips Callout */}
            <ProTipsCallout tips={PRO_TIPS} />

            {/* Additional Sections from Content */}
            {content.glazeTypes && content.glazeTypes.length > 0 && (
              <div className="mx-auto mt-10 max-w-3xl">
                <h2 className="font-display mb-4 text-xl font-semibold text-neutral-900">
                  Glaze-Specific Care
                </h2>
                <div className="space-y-4">
                  {content.glazeTypes.map((glaze) => {
                    const Icon = getIcon(glaze.icon);
                    return (
                      <div
                        key={glaze.name}
                        className="shadow-soft rounded-xl bg-white p-5"
                      >
                        <div className="flex gap-4">
                          <div className="bg-primary-lighter text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-display mb-1 font-semibold text-neutral-900">
                              {glaze.name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {glaze.description}
                            </p>
                            <p className="text-primary mt-2 text-sm font-medium">
                              Care tip: {glaze.care}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Contact CTA */}
            <div className="mx-auto mt-12 max-w-3xl">
              <ContactCtaBanner
                title="Questions about pottery care?"
                description="Our team is happy to help with specific care questions."
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
