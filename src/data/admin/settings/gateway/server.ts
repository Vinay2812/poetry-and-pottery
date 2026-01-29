"use server";

import type {
  AdminSettingsMutationResponse,
  AdminSiteSetting,
  ContactInfo,
  HeroImages,
  SocialLinks,
} from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

export async function getAllSettings(): Promise<AdminSiteSetting[]> {
  return graphqlImpl.getAllSettings();
}

export async function getHeroImages(): Promise<HeroImages> {
  return graphqlImpl.getHeroImages();
}

export async function updateHeroImages(
  images: Partial<HeroImages>,
): Promise<AdminSettingsMutationResponse> {
  return graphqlImpl.updateHeroImages(images);
}

export async function getContactInfo(): Promise<ContactInfo> {
  return graphqlImpl.getContactInfo();
}

export async function updateContactInfo(
  info: Partial<ContactInfo>,
): Promise<AdminSettingsMutationResponse> {
  return graphqlImpl.updateContactInfo(info);
}

export async function getSocialLinks(): Promise<SocialLinks> {
  return graphqlImpl.getSocialLinks();
}

export async function updateSocialLinks(
  links: Partial<SocialLinks>,
): Promise<AdminSettingsMutationResponse> {
  return graphqlImpl.updateSocialLinks(links);
}

// Public settings functions
export async function getPublicHeroImages(): Promise<HeroImages> {
  return graphqlImpl.getPublicHeroImages();
}

export async function getPublicContactInfo(): Promise<ContactInfo> {
  return graphqlImpl.getPublicContactInfo();
}

export async function getPublicSocialLinks(): Promise<SocialLinks> {
  return graphqlImpl.getPublicSocialLinks();
}
