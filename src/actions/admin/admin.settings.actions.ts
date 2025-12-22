"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export interface HeroImages {
  home: string;
  ourStory: string;
  products: string;
  events: string;
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  hours: string;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  twitter: string;
  pinterest: string;
}

export interface SiteSetting {
  id: number;
  key: string;
  value: unknown;
  updated_at: Date;
}

export interface SettingsActionResult {
  success: boolean;
  error?: string;
}

// Setting keys (internal use only - cannot export from "use server" file)
const SETTING_KEYS = {
  HERO_IMAGES: "hero_images",
  CONTACT_INFO: "contact_info",
  SOCIAL_LINKS: "social_links",
} as const;

// Default values
const DEFAULT_HERO_IMAGES: HeroImages = {
  home: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920&q=80",
  ourStory:
    "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=1920&q=80",
  products:
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1920&q=80",
  events:
    "https://images.unsplash.com/photo-1614178060596-4a9c8a8c5b9c?w=1920&q=80",
};

const DEFAULT_CONTACT_INFO: ContactInfo = {
  address: "123 Potter's Lane, Artisan District",
  email: "hello@poetryandpottery.com",
  phone: "+91 98765 43210",
  hours: "Mon-Sat, 10am - 6pm",
};

const DEFAULT_SOCIAL_LINKS: SocialLinks = {
  instagram: "https://instagram.com/poetryandpottery",
  facebook: "https://facebook.com/poetryandpottery",
  twitter: "https://twitter.com/poetryandpottery",
  pinterest: "https://pinterest.com/poetryandpottery",
};

async function getSetting<T>(key: string, defaultValue: T): Promise<T> {
  const setting = await prisma.siteSetting.findUnique({
    where: { key },
  });

  if (setting && typeof setting.value === "object" && setting.value !== null) {
    return setting.value as T;
  }

  return defaultValue;
}

async function saveSetting(
  key: string,
  value: PrismaJson.SettingValue,
): Promise<void> {
  await prisma.siteSetting.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  });
}

/**
 * Get all site settings.
 */
export async function getAllSettings(): Promise<SiteSetting[]> {
  await requireAdmin();

  const settings = await prisma.siteSetting.findMany({
    orderBy: { key: "asc" },
  });

  return settings;
}

/**
 * Get hero images settings.
 */
export async function getHeroImages(): Promise<HeroImages> {
  await requireAdmin();
  return getSetting(SETTING_KEYS.HERO_IMAGES, DEFAULT_HERO_IMAGES);
}

/**
 * Update hero images settings.
 */
export async function updateHeroImages(
  images: Partial<HeroImages>,
): Promise<SettingsActionResult> {
  await requireAdmin();

  try {
    const current = await getSetting(
      SETTING_KEYS.HERO_IMAGES,
      DEFAULT_HERO_IMAGES,
    );
    const updated = { ...current, ...images };
    await saveSetting(SETTING_KEYS.HERO_IMAGES, updated);

    revalidatePath("/dashboard/settings");
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/products");
    revalidatePath("/events");

    return { success: true };
  } catch (error) {
    console.error("Failed to update hero images:", error);
    return { success: false, error: "Failed to update hero images" };
  }
}

/**
 * Get contact info settings.
 */
export async function getContactInfo(): Promise<ContactInfo> {
  await requireAdmin();
  return getSetting(SETTING_KEYS.CONTACT_INFO, DEFAULT_CONTACT_INFO);
}

/**
 * Update contact info settings.
 */
export async function updateContactInfo(
  info: Partial<ContactInfo>,
): Promise<SettingsActionResult> {
  await requireAdmin();

  try {
    const current = await getSetting(
      SETTING_KEYS.CONTACT_INFO,
      DEFAULT_CONTACT_INFO,
    );
    const updated = { ...current, ...info };
    await saveSetting(SETTING_KEYS.CONTACT_INFO, updated);

    revalidatePath("/dashboard/settings");
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath("/faq");

    return { success: true };
  } catch (error) {
    console.error("Failed to update contact info:", error);
    return { success: false, error: "Failed to update contact info" };
  }
}

/**
 * Get social links settings.
 */
export async function getSocialLinks(): Promise<SocialLinks> {
  await requireAdmin();
  return getSetting(SETTING_KEYS.SOCIAL_LINKS, DEFAULT_SOCIAL_LINKS);
}

/**
 * Update social links settings.
 */
export async function updateSocialLinks(
  links: Partial<SocialLinks>,
): Promise<SettingsActionResult> {
  await requireAdmin();

  try {
    const current = await getSetting(
      SETTING_KEYS.SOCIAL_LINKS,
      DEFAULT_SOCIAL_LINKS,
    );
    const updated = { ...current, ...links };
    await saveSetting(SETTING_KEYS.SOCIAL_LINKS, updated);

    revalidatePath("/dashboard/settings");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Failed to update social links:", error);
    return { success: false, error: "Failed to update social links" };
  }
}

/**
 * Get a specific setting by key (for public pages).
 * This function doesn't require admin access.
 */
export async function getPublicSetting<T>(
  key: string,
  defaultValue: T,
): Promise<T> {
  return getSetting(key, defaultValue);
}

/**
 * Get public hero images (no admin required).
 */
export async function getPublicHeroImages(): Promise<HeroImages> {
  return getSetting(SETTING_KEYS.HERO_IMAGES, DEFAULT_HERO_IMAGES);
}

/**
 * Get public contact info (no admin required).
 */
export async function getPublicContactInfo(): Promise<ContactInfo> {
  return getSetting(SETTING_KEYS.CONTACT_INFO, DEFAULT_CONTACT_INFO);
}

/**
 * Get public social links (no admin required).
 */
export async function getPublicSocialLinks(): Promise<SocialLinks> {
  return getSetting(SETTING_KEYS.SOCIAL_LINKS, DEFAULT_SOCIAL_LINKS);
}
