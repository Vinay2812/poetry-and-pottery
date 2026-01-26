"use client";

import {
  updateContactInfo,
  updateHeroImages,
  updateSocialLinks,
} from "@/data/admin/settings/gateway/server";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import type {
  ContactInfo,
  HeroImages,
  SocialLinks,
} from "@/graphql/generated/types";

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

  const handleHeroImagesChange = useCallback(
    async (images: Partial<HeroImages>) => {
      const result = await updateHeroImages(images);
      if (result.success) {
        toast.success("Hero images updated successfully");
      } else {
        toast.error(result.error || "Failed to update hero images");
      }
    },
    [],
  );

  const handleContactInfoChange = useCallback(
    async (info: Partial<ContactInfo>) => {
      const result = await updateContactInfo(info);
      if (result.success) {
        toast.success("Contact information updated successfully");
      } else {
        toast.error(result.error || "Failed to update contact information");
      }
    },
    [],
  );

  const handleSocialLinksChange = useCallback(
    async (links: Partial<SocialLinks>) => {
      const result = await updateSocialLinks(links);
      if (result.success) {
        toast.success("Social links updated successfully");
      } else {
        toast.error(result.error || "Failed to update social links");
      }
    },
    [],
  );

  return (
    <SettingsForm
      viewModel={viewModel}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onHeroImagesChange={handleHeroImagesChange}
      onContactInfoChange={handleContactInfoChange}
      onSocialLinksChange={handleSocialLinksChange}
    />
  );
}
