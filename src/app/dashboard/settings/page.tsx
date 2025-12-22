import { getContactInfo, getHeroImages, getSocialLinks } from "@/actions/admin";
import { SettingsFormContainer } from "@/features/dashboard/settings";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

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

function SettingsFormSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-full" />
      <div className="rounded-lg border p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
