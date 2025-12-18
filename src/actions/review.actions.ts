"use server";

import { ReviewService } from "@/services/review.service";
import { UserService } from "@/services/user.service";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function getCurrentUserId(): Promise<number | null> {
  const { userId: authId } = await auth();
  if (!authId) return null;

  const user = await UserService.getUserByAuthId(authId);
  return user?.id ?? null;
}

export async function getProductReviews(
  productId: number,
  page?: number,
  limit?: number,
) {
  return ReviewService.getProductReviews(productId, page, limit);
}

export async function getEventReviews(
  eventId: string,
  page?: number,
  limit?: number,
) {
  return ReviewService.getEventReviews(eventId, page, limit);
}

export async function createProductReview(data: {
  productId: number;
  rating: number;
  review: string;
  imageUrls?: string[];
}) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    // Check if user already reviewed this product
    const hasReviewed = await ReviewService.hasUserReviewedProduct(
      userId,
      data.productId,
    );
    if (hasReviewed) {
      return {
        success: false,
        error: "You have already reviewed this product",
      };
    }

    const review = await ReviewService.createProductReview({
      userId,
      productId: data.productId,
      rating: data.rating,
      review: data.review,
      imageUrls: data.imageUrls,
    });

    revalidatePath(`/products/${data.productId}`);
    revalidatePath("/products");

    return { success: true, data: review };
  } catch (error) {
    console.error("Failed to create review:", error);
    return { success: false, error: "Failed to create review" };
  }
}

export async function createEventReview(data: {
  eventId: string;
  rating: number;
  review: string;
  imageUrls?: string[];
}) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    // Check if user already reviewed this event
    const hasReviewed = await ReviewService.hasUserReviewedEvent(
      userId,
      data.eventId,
    );
    if (hasReviewed) {
      return { success: false, error: "You have already reviewed this event" };
    }

    const review = await ReviewService.createEventReview({
      userId,
      eventId: data.eventId,
      rating: data.rating,
      review: data.review,
      imageUrls: data.imageUrls,
    });

    revalidatePath(`/events/past/${data.eventId}`);
    revalidatePath("/events/past");

    return { success: true, data: review };
  } catch (error) {
    console.error("Failed to create review:", error);
    return { success: false, error: "Failed to create review" };
  }
}

export async function updateReview(
  reviewId: number,
  data: {
    rating?: number;
    review?: string;
    imageUrls?: string[];
  },
) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const review = await ReviewService.updateReview(reviewId, userId, data);
    revalidatePath("/products");
    revalidatePath("/events");

    return { success: true, data: review };
  } catch (error) {
    console.error("Failed to update review:", error);
    return { success: false, error: "Failed to update review" };
  }
}

export async function deleteReview(reviewId: number) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    await ReviewService.deleteReview(reviewId, userId);
    revalidatePath("/products");
    revalidatePath("/events");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete review:", error);
    return { success: false, error: "Failed to delete review" };
  }
}

export async function toggleReviewLike(reviewId: number) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const result = await ReviewService.toggleLike(reviewId, userId);
    return { success: true, ...result };
  } catch (error) {
    console.error("Failed to toggle like:", error);
    return { success: false, error: "Failed to toggle like" };
  }
}

export async function getProductAverageRating(productId: number) {
  return ReviewService.getProductAverageRating(productId);
}

export async function getEventAverageRating(eventId: string) {
  return ReviewService.getEventAverageRating(eventId);
}

export async function getUserProductReview(productId: number) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, data: null };
  }

  const review = await ReviewService.getUserProductReview(userId, productId);
  return { success: true, data: review };
}
