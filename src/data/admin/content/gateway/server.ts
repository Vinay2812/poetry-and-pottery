"use server";

import type {
  AboutPageContent,
  AdminContentMutationResponse,
  AdminContentPage,
  AdminContentPageListItem,
  CarePageContent,
  FaqPageContent,
  PrivacyPageContent,
  ShippingPageContent,
  TermsPageContent,
} from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

export async function getContentPages(): Promise<AdminContentPageListItem[]> {
  return graphqlImpl.getContentPages();
}

export async function getContentPageBySlug(
  slug: string,
): Promise<AdminContentPage | null> {
  return graphqlImpl.getContentPageBySlug(slug);
}

export async function updateContentPage(
  slug: string,
  content: object,
): Promise<AdminContentMutationResponse> {
  return graphqlImpl.updateContentPage(slug, content);
}

export async function toggleContentPageActive(
  slug: string,
): Promise<AdminContentMutationResponse> {
  return graphqlImpl.toggleContentPageActive(slug);
}

// Public content functions
export async function getPublicAboutContent(): Promise<AboutPageContent | null> {
  return graphqlImpl.getPublicAboutContent();
}

export async function getPublicFAQContent(): Promise<FaqPageContent | null> {
  return graphqlImpl.getPublicFAQContent();
}

export async function getPublicShippingContent(): Promise<ShippingPageContent | null> {
  return graphqlImpl.getPublicShippingContent();
}

export async function getPublicCareContent(): Promise<CarePageContent | null> {
  return graphqlImpl.getPublicCareContent();
}

export async function getPublicPrivacyContent(): Promise<PrivacyPageContent | null> {
  return graphqlImpl.getPublicPrivacyContent();
}

export async function getPublicTermsContent(): Promise<TermsPageContent | null> {
  return graphqlImpl.getPublicTermsContent();
}
