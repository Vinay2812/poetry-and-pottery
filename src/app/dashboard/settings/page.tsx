import {
  getContactInfo,
  getHeroImages,
  getSocialLinks,
} from "@/data/admin/settings/gateway/server";
import { SettingsFormContainer } from "@/features/dashboard/settings";
import { Suspense } from "react";

import { SettingsFormSkeleton } from "@/components/skeletons";

export default async function SettingsPage() {
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

async function SettingsFormContent() {
  const [heroImages, contactInfo, socialLinks] = await Promise.all([
    getHeroImages(),
    getContactInfo(),
    getSocialLinks(),
  ]);

  return (
    <SettingsFormContainer
      heroImages={heroImages}
      contactInfo={contactInfo}
      socialLinks={socialLinks}
    />
  );
}
