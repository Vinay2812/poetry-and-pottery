"use client";

import type { CarePageContent } from "@/actions/admin";
import { MobileHeaderContainer } from "@/features/layout";
import {
  AlertTriangle,
  CheckCircle,
  Droplets,
  Flame,
  Hand,
  Heart,
  Leaf,
  type LucideIcon,
  Sparkles,
  Star,
  Thermometer,
  XCircle,
  Zap,
} from "lucide-react";

import { CTASection, SectionHeader } from "@/components/sections";

interface CarePageClientProps {
  content: CarePageContent;
}

// Icon mapping for dynamic icon rendering
const ICON_MAP: Record<string, LucideIcon> = {
  leaf: Leaf,
  sparkles: Sparkles,
  heart: Heart,
  thermometer: Thermometer,
  "alert-triangle": AlertTriangle,
  star: Star,
  flame: Flame,
  droplets: Droplets,
  hand: Hand,
  zap: Zap,
};

function getIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName.toLowerCase()] || Sparkles;
}

export function CarePageClient({ content }: CarePageClientProps) {
  return (
    <>
      <MobileHeaderContainer title="Care Instructions" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-0">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-6 lg:px-8 lg:py-12">
          {/* Mobile Layout */}
          <div className="mx-auto max-w-3xl text-center lg:hidden">
            <h1 className="mb-4 text-4xl font-bold">Care Instructions</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              With proper care, your handcrafted pottery will bring joy for
              years to come. Follow these guidelines to keep your pieces
              beautiful and functional.
            </p>
          </div>

          {/* Desktop Layout */}
          <div className="hidden gap-8 lg:grid lg:grid-cols-2">
            {/* Info Card */}
            <div className="bg-primary flex flex-col justify-center rounded-3xl p-10 text-white">
              <p className="mb-4 text-sm font-medium tracking-wider text-white/70 uppercase">
                Pottery Care Guide
              </p>
              <h1 className="mb-6 text-4xl font-bold">Care Instructions</h1>
              <p className="mb-6 text-lg leading-relaxed text-white/90">
                With proper care, your handcrafted pottery will bring joy for
                years to come.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Droplets className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Cleaning</p>
                    <p className="text-xs text-white/70">
                      Hand wash with mild soap
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Flame className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Temperature</p>
                    <p className="text-xs text-white/70">Avoid thermal shock</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Appliances</p>
                    <p className="text-xs text-white/70">
                      Check glaze type first
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Hand className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Handling</p>
                    <p className="text-xs text-white/70">Store with care</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Reference */}
            <div className="grid grid-cols-2 gap-4">
              <div className="shadow-soft rounded-2xl bg-white p-6">
                <h4 className="text-primary mb-4 flex items-center gap-2 font-semibold">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Safe For
                </h4>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  {content.safeFor.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="shadow-soft rounded-2xl bg-white p-6">
                <h4 className="text-primary mb-4 flex items-center gap-2 font-semibold">
                  <XCircle className="h-5 w-5 text-red-500" />
                  Avoid
                </h4>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  {content.avoid.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Glaze Types */}
        <section className="bg-subtle-green py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeader
              title="Glaze-Specific Care"
              description="Different finishes require different care approaches."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {content.glazeTypes.map((glaze) => {
                const Icon = getIcon(glaze.icon);
                return (
                  <div
                    key={glaze.name}
                    className="shadow-soft rounded-2xl bg-white p-6"
                  >
                    <div className="bg-subtle-green mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                      <Icon className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-semibold">{glaze.name}</h3>
                    <p className="text-muted-foreground mb-3 text-sm">
                      {glaze.description}
                    </p>
                    <div className="border-border border-t pt-3">
                      <p className="text-primary text-xs font-medium">
                        Care tip:
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {glaze.care}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Important Warnings */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Mobile Layout */}
            <div className="lg:hidden">
              <SectionHeader
                title="Important Reminders"
                description="Keep these key points in mind for the longevity of your pottery."
              />
              <div className="space-y-4">
                {content.warnings.map((warning) => {
                  const Icon = getIcon(warning.icon);
                  return (
                    <div
                      key={warning.title}
                      className="flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-6"
                    >
                      <Icon className="h-6 w-6 shrink-0 text-amber-600" />
                      <div>
                        <h3 className="mb-1 font-semibold">{warning.title}</h3>
                        <p className="text-muted-foreground text-sm">
                          {warning.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden gap-8 lg:grid lg:grid-cols-2">
              {/* Info Card */}
              <div className="bg-primary flex flex-col justify-center rounded-3xl p-10 text-white">
                <p className="mb-4 text-sm font-medium tracking-wider text-white/70 uppercase">
                  Please Note
                </p>
                <h2 className="mb-6 text-4xl font-bold">Important Reminders</h2>
                <p className="mb-8 text-lg leading-relaxed text-white/90">
                  Keep these key points in mind for the longevity of your
                  pottery.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Handle With Care</p>
                      <p className="text-sm text-white/80">
                        Protect your investment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <Heart className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Made to Last</p>
                      <p className="text-sm text-white/80">
                        With proper care, a lifetime of beauty
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warnings Content */}
              <div className="flex flex-col justify-center space-y-4">
                {content.warnings.map((warning) => {
                  const Icon = getIcon(warning.icon);
                  return (
                    <div
                      key={warning.title}
                      className="flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-6"
                    >
                      <Icon className="h-6 w-6 shrink-0 text-amber-600" />
                      <div>
                        <h3 className="mb-1 font-semibold">{warning.title}</h3>
                        <p className="text-muted-foreground text-sm">
                          {warning.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Questions About Care?"
          description="If you have specific questions about caring for your pottery, our team is happy to help."
          primaryButtonText="Contact Us"
          primaryButtonHref="/contact"
          secondaryButtonText="Browse FAQ"
          secondaryButtonHref="/faq"
          variant="solid"
        />
      </main>
    </>
  );
}
