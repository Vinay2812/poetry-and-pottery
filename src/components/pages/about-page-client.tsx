"use client";

import { MobileHeaderContainer } from "@/features/layout";

import { ListingPageHeader } from "@/components/shared";

import { AboutCtaSection } from "./about-cta-section";
import { AboutOpenMicSection } from "./about-open-mic-section";
import { AboutStatsSection } from "./about-stats-section";
import { AboutStorySection } from "./about-story-section";
import { AboutTeamSection } from "./about-team-section";
import { AboutValuesSection } from "./about-values-section";

export function AboutPageClient() {
  return (
    <>
      <MobileHeaderContainer title="About Us" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-0">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Desktop Page Header */}
          <div className="hidden lg:block">
            <ListingPageHeader
              title="Our Story"
              subtitle="Crafting beauty from clay since 2024. Discover the passion and craftsmanship behind every piece."
              breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "About Us" },
              ]}
            />
          </div>

          {/* Mobile Page Header */}
          <div className="pt-4 lg:hidden">
            <h1 className="font-display text-2xl font-bold text-neutral-900">
              Our Story
            </h1>
            <div className="bg-primary mt-3 h-[3px] w-12 rounded-full" />
            <p className="text-muted-foreground mt-3 text-sm">
              Crafting beauty from clay since 2024
            </p>
          </div>
        </div>

        <AboutStorySection />
        <AboutStatsSection />
        <AboutValuesSection />
        <AboutOpenMicSection />
        <AboutTeamSection />
        <AboutCtaSection />
      </main>
    </>
  );
}
