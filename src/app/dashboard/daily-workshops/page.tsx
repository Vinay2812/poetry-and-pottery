import {
  getDailyWorkshopBlackoutRules,
  getDailyWorkshopConfigs,
  getDailyWorkshopPricingTiers,
} from "@/data/admin/daily-workshops/gateway/server";
import { DailyWorkshopsDashboardContainer } from "@/features/dashboard/daily-workshops";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

export default async function DailyWorkshopsDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Daily Workshops</h1>
        <p className="text-muted-foreground">
          Manage workshop configuration, pricing tiers, and blackout rules.
        </p>
      </div>

      <Suspense fallback={<DailyWorkshopsDashboardFallback />}>
        <DailyWorkshopsDashboardContent />
      </Suspense>
    </div>
  );
}

async function DailyWorkshopsDashboardContent() {
  const configs = await getDailyWorkshopConfigs();
  const initialConfig = configs[0] ?? null;

  const [pricingTiers, blackoutRules] = await Promise.all([
    getDailyWorkshopPricingTiers(initialConfig?.id),
    getDailyWorkshopBlackoutRules(initialConfig?.id),
  ]);

  return (
    <DailyWorkshopsDashboardContainer
      configs={configs}
      initialConfigId={initialConfig?.id ?? null}
      pricingTiers={pricingTiers}
      blackoutRules={blackoutRules}
    />
  );
}

function DailyWorkshopsDashboardFallback() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
      </div>
      <Skeleton className="h-[460px] rounded-2xl" />
    </div>
  );
}
