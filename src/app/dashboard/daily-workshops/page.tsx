import { Suspense } from "react";

import { DailyWorkshopsDashboardContent } from "./daily-workshops-dashboard-content";
import { DailyWorkshopsDashboardFallback } from "./daily-workshops-dashboard-fallback";

export default function DailyWorkshopsDashboardPage() {
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
