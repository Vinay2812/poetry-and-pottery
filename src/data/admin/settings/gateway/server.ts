"use server";

import { isGraphQL } from "@/consts/env";

import type {
  AdminSettingsMutationResponse,
  AdminSiteSetting,
  ContactInfo,
  HeroImages,
  SocialLinks,
} from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

export async function getAllSettings(): Promise<AdminSiteSetting[]> {
  if (isGraphQL) {
    return graphqlImpl.getAllSettings();
  }
  return actionImpl.getAllSettings();
}

export async function getHeroImages(): Promise<HeroImages> {
  if (isGraphQL) {
    return graphqlImpl.getHeroImages();
  }
  return actionImpl.getHeroImages();
}

export async function updateHeroImages(
  images: Partial<HeroImages>,
): Promise<AdminSettingsMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.updateHeroImages(images);
  }
  return actionImpl.updateHeroImages(images);
}

export async function getContactInfo(): Promise<ContactInfo> {
  if (isGraphQL) {
    return graphqlImpl.getContactInfo();
  }
  return actionImpl.getContactInfo();
}

export async function updateContactInfo(
  info: Partial<ContactInfo>,
): Promise<AdminSettingsMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.updateContactInfo(info);
  }
  return actionImpl.updateContactInfo(info);
}

export async function getSocialLinks(): Promise<SocialLinks> {
  if (isGraphQL) {
    return graphqlImpl.getSocialLinks();
  }
  return actionImpl.getSocialLinks();
}

export async function updateSocialLinks(
  links: Partial<SocialLinks>,
): Promise<AdminSettingsMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.updateSocialLinks(links);
  }
  return actionImpl.updateSocialLinks(links);
}

// Public settings functions
export async function getPublicHeroImages(): Promise<HeroImages> {
  if (isGraphQL) {
    return graphqlImpl.getPublicHeroImages();
  }
  return actionImpl.getPublicHeroImages();
}

export async function getPublicContactInfo(): Promise<ContactInfo> {
  if (isGraphQL) {
    return graphqlImpl.getPublicContactInfo();
  }
  return actionImpl.getPublicContactInfo();
}

export async function getPublicSocialLinks(): Promise<SocialLinks> {
  if (isGraphQL) {
    return graphqlImpl.getPublicSocialLinks();
  }
  return actionImpl.getPublicSocialLinks();
}
