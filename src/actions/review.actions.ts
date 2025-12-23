"use server";

import { DEFAULT_PAGE_SIZE } from "@/consts/performance";
import type { PaginatedResponse, ReviewWithUser } from "@/types";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { getAuthenticatedUserId } from "./auth.action";

export async function getProductReviews(
  productId: number,
  page: number = 1,
  limit: number = DEFAULT_PAGE_SIZE,
): Promise<PaginatedResponse<ReviewWithUser>> {
  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where: { product_id: productId },
      include: {
        user: true,
        likes: true,
      },
      orderBy: { created_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.review.count({ where: { product_id: productId } }),
  ]);

  return {
    data: reviews as ReviewWithUser[],
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getEventReviews(
  eventId: string,
  page: number = 1,
  limit: number = DEFAULT_PAGE_SIZE,
): Promise<PaginatedResponse<ReviewWithUser>> {
  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where: { event_id: eventId },
      include: {
        user: true,
        likes: true,
      },
      orderBy: { created_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.review.count({ where: { event_id: eventId } }),
  ]);

  return {
    data: reviews as ReviewWithUser[],
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function createProductReview(data: {
  productId: number;
  rating: number;
  review?: string;
  imageUrls?: string[];
}) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false as const, error: "Not authenticated" };
  }

  try {
    // Check if user already reviewed this product
    const existing = await prisma.review.findUnique({
      where: {
        product_id_user_id: {
          product_id: data.productId,
          user_id: userId,
        },
      },
    });

    if (existing) {
      return {
        success: false as const,
        error: "You have already reviewed this product",
      };
    }

    const review = await prisma.review.create({
      data: {
        user_id: userId,
        product_id: data.productId,
        rating: data.rating,
        review: data.review?.trim() || null,
        image_urls: data.imageUrls ?? [],
      },
      include: {
        user: true,
        likes: true,
      },
    });

    revalidatePath(`/products/${data.productId}`);
    revalidatePath("/products");

    return { success: true as const, data: review as ReviewWithUser };
  } catch (error) {
    console.error("Failed to create review:", error);
    return { success: false as const, error: "Failed to create review" };
  }
}

export async function createEventReview(data: {
  eventId: string;
  rating: number;
  review?: string;
  imageUrls?: string[];
}) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false as const, error: "Not authenticated" };
  }

  try {
    // Check if user already reviewed this event
    const existing = await prisma.review.findUnique({
      where: {
        event_id_user_id: {
          event_id: data.eventId,
          user_id: userId,
        },
      },
    });

    if (existing) {
      return {
        success: false as const,
        error: "You have already reviewed this event",
      };
    }

    const review = await prisma.review.create({
      data: {
        user_id: userId,
        event_id: data.eventId,
        rating: data.rating,
        review: data.review?.trim() || null,
        image_urls: data.imageUrls ?? [],
      },
      include: {
        user: true,
        likes: true,
      },
    });

    revalidatePath(`/events/past/${data.eventId}`);
    revalidatePath("/events/past");

    return { success: true as const, data: review as ReviewWithUser };
  } catch (error) {
    console.error("Failed to create review:", error);
    return { success: false as const, error: "Failed to create review" };
  }
}

export async function deleteReview(reviewId: number) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false as const, error: "Not authenticated" };
  }

  try {
    await prisma.review.delete({
      where: {
        id: reviewId,
        user_id: userId,
      },
    });
    revalidatePath("/products");
    revalidatePath("/events");

    return { success: true as const };
  } catch (error) {
    console.error("Failed to delete review:", error);
    return { success: false as const, error: "Failed to delete review" };
  }
}

export async function toggleReviewLike(reviewId: number) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false as const, error: "Not authenticated" };
  }

  try {
    const existing = await prisma.reviewLike.findUnique({
      where: {
        review_id_user_id: {
          review_id: reviewId,
          user_id: userId,
        },
      },
    });

    if (existing) {
      await prisma.reviewLike.delete({
        where: { id: existing.id },
      });
    } else {
      await prisma.reviewLike.create({
        data: {
          review_id: reviewId,
          user_id: userId,
        },
      });
    }

    const likesCount = await prisma.reviewLike.count({
      where: { review_id: reviewId },
    });

    return {
      success: true as const,
      action: existing ? ("unliked" as const) : ("liked" as const),
      likesCount,
    };
  } catch (error) {
    console.error("Failed to toggle like:", error);
    return { success: false as const, error: "Failed to toggle like" };
  }
}
