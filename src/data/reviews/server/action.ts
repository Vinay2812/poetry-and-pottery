"use server";

import { getAuthenticatedUserId } from "@/actions/auth.action";
import { DEFAULT_PAGE_SIZE } from "@/consts/performance";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import type { Review, ReviewsResponse } from "@/graphql/generated/types";

function mapReview(
  review: {
    id: number;
    user_id: number;
    rating: number;
    review: string | null;
    image_urls: string[];
    product_id: number | null;
    event_id: string | null;
    created_at: Date;
    updated_at: Date;
    user: {
      id: number;
      name: string | null;
      image: string | null;
    };
    likes: {
      id: number;
      user_id: number;
    }[];
  },
  currentUserId?: number,
): Review {
  return {
    id: review.id,
    user_id: review.user_id,
    rating: review.rating,
    review: review.review,
    image_urls: review.image_urls,
    product_id: review.product_id,
    event_id: review.event_id,
    created_at: review.created_at,
    updated_at: review.updated_at,
    user: {
      id: review.user.id,
      name: review.user.name,
      image: review.user.image,
    },
    likes: review.likes.map((like) => ({
      id: like.id,
      user_id: like.user_id,
    })),
    likes_count: review.likes.length,
    is_liked_by_current_user: currentUserId
      ? review.likes.some((like) => like.user_id === currentUserId)
      : false,
  };
}

export async function getProductReviews(
  productId: number,
  page: number = 1,
  limit: number = DEFAULT_PAGE_SIZE,
): Promise<ReviewsResponse> {
  const userId = await getAuthenticatedUserId();

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where: { product_id: productId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        likes: {
          select: {
            id: true,
            user_id: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.review.count({ where: { product_id: productId } }),
  ]);

  return {
    data: reviews.map((review) => mapReview(review, userId ?? undefined)),
    total,
    page,
    total_pages: Math.ceil(total / limit),
  };
}

export async function getEventReviews(
  eventId: string,
  page: number = 1,
  limit: number = DEFAULT_PAGE_SIZE,
): Promise<ReviewsResponse> {
  const userId = await getAuthenticatedUserId();

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where: { event_id: eventId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        likes: {
          select: {
            id: true,
            user_id: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.review.count({ where: { event_id: eventId } }),
  ]);

  return {
    data: reviews.map((review) => mapReview(review, userId ?? undefined)),
    total,
    page,
    total_pages: Math.ceil(total / limit),
  };
}

export async function createProductReview(data: {
  productId: number;
  rating: number;
  review?: string;
  imageUrls?: string[];
}): Promise<{ success: boolean; error?: string }> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
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
        success: false,
        error: "You have already reviewed this product",
      };
    }

    await prisma.review.create({
      data: {
        user_id: userId,
        product_id: data.productId,
        rating: data.rating,
        review: data.review?.trim() || null,
        image_urls: data.imageUrls ?? [],
      },
    });

    revalidatePath(`/products/${data.productId}`);
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    console.error("Failed to create review:", error);
    return { success: false, error: "Failed to create review" };
  }
}

export async function createEventReview(data: {
  eventId: string;
  rating: number;
  review?: string;
  imageUrls?: string[];
}): Promise<{ success: boolean; error?: string }> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
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
        success: false,
        error: "You have already reviewed this event",
      };
    }

    await prisma.review.create({
      data: {
        user_id: userId,
        event_id: data.eventId,
        rating: data.rating,
        review: data.review?.trim() || null,
        image_urls: data.imageUrls ?? [],
      },
    });

    revalidatePath(`/events/past/${data.eventId}`);
    revalidatePath("/events/past");

    return { success: true };
  } catch (error) {
    console.error("Failed to create review:", error);
    return { success: false, error: "Failed to create review" };
  }
}

export async function deleteReview(
  reviewId: number,
): Promise<{ success: boolean; error?: string }> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
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

    return { success: true };
  } catch (error) {
    console.error("Failed to delete review:", error);
    return { success: false, error: "Failed to delete review" };
  }
}

export async function toggleReviewLike(reviewId: number): Promise<{
  success: boolean;
  action?: "liked" | "unliked";
  likesCount?: number;
  error?: string;
}> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
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
      success: true,
      action: existing ? "unliked" : "liked",
      likesCount,
    };
  } catch (error) {
    console.error("Failed to toggle like:", error);
    return { success: false, error: "Failed to toggle like" };
  }
}
