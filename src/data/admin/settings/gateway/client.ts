"use client";

import { useCallback } from "react";

import {
  useAdminUpdateContactInfoMutation,
  useAdminUpdateHeroImagesMutation,
  useAdminUpdateSocialLinksMutation,
} from "@/graphql/generated/graphql";
import type {
  AdminSettingsMutationResponse,
  ContactInfo,
  HeroImages,
  SocialLinks,
} from "@/graphql/generated/types";

// ============ UPDATE HERO IMAGES ============

type UpdateHeroImagesResult =
  | { success: true; data: AdminSettingsMutationResponse }
  | { success: false; error: string };

interface UseAdminUpdateHeroImagesReturn {
  mutate: (images: Partial<HeroImages>) => Promise<UpdateHeroImagesResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminUpdateHeroImages(): UseAdminUpdateHeroImagesReturn {
  const [graphqlMutate, { loading, error }] =
    useAdminUpdateHeroImagesMutation();

  const mutate = useCallback(
    async (images: Partial<HeroImages>): Promise<UpdateHeroImagesResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: { input: images },
        });
        if (data?.adminUpdateHeroImages) {
          return { success: true, data: data.adminUpdateHeroImages };
        }
        return { success: false, error: "Failed to update hero images" };
      } catch (e) {
        return {
          success: false,
          error: e instanceof Error ? e.message : "Unknown error",
        };
      }
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
}

// ============ UPDATE CONTACT INFO ============

type UpdateContactInfoResult =
  | { success: true; data: AdminSettingsMutationResponse }
  | { success: false; error: string };

interface UseAdminUpdateContactInfoReturn {
  mutate: (info: Partial<ContactInfo>) => Promise<UpdateContactInfoResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminUpdateContactInfo(): UseAdminUpdateContactInfoReturn {
  const [graphqlMutate, { loading, error }] =
    useAdminUpdateContactInfoMutation();

  const mutate = useCallback(
    async (info: Partial<ContactInfo>): Promise<UpdateContactInfoResult> => {
      try {
        const { data } = await graphqlMutate({ variables: { input: info } });
        if (data?.adminUpdateContactInfo) {
          return { success: true, data: data.adminUpdateContactInfo };
        }
        return { success: false, error: "Failed to update contact info" };
      } catch (e) {
        return {
          success: false,
          error: e instanceof Error ? e.message : "Unknown error",
        };
      }
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
}

// ============ UPDATE SOCIAL LINKS ============

type UpdateSocialLinksResult =
  | { success: true; data: AdminSettingsMutationResponse }
  | { success: false; error: string };

interface UseAdminUpdateSocialLinksReturn {
  mutate: (links: Partial<SocialLinks>) => Promise<UpdateSocialLinksResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminUpdateSocialLinks(): UseAdminUpdateSocialLinksReturn {
  const [graphqlMutate, { loading, error }] =
    useAdminUpdateSocialLinksMutation();

  const mutate = useCallback(
    async (links: Partial<SocialLinks>): Promise<UpdateSocialLinksResult> => {
      try {
        const { data } = await graphqlMutate({ variables: { input: links } });
        if (data?.adminUpdateSocialLinks) {
          return { success: true, data: data.adminUpdateSocialLinks };
        }
        return { success: false, error: "Failed to update social links" };
      } catch (e) {
        return {
          success: false,
          error: e instanceof Error ? e.message : "Unknown error",
        };
      }
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
}
