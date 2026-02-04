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
import { cacheLife, cacheTag } from "next/cache";

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
  "use cache";
  cacheTag("content", "content:about");
  cacheLife("content");
  return graphqlImpl.getPublicAboutContent();
}

export async function getPublicFAQContent(): Promise<FaqPageContent | null> {
  "use cache";
  cacheTag("content", "content:faq");
  cacheLife("content");
  return graphqlImpl.getPublicFAQContent();
}

export async function getPublicShippingContent(): Promise<ShippingPageContent | null> {
  "use cache";
  cacheTag("content", "content:shipping");
  cacheLife("content");
  return graphqlImpl.getPublicShippingContent();
}

export async function getPublicCareContent(): Promise<CarePageContent | null> {
  "use cache";
  cacheTag("content", "content:care");
  cacheLife("content");
  return graphqlImpl.getPublicCareContent();
}

export async function getPublicPrivacyContent(): Promise<PrivacyPageContent | null> {
  "use cache";
  cacheTag("content", "content:privacy");
  cacheLife("content");
  return graphqlImpl.getPublicPrivacyContent();
}

export async function getPublicTermsContent(): Promise<TermsPageContent | null> {
  "use cache";
  cacheTag("content", "content:terms");
  cacheLife("content");
  return graphqlImpl.getPublicTermsContent();
}
