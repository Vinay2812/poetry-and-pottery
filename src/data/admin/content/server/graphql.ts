"use server";

import { getClient, getPublicClient } from "@/lib/apollo";

import {
  ADMIN_TOGGLE_CONTENT_PAGE_ACTIVE_MUTATION,
  ADMIN_UPDATE_CONTENT_PAGE_MUTATION,
} from "@/graphql/admin/content.mutation";
import {
  ADMIN_CONTENT_PAGES_QUERY,
  ADMIN_CONTENT_PAGE_BY_SLUG_QUERY,
} from "@/graphql/admin/content.query";
import {
  PUBLIC_ABOUT_CONTENT_QUERY,
  PUBLIC_CARE_CONTENT_QUERY,
  PUBLIC_FAQ_CONTENT_QUERY,
  PUBLIC_PRIVACY_CONTENT_QUERY,
  PUBLIC_SHIPPING_CONTENT_QUERY,
  PUBLIC_TERMS_CONTENT_QUERY,
} from "@/graphql/admin/public-content.query";
import type {
  AboutPageContent,
  AdminContentMutationResponse,
  AdminContentPage,
  AdminContentPageBySlugQuery,
  AdminContentPageBySlugQueryVariables,
  AdminContentPageListItem,
  AdminContentPagesQuery,
  AdminToggleContentPageActiveMutation,
  AdminToggleContentPageActiveMutationVariables,
  AdminUpdateContentPageMutation,
  AdminUpdateContentPageMutationVariables,
  CarePageContent,
  FaqPageContent,
  PrivacyPageContent,
  PublicAboutContentQuery,
  PublicCareContentQuery,
  PublicFaqContentQuery,
  PublicPrivacyContentQuery,
  PublicShippingContentQuery,
  PublicTermsContentQuery,
  ShippingPageContent,
  TermsPageContent,
} from "@/graphql/generated/types";

export async function getContentPages(): Promise<AdminContentPageListItem[]> {
  const client = getClient();

  const result = await client.query<AdminContentPagesQuery>({
    query: ADMIN_CONTENT_PAGES_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminContentPages;
}

export async function getContentPageBySlug(
  slug: string,
): Promise<AdminContentPage | null> {
  const client = getClient();

  const result = await client.query<
    AdminContentPageBySlugQuery,
    AdminContentPageBySlugQueryVariables
  >({
    query: ADMIN_CONTENT_PAGE_BY_SLUG_QUERY,
    variables: { slug },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminContentPageBySlug ?? null;
}

export async function updateContentPage(
  slug: string,
  input: object,
): Promise<AdminContentMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateContentPageMutation,
    AdminUpdateContentPageMutationVariables
  >({
    mutation: ADMIN_UPDATE_CONTENT_PAGE_MUTATION,
    variables: { slug, input: { content: input } },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateContentPage;
}

export async function toggleContentPageActive(
  slug: string,
): Promise<AdminContentMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminToggleContentPageActiveMutation,
    AdminToggleContentPageActiveMutationVariables
  >({
    mutation: ADMIN_TOGGLE_CONTENT_PAGE_ACTIVE_MUTATION,
    variables: { slug },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminToggleContentPageActive;
}

// Public content functions
export async function getPublicAboutContent(): Promise<AboutPageContent | null> {
  const client = getPublicClient();

  const result = await client.query<PublicAboutContentQuery>({
    query: PUBLIC_ABOUT_CONTENT_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.publicAboutContent ?? null;
}

export async function getPublicFAQContent(): Promise<FaqPageContent | null> {
  const client = getPublicClient();

  const result = await client.query<PublicFaqContentQuery>({
    query: PUBLIC_FAQ_CONTENT_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.publicFAQContent ?? null;
}

export async function getPublicShippingContent(): Promise<ShippingPageContent | null> {
  const client = getPublicClient();

  const result = await client.query<PublicShippingContentQuery>({
    query: PUBLIC_SHIPPING_CONTENT_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.publicShippingContent ?? null;
}

export async function getPublicCareContent(): Promise<CarePageContent | null> {
  const client = getPublicClient();

  const result = await client.query<PublicCareContentQuery>({
    query: PUBLIC_CARE_CONTENT_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.publicCareContent ?? null;
}

export async function getPublicPrivacyContent(): Promise<PrivacyPageContent | null> {
  const client = getPublicClient();

  const result = await client.query<PublicPrivacyContentQuery>({
    query: PUBLIC_PRIVACY_CONTENT_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.publicPrivacyContent ?? null;
}

export async function getPublicTermsContent(): Promise<TermsPageContent | null> {
  const client = getPublicClient();

  const result = await client.query<PublicTermsContentQuery>({
    query: PUBLIC_TERMS_CONTENT_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.publicTermsContent ?? null;
}
