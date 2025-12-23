"use server";

import { prisma } from "@/lib/prisma";

import { getAuthenticatedUserId } from "./auth.action";

export async function subscribeToNewsletter(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
      return { success: false, error: "Please sign in to subscribe" };
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        subscribed_to_newsletter: true,
        newsletter_subscribed_at: new Date(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to subscribe to newsletter:", error);
    return { success: false, error: "Failed to subscribe. Please try again." };
  }
}

export async function unsubscribeFromNewsletter(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
      return { success: false, error: "Please sign in to unsubscribe" };
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        subscribed_to_newsletter: false,
        newsletter_subscribed_at: null,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to unsubscribe from newsletter:", error);
    return {
      success: false,
      error: "Failed to unsubscribe. Please try again.",
    };
  }
}

export async function getNewsletterSubscriptionStatus(): Promise<{
  isSubscribed: boolean;
  subscribedAt: Date | null;
}> {
  try {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
      return { isSubscribed: false, subscribedAt: null };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        subscribed_to_newsletter: true,
        newsletter_subscribed_at: true,
      },
    });

    return {
      isSubscribed: user?.subscribed_to_newsletter ?? false,
      subscribedAt: user?.newsletter_subscribed_at ?? null,
    };
  } catch (error) {
    console.error("Failed to get newsletter subscription status:", error);
    return { isSubscribed: false, subscribedAt: null };
  }
}
