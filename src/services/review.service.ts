import type { Review, ReviewWithDetails, ReviewWithUser } from "@/types";

import { prisma } from "@/lib/prisma";

export class ReviewService {
  /**
   * Get reviews for a product
   */
  static async getProductReviews(
    productId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: ReviewWithUser[]; total: number }> {
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
    };
  }

  /**
   * Get reviews for an event
   */
  static async getEventReviews(
    eventId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: ReviewWithUser[]; total: number }> {
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
    };
  }

  /**
   * Create a product review
   */
  static async createProductReview(data: {
    userId: number;
    productId: number;
    rating: number;
    review: string;
    imageUrls?: string[];
  }): Promise<ReviewWithUser> {
    return prisma.review.create({
      data: {
        user_id: data.userId,
        product_id: data.productId,
        rating: data.rating,
        review: data.review,
        image_urls: data.imageUrls ?? [],
      },
      include: {
        user: true,
        likes: true,
      },
    }) as Promise<ReviewWithUser>;
  }

  /**
   * Create an event review
   */
  static async createEventReview(data: {
    userId: number;
    eventId: string;
    rating: number;
    review: string;
    imageUrls?: string[];
  }): Promise<ReviewWithUser> {
    return prisma.review.create({
      data: {
        user_id: data.userId,
        event_id: data.eventId,
        rating: data.rating,
        review: data.review,
        image_urls: data.imageUrls ?? [],
      },
      include: {
        user: true,
        likes: true,
      },
    }) as Promise<ReviewWithUser>;
  }

  /**
   * Update a review
   */
  static async updateReview(
    reviewId: number,
    userId: number,
    data: {
      rating?: number;
      review?: string;
      imageUrls?: string[];
    },
  ): Promise<ReviewWithUser> {
    return prisma.review.update({
      where: {
        id: reviewId,
        user_id: userId, // Security check
      },
      data: {
        rating: data.rating,
        review: data.review,
        image_urls: data.imageUrls,
      },
      include: {
        user: true,
        likes: true,
      },
    }) as Promise<ReviewWithUser>;
  }

  /**
   * Delete a review
   */
  static async deleteReview(reviewId: number, userId: number): Promise<void> {
    await prisma.review.delete({
      where: {
        id: reviewId,
        user_id: userId, // Security check
      },
    });
  }

  /**
   * Toggle like on a review
   */
  static async toggleLike(
    reviewId: number,
    userId: number,
  ): Promise<{ action: "liked" | "unliked"; likesCount: number }> {
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
      action: existing ? "unliked" : "liked",
      likesCount,
    };
  }

  /**
   * Check if user has reviewed a product
   */
  static async hasUserReviewedProduct(
    userId: number,
    productId: number,
  ): Promise<boolean> {
    const review = await prisma.review.findUnique({
      where: {
        product_id_user_id: {
          product_id: productId,
          user_id: userId,
        },
      },
    });
    return !!review;
  }

  /**
   * Check if user has reviewed an event
   */
  static async hasUserReviewedEvent(
    userId: number,
    eventId: string,
  ): Promise<boolean> {
    const review = await prisma.review.findUnique({
      where: {
        event_id_user_id: {
          event_id: eventId,
          user_id: userId,
        },
      },
    });
    return !!review;
  }

  /**
   * Get user's review for a product
   */
  static async getUserProductReview(
    userId: number,
    productId: number,
  ): Promise<ReviewWithUser | null> {
    return prisma.review.findUnique({
      where: {
        product_id_user_id: {
          product_id: productId,
          user_id: userId,
        },
      },
      include: {
        user: true,
        likes: true,
      },
    }) as Promise<ReviewWithUser | null>;
  }

  /**
   * Get average rating for a product
   */
  static async getProductAverageRating(
    productId: number,
  ): Promise<{ average: number; count: number }> {
    const result = await prisma.review.aggregate({
      where: { product_id: productId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    return {
      average: result._avg.rating ?? 0,
      count: result._count.rating,
    };
  }

  /**
   * Get average rating for an event
   */
  static async getEventAverageRating(
    eventId: string,
  ): Promise<{ average: number; count: number }> {
    const result = await prisma.review.aggregate({
      where: { event_id: eventId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    return {
      average: result._avg.rating ?? 0,
      count: result._count.rating,
    };
  }

  /**
   * Get recent reviews (for admin/homepage)
   */
  static async getRecentReviews(
    limit: number = 10,
  ): Promise<ReviewWithDetails[]> {
    return prisma.review.findMany({
      include: {
        user: true,
        likes: true,
        product: true,
        event: true,
      },
      orderBy: { created_at: "desc" },
      take: limit,
    }) as Promise<ReviewWithDetails[]>;
  }
}
