import { REVIEWS, type Review } from "./constants";

const STORAGE_KEY = "poetry-pottery-user-reviews";

interface StoredReviews {
  [productId: string]: Review[];
}

function getStoredReviews(): StoredReviews {
  if (typeof window === "undefined") return {};

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return {};
  }

  try {
    return JSON.parse(stored) as StoredReviews;
  } catch {
    return {};
  }
}

function saveStoredReviews(reviews: StoredReviews): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

export function getProductReviews(productId: string): Review[] {
  const storedReviews = getStoredReviews();
  const userReviews = storedReviews[productId] ?? [];

  // Merge base REVIEWS with user-submitted reviews
  // User reviews appear first (most recent)
  return [...userReviews, ...REVIEWS];
}

export function addProductReview(productId: string, review: Review): Review[] {
  const storedReviews = getStoredReviews();

  if (!storedReviews[productId]) {
    storedReviews[productId] = [];
  }

  storedReviews[productId].unshift(review);
  saveStoredReviews(storedReviews);

  return getProductReviews(productId);
}

export function generateReviewId(): string {
  return `review-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`;
}

export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}

export function formatReviewDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 14) {
    return "1 week ago";
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)} weeks ago`;
  } else if (diffDays < 60) {
    return "1 month ago";
  } else {
    return `${Math.floor(diffDays / 30)} months ago`;
  }
}
