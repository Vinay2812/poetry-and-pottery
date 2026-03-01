import { Suspense } from "react";

import { DailyWorkshopsDashboardContent } from "./daily-workshops-dashboard-content";
import { DailyWorkshopsDashboardFallback } from "./daily-workshops-dashboard-fallback";

/**
 * Route: /dashboard/daily-workshops
 * Page does: Admin operations page for daily workshop configuration and registration oversight.
 * Key UI operations:
 * - Manage workshop config, pricing tiers, blackout rules, and registration details.
 * - Use dashboard sections/dialogs to update operational availability and booking constraints.
 * UI info needed for operations:
 * - Admin authorization plus workshop config payload (tiers, blackout windows, status).
 * - Registration board data required for detail dialogs and operational follow-up actions.
 */
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
