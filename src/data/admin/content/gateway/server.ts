"use server";

import { isGraphQL } from "@/consts/env";

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

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

export async function getContentPages(): Promise<AdminContentPageListItem[]> {
  if (isGraphQL) {
    return graphqlImpl.getContentPages();
  }
  return actionImpl.getContentPages();
}

export async function getContentPageBySlug(
  slug: string,
): Promise<AdminContentPage | null> {
  if (isGraphQL) {
    return graphqlImpl.getContentPageBySlug(slug);
  }
  return actionImpl.getContentPageBySlug(slug);
}

export async function updateContentPage(
  slug: string,
  content: object,
): Promise<AdminContentMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.updateContentPage(slug, content);
  }
  return actionImpl.updateContentPage(slug, content);
}

export async function toggleContentPageActive(
  slug: string,
): Promise<AdminContentMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.toggleContentPageActive(slug);
  }
  return actionImpl.toggleContentPageActive(slug);
}

// Public content functions
export async function getPublicAboutContent(): Promise<AboutPageContent | null> {
  if (isGraphQL) {
    return graphqlImpl.getPublicAboutContent();
  }
  return actionImpl.getPublicAboutContent() as Promise<AboutPageContent | null>;
}

export async function getPublicFAQContent(): Promise<FaqPageContent | null> {
  if (isGraphQL) {
    return graphqlImpl.getPublicFAQContent();
  }
  return actionImpl.getPublicFAQContent() as Promise<FaqPageContent | null>;
}

export async function getPublicShippingContent(): Promise<ShippingPageContent | null> {
  if (isGraphQL) {
    return graphqlImpl.getPublicShippingContent();
  }
  return actionImpl.getPublicShippingContent() as Promise<ShippingPageContent | null>;
}

export async function getPublicCareContent(): Promise<CarePageContent | null> {
  if (isGraphQL) {
    return graphqlImpl.getPublicCareContent();
  }
  return actionImpl.getPublicCareContent() as Promise<CarePageContent | null>;
}

export async function getPublicPrivacyContent(): Promise<PrivacyPageContent | null> {
  if (isGraphQL) {
    return graphqlImpl.getPublicPrivacyContent();
  }
  return actionImpl.getPublicPrivacyContent() as Promise<PrivacyPageContent | null>;
}

export async function getPublicTermsContent(): Promise<TermsPageContent | null> {
  if (isGraphQL) {
    return graphqlImpl.getPublicTermsContent();
  }
  return actionImpl.getPublicTermsContent() as Promise<TermsPageContent | null>;
}
