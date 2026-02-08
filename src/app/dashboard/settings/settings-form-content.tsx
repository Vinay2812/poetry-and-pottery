import {
  getContactInfo,
  getHeroImages,
  getSocialLinks,
} from "@/data/admin/settings/gateway/server";
import { SettingsFormContainer } from "@/features/dashboard/settings";

export async function SettingsFormContent() {
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
