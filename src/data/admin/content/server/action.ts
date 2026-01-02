"use server";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

import type {
  AdminContentMutationResponse,
  AdminContentPage,
  AdminContentPageListItem,
} from "@/graphql/generated/types";

type ContentPageType =
  | "about"
  | "faq"
  | "shipping"
  | "care"
  | "privacy"
  | "terms";

const PAGE_CONFIG: Record<ContentPageType, { title: string }> = {
  about: { title: "About Us" },
  faq: { title: "FAQ" },
  shipping: { title: "Shipping & Returns" },
  care: { title: "Care Instructions" },
  privacy: { title: "Privacy Policy" },
  terms: { title: "Terms of Service" },
};

export async function getContentPages(): Promise<AdminContentPageListItem[]> {
  await requireAdmin();

  const pages = await prisma.contentPage.findMany({
    select: {
      slug: true,
      title: true,
      is_active: true,
      updated_at: true,
    },
    orderBy: { slug: "asc" },
  });

  const existingPages = new Map(pages.map((p) => [p.slug, p]));
  const allPages: AdminContentPageListItem[] = [];

  for (const [slug, config] of Object.entries(PAGE_CONFIG)) {
    const existing = existingPages.get(slug);
    allPages.push({
      slug,
      title: config.title,
      is_active: existing?.is_active ?? true,
      updated_at: existing?.updated_at ?? new Date(),
    });
  }

  return allPages;
}

export async function getContentPageBySlug(
  slug: string,
): Promise<AdminContentPage | null> {
  await requireAdmin();

  const config = PAGE_CONFIG[slug as ContentPageType];
  if (!config) {
    return null;
  }

  const page = await prisma.contentPage.findUnique({
    where: { slug },
  });

  if (page) {
    return {
      id: page.id,
      slug: page.slug,
      title: page.title,
      content: page.content as object,
      is_active: page.is_active,
      created_at: page.created_at,
      updated_at: page.updated_at,
    };
  }

  return {
    id: 0,
    slug,
    title: config.title,
    content: {},
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  };
}

export async function updateContentPage(
  slug: string,
  content: object,
): Promise<AdminContentMutationResponse> {
  await requireAdmin();

  const config = PAGE_CONFIG[slug as ContentPageType];
  if (!config) {
    return { success: false, error: "Invalid page slug" };
  }

  try {
    await prisma.contentPage.upsert({
      where: { slug },
      create: {
        slug,
        title: config.title,
        content: content as PrismaJson.ContentBlocks,
        is_active: true,
      },
      update: {
        content: content as PrismaJson.ContentBlocks,
      },
    });

    return { success: true };
  } catch {
    return { success: false, error: "Failed to update content page" };
  }
}

export async function toggleContentPageActive(
  slug: string,
): Promise<AdminContentMutationResponse> {
  await requireAdmin();

  const config = PAGE_CONFIG[slug as ContentPageType];
  if (!config) {
    return { success: false, error: "Invalid page slug" };
  }

  try {
    const existing = await prisma.contentPage.findUnique({
      where: { slug },
    });

    if (existing) {
      await prisma.contentPage.update({
        where: { slug },
        data: { is_active: !existing.is_active },
      });
    } else {
      await prisma.contentPage.create({
        data: {
          slug,
          title: config.title,
          content: {} as PrismaJson.ContentBlocks,
          is_active: false,
        },
      });
    }

    return { success: true };
  } catch {
    return { success: false, error: "Failed to toggle content page" };
  }
}

// Public content functions (no admin check required)
async function getPublicContentBySlug(slug: string): Promise<object | null> {
  const page = await prisma.contentPage.findFirst({
    where: { slug, is_active: true },
    select: { content: true },
  });

  return page?.content as object | null;
}

export async function getPublicAboutContent(): Promise<object | null> {
  return getPublicContentBySlug("about");
}

export async function getPublicFAQContent(): Promise<object | null> {
  return getPublicContentBySlug("faq");
}

export async function getPublicShippingContent(): Promise<object | null> {
  return getPublicContentBySlug("shipping");
}

export async function getPublicCareContent(): Promise<object | null> {
  return getPublicContentBySlug("care");
}

export async function getPublicPrivacyContent(): Promise<object | null> {
  return getPublicContentBySlug("privacy");
}

export async function getPublicTermsContent(): Promise<object | null> {
  return getPublicContentBySlug("terms");
}
