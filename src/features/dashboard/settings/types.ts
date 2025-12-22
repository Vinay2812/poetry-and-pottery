import type { ContactInfo, HeroImages, SocialLinks } from "@/actions/admin";

/**
 * View model for the settings page.
 */
export interface SettingsViewModel {
  heroImages: HeroImagesViewModel;
  contactInfo: ContactInfoViewModel;
  socialLinks: SocialLinksViewModel;
}

export interface HeroImagesViewModel {
  home: string;
  ourStory: string;
  products: string;
  events: string;
}

export interface ContactInfoViewModel {
  address: string;
  email: string;
  phone: string;
  hours: string;
}

export interface SocialLinksViewModel {
  instagram: string;
  facebook: string;
  twitter: string;
  pinterest: string;
}

/**
 * Props for the presentational SettingsForm component.
 */
export interface SettingsFormProps {
  viewModel: SettingsViewModel;
  isPending: boolean;
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
  onHeroImagesChange: (images: Partial<HeroImages>) => void;
  onContactInfoChange: (info: Partial<ContactInfo>) => void;
  onSocialLinksChange: (links: Partial<SocialLinks>) => void;
}

export type SettingsTab = "hero" | "contact" | "social";

/**
 * Props for the SettingsFormContainer.
 */
export interface SettingsFormContainerProps {
  heroImages: HeroImages;
  contactInfo: ContactInfo;
  socialLinks: SocialLinks;
}

/**
 * Build settings view model from raw data.
 */
export function buildSettingsViewModel(
  heroImages: HeroImages,
  contactInfo: ContactInfo,
  socialLinks: SocialLinks,
): SettingsViewModel {
  return {
    heroImages: {
      home: heroImages.home,
      ourStory: heroImages.ourStory,
      products: heroImages.products,
      events: heroImages.events,
    },
    contactInfo: {
      address: contactInfo.address,
      email: contactInfo.email,
      phone: contactInfo.phone,
      hours: contactInfo.hours,
    },
    socialLinks: {
      instagram: socialLinks.instagram,
      facebook: socialLinks.facebook,
      twitter: socialLinks.twitter,
      pinterest: socialLinks.pinterest,
    },
  };
}
