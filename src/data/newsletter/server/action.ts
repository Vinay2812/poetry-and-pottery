"use server";

import { getAuthenticatedUserId } from "@/actions/auth.action";
import { prisma } from "@/lib/prisma";

import type {
  NewsletterMutationResponse,
  NewsletterStatus,
} from "@/graphql/generated/types";

export async function getNewsletterStatus(): Promise<NewsletterStatus> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { subscribed: false, subscribed_at: null };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      subscribed_to_newsletter: true,
      newsletter_subscribed_at: true,
    },
  });

  return {
    subscribed: user?.subscribed_to_newsletter ?? false,
    subscribed_at: user?.newsletter_subscribed_at ?? null,
  };
}

export async function subscribeToNewsletter(): Promise<NewsletterMutationResponse> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Please sign in to subscribe" };
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        subscribed_to_newsletter: true,
        newsletter_subscribed_at: new Date(),
      },
      select: {
        subscribed_to_newsletter: true,
        newsletter_subscribed_at: true,
      },
    });

    return {
      success: true,
      status: {
        subscribed: user.subscribed_to_newsletter,
        subscribed_at: user.newsletter_subscribed_at,
      },
    };
  } catch (error) {
    console.error("Failed to subscribe to newsletter:", error);
    return { success: false, error: "Failed to subscribe. Please try again." };
  }
}

export async function unsubscribeFromNewsletter(): Promise<NewsletterMutationResponse> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Please sign in to unsubscribe" };
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        subscribed_to_newsletter: false,
        newsletter_subscribed_at: null,
      },
      select: {
        subscribed_to_newsletter: true,
        newsletter_subscribed_at: true,
      },
    });

    return {
      success: true,
      status: {
        subscribed: user.subscribed_to_newsletter,
        subscribed_at: user.newsletter_subscribed_at,
      },
    };
  } catch (error) {
    console.error("Failed to unsubscribe from newsletter:", error);
    return {
      success: false,
      error: "Failed to unsubscribe. Please try again.",
    };
  }
}
