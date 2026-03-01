import { Suspense } from "react";

import { SettingsFormSkeleton } from "@/components/skeletons";

import { SettingsFormContent } from "./settings-form-content";

/**
 * Route: /dashboard/settings
 * Page does: Admin settings page for global storefront configuration values.
 * Key UI operations:
 * - Update hero imagery, contact information, and social links from one settings form.
 * - Save tabbed settings content and propagate changes to public-facing pages.
 * UI info needed for operations:
 * - Settings payload grouped by form tabs (hero images, contact, social links).
 * - Admin authorization and mutation response state for save/error UX.
 */
export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Site Settings</h1>
        <p className="text-muted-foreground">
          Configure hero images, contact information, and social links.
        </p>
      </div>

      <Suspense fallback={<SettingsFormSkeleton />}>
        <SettingsFormContent />
      </Suspense>
    </div>
  );
}
