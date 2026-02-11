"use client";

import {
  Contact,
  Image as ImageIcon,
  Loader2,
  Save,
  Share2,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { SettingsFormProps, SettingsTab } from "../types";
import { ContactInfoTabContent } from "./contact-info-tab-content";
import { HeroImagesTabContent } from "./hero-images-tab-content";
import { SocialLinksTabContent } from "./social-links-tab-content";

export function SettingsForm({
  viewModel,
  activeTab,
  onTabChange,
  onHeroImagesChange,
  onContactInfoChange,
  onSocialLinksChange,
}: SettingsFormProps) {
  // Local state for form inputs
  const [heroImages, setHeroImages] = useState(viewModel.heroImages);
  const [contactInfo, setContactInfo] = useState(viewModel.contactInfo);
  const [socialLinks, setSocialLinks] = useState(viewModel.socialLinks);

  const handleHeroImagesSave = useCallback(async () => {
    await onHeroImagesChange(heroImages);
  }, [heroImages, onHeroImagesChange]);

  const handleContactInfoSave = useCallback(async () => {
    await onContactInfoChange(contactInfo);
  }, [contactInfo, onContactInfoChange]);

  const handleSocialLinksSave = useCallback(async () => {
    await onSocialLinksChange(socialLinks);
  }, [socialLinks, onSocialLinksChange]);

  return (
    <div className="space-y-6">
      <Tabs
        value={activeTab}
        onValueChange={(v) => onTabChange(v as SettingsTab)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hero" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Hero Images</span>
            <span className="sm:hidden">Images</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Contact className="h-4 w-4" />
            <span className="hidden sm:inline">Contact Info</span>
            <span className="sm:hidden">Contact</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Social Links</span>
            <span className="sm:hidden">Social</span>
          </TabsTrigger>
        </TabsList>

        {/* Hero Images Tab */}
        <TabsContent value="hero" className="space-y-6 pt-6">
          <form className="rounded-lg border p-6" action={handleHeroImagesSave}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Hero Images</h3>
                <p className="text-muted-foreground text-sm">
                  Configure the hero banner images for different pages.
                </p>
              </div>
              <SettingsSaveButton />
            </div>
            <HeroImagesTabContent
              heroImages={heroImages}
              onHeroImagesChange={setHeroImages}
            />
          </form>
        </TabsContent>

        {/* Contact Info Tab */}
        <TabsContent value="contact" className="space-y-6 pt-6">
          <form
            className="rounded-lg border p-6"
            action={handleContactInfoSave}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <p className="text-muted-foreground text-sm">
                  Update your business contact details.
                </p>
              </div>
              <SettingsSaveButton />
            </div>
            <ContactInfoTabContent
              contactInfo={contactInfo}
              onContactInfoChange={setContactInfo}
            />
          </form>
        </TabsContent>

        {/* Social Links Tab */}
        <TabsContent value="social" className="space-y-6 pt-6">
          <form
            className="rounded-lg border p-6"
            action={handleSocialLinksSave}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Social Media Links</h3>
                <p className="text-muted-foreground text-sm">
                  Configure your social media profile links.
                </p>
              </div>
              <SettingsSaveButton />
            </div>
            <SocialLinksTabContent
              socialLinks={socialLinks}
              onSocialLinksChange={setSocialLinks}
            />
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SettingsSaveButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} size="sm">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        <Save className="mr-2 h-4 w-4" />
      )}
      Save Changes
    </Button>
  );
}
