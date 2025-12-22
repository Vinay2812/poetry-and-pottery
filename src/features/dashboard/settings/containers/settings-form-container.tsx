"use client";

import {
  type ContactInfo,
  type HeroImages,
  type SocialLinks,
  updateContactInfo,
  updateHeroImages,
  updateSocialLinks,
} from "@/actions/admin";
import { useCallback, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { SettingsForm } from "../components/settings-form";
import {
  type SettingsFormContainerProps,
  type SettingsTab,
  buildSettingsViewModel,
} from "../types";

export function SettingsFormContainer({
  heroImages: initialHeroImages,
  contactInfo: initialContactInfo,
  socialLinks: initialSocialLinks,
}: SettingsFormContainerProps) {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<SettingsTab>("hero");

  // Build view model
  const viewModel = useMemo(
    () =>
      buildSettingsViewModel(
        initialHeroImages,
        initialContactInfo,
        initialSocialLinks,
      ),
    [initialHeroImages, initialContactInfo, initialSocialLinks],
  );

  const handleHeroImagesChange = useCallback((images: Partial<HeroImages>) => {
    startTransition(async () => {
      const result = await updateHeroImages(images);
      if (result.success) {
        toast.success("Hero images updated successfully");
      } else {
        toast.error(result.error || "Failed to update hero images");
      }
    });
  }, []);

  const handleContactInfoChange = useCallback((info: Partial<ContactInfo>) => {
    startTransition(async () => {
      const result = await updateContactInfo(info);
      if (result.success) {
        toast.success("Contact information updated successfully");
      } else {
        toast.error(result.error || "Failed to update contact information");
      }
    });
  }, []);

  const handleSocialLinksChange = useCallback((links: Partial<SocialLinks>) => {
    startTransition(async () => {
      const result = await updateSocialLinks(links);
      if (result.success) {
        toast.success("Social links updated successfully");
      } else {
        toast.error(result.error || "Failed to update social links");
      }
    });
  }, []);

  return (
    <SettingsForm
      viewModel={viewModel}
      isPending={isPending}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onHeroImagesChange={handleHeroImagesChange}
      onContactInfoChange={handleContactInfoChange}
      onSocialLinksChange={handleSocialLinksChange}
    />
  );
}
