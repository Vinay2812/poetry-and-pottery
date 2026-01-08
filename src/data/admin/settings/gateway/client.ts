"use client";

import { isGraphQL } from "@/consts/env";
import { useCallback, useState } from "react";

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

import * as actionImpl from "../server/action";

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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminUpdateHeroImagesMutation();

  const mutate = useCallback(
    async (images: Partial<HeroImages>): Promise<UpdateHeroImagesResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.updateHeroImages(images);
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to update hero images",
          };
        } catch (e) {
          const error = e instanceof Error ? e : new Error("Unknown error");
          setActionError(error);
          return { success: false, error: error.message };
        } finally {
          setActionLoading(false);
        }
      }
    },
    [graphqlMutate],
  );

  return {
    mutate,
    loading: isGraphQL ? graphqlLoading : actionLoading,
    error: isGraphQL ? graphqlError : actionError,
  };
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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminUpdateContactInfoMutation();

  const mutate = useCallback(
    async (info: Partial<ContactInfo>): Promise<UpdateContactInfoResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.updateContactInfo(info);
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to update contact info",
          };
        } catch (e) {
          const error = e instanceof Error ? e : new Error("Unknown error");
          setActionError(error);
          return { success: false, error: error.message };
        } finally {
          setActionLoading(false);
        }
      }
    },
    [graphqlMutate],
  );

  return {
    mutate,
    loading: isGraphQL ? graphqlLoading : actionLoading,
    error: isGraphQL ? graphqlError : actionError,
  };
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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminUpdateSocialLinksMutation();

  const mutate = useCallback(
    async (links: Partial<SocialLinks>): Promise<UpdateSocialLinksResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.updateSocialLinks(links);
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to update social links",
          };
        } catch (e) {
          const error = e instanceof Error ? e : new Error("Unknown error");
          setActionError(error);
          return { success: false, error: error.message };
        } finally {
          setActionLoading(false);
        }
      }
    },
    [graphqlMutate],
  );

  return {
    mutate,
    loading: isGraphQL ? graphqlLoading : actionLoading,
    error: isGraphQL ? graphqlError : actionError,
  };
}
