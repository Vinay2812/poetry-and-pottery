"use server";

import { getClient } from "@/lib/apollo";

import {
  PUBLIC_CONTACT_INFO_QUERY,
  PUBLIC_HERO_IMAGES_QUERY,
  PUBLIC_SOCIAL_LINKS_QUERY,
} from "@/graphql/admin/public-content.query";
import {
  ADMIN_UPDATE_CONTACT_INFO_MUTATION,
  ADMIN_UPDATE_HERO_IMAGES_MUTATION,
  ADMIN_UPDATE_SOCIAL_LINKS_MUTATION,
} from "@/graphql/admin/settings.mutation";
import {
  ADMIN_ALL_SETTINGS_QUERY,
  ADMIN_CONTACT_INFO_QUERY,
  ADMIN_HERO_IMAGES_QUERY,
  ADMIN_SOCIAL_LINKS_QUERY,
} from "@/graphql/admin/settings.query";
import type {
  AdminAllSettingsQuery,
  AdminContactInfoQuery,
  AdminHeroImagesQuery,
  AdminSettingsMutationResponse,
  AdminSiteSetting,
  AdminSocialLinksQuery,
  AdminUpdateContactInfoMutation,
  AdminUpdateContactInfoMutationVariables,
  AdminUpdateHeroImagesMutation,
  AdminUpdateHeroImagesMutationVariables,
  AdminUpdateSocialLinksMutation,
  AdminUpdateSocialLinksMutationVariables,
  ContactInfo,
  HeroImages,
  PublicContactInfoQuery,
  PublicHeroImagesQuery,
  PublicSocialLinksQuery,
  SocialLinks,
} from "@/graphql/generated/types";

export async function getAllSettings(): Promise<AdminSiteSetting[]> {
  const client = getClient();

  const result = await client.query<AdminAllSettingsQuery>({
    query: ADMIN_ALL_SETTINGS_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminAllSettings;
}

export async function getHeroImages(): Promise<HeroImages> {
  const client = getClient();

  const result = await client.query<AdminHeroImagesQuery>({
    query: ADMIN_HERO_IMAGES_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminHeroImages;
}

export async function updateHeroImages(
  input: Partial<HeroImages>,
): Promise<AdminSettingsMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateHeroImagesMutation,
    AdminUpdateHeroImagesMutationVariables
  >({
    mutation: ADMIN_UPDATE_HERO_IMAGES_MUTATION,
    variables: { input },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateHeroImages;
}

export async function getContactInfo(): Promise<ContactInfo> {
  const client = getClient();

  const result = await client.query<AdminContactInfoQuery>({
    query: ADMIN_CONTACT_INFO_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminContactInfo;
}

export async function updateContactInfo(
  input: Partial<ContactInfo>,
): Promise<AdminSettingsMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateContactInfoMutation,
    AdminUpdateContactInfoMutationVariables
  >({
    mutation: ADMIN_UPDATE_CONTACT_INFO_MUTATION,
    variables: { input },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateContactInfo;
}

export async function getSocialLinks(): Promise<SocialLinks> {
  const client = getClient();

  const result = await client.query<AdminSocialLinksQuery>({
    query: ADMIN_SOCIAL_LINKS_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminSocialLinks;
}

export async function updateSocialLinks(
  input: Partial<SocialLinks>,
): Promise<AdminSettingsMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateSocialLinksMutation,
    AdminUpdateSocialLinksMutationVariables
  >({
    mutation: ADMIN_UPDATE_SOCIAL_LINKS_MUTATION,
    variables: { input },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateSocialLinks;
}

// Public settings functions
export async function getPublicHeroImages(): Promise<HeroImages> {
  const client = getClient();

  const result = await client.query<PublicHeroImagesQuery>({
    query: PUBLIC_HERO_IMAGES_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.publicHeroImages;
}

export async function getPublicContactInfo(): Promise<ContactInfo> {
  const client = getClient();

  const result = await client.query<PublicContactInfoQuery>({
    query: PUBLIC_CONTACT_INFO_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.publicContactInfo;
}

export async function getPublicSocialLinks(): Promise<SocialLinks> {
  const client = getClient();

  const result = await client.query<PublicSocialLinksQuery>({
    query: PUBLIC_SOCIAL_LINKS_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.publicSocialLinks;
}
