"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  useAdminUpdateContactInfoMutation,
  useAdminUpdateHeroImagesMutation,
  useAdminUpdateSocialLinksMutation,
} from "@/graphql/generated/graphql";
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
  const [updateHeroImagesMutation] = useAdminUpdateHeroImagesMutation();
  const [updateContactInfoMutation] = useAdminUpdateContactInfoMutation();
  const [updateSocialLinksMutation] = useAdminUpdateSocialLinksMutation();

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
      try {
        const { data } = await updateHeroImagesMutation({
          variables: { input: images },
        });
        const result = data?.adminUpdateHeroImages;
        if (result?.success) {
          toast.success("Hero images updated successfully");
        } else {
          toast.error(result?.error || "Failed to update hero images");
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update hero images",
        );
      }
    },
    [updateHeroImagesMutation],
  );

  const handleContactInfoChange = useCallback(
    async (info: Partial<ContactInfo>) => {
      try {
        const { data } = await updateContactInfoMutation({
          variables: { input: info },
        });
        const result = data?.adminUpdateContactInfo;
        if (result?.success) {
          toast.success("Contact information updated successfully");
        } else {
          toast.error(result?.error || "Failed to update contact information");
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update contact information",
        );
      }
    },
    [updateContactInfoMutation],
  );

  const handleSocialLinksChange = useCallback(
    async (links: Partial<SocialLinks>) => {
      try {
        const { data } = await updateSocialLinksMutation({
          variables: { input: links },
        });
        const result = data?.adminUpdateSocialLinks;
        if (result?.success) {
          toast.success("Social links updated successfully");
        } else {
          toast.error(result?.error || "Failed to update social links");
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update social links",
        );
      }
    },
    [updateSocialLinksMutation],
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
