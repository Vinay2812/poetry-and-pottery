"use client";

import { MobileHeaderContainer } from "@/features/layout";
import {
  Droplets,
  Flame,
  Hand,
  Lightbulb,
  type LucideIcon,
  Sparkles,
  ThermometerSun,
  Zap,
} from "lucide-react";

import { ListingPageHeader } from "@/components/shared";

import type { CarePageContent } from "@/graphql/generated/types";

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
              {CARE_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="shadow-soft rounded-xl bg-white p-5 text-center"
                  >
                    <div className="bg-primary-lighter text-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display mb-2 font-semibold text-neutral-900">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Pro Tips Callout */}
            <div className="mx-auto max-w-3xl">
              <div className="bg-cream rounded-2xl p-6 lg:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-neutral-900">
                    Pro Tips
                  </h3>
                </div>
                <ul className="space-y-3">
                  {PRO_TIPS.map((tip, index) => (
                    <li
                      key={index}
                      className="text-muted-foreground flex items-start gap-3 text-sm"
                    >
                      <span className="bg-primary mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

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
              <div className="bg-primary-lighter rounded-2xl p-6 text-center lg:p-8">
                <h3 className="font-display mb-2 text-lg font-semibold text-neutral-900">
                  Questions about pottery care?
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Our team is happy to help with specific care questions.
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
        </div>
      </main>
    </>
  );
}
