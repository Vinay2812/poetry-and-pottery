"use client";

import { useDailyWorkshopPublicConfigQuery } from "@/data/daily-workshops/gateway/client";

import { WorkshopsSectionSkeleton } from "@/components/skeletons";

import { WorkshopsSection } from "./workshops-section";

export function WorkshopsSectionContainer() {
  const { data, loading, error } = useDailyWorkshopPublicConfigQuery();

  if (loading) {
    return <WorkshopsSectionSkeleton />;
  }

  if (error || !data?.dailyWorkshopPublicConfig) {
    return null;
  }

  return (
    <WorkshopsSection
      pricingTiers={data.dailyWorkshopPublicConfig.pricing_tiers}
    />
  );
}
