import { Suspense } from "react";

import { SettingsFormSkeleton } from "@/components/skeletons";

import { SettingsFormContent } from "./settings-form-content";

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
