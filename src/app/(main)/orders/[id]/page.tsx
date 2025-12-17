"use client";

import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Package, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { MobileHeader } from "@/components/layout";
import { OrderProgress } from "@/components/order-progress";
import { ReviewCard } from "@/components/review-card";
import { StatusIcon } from "@/components/status-icon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import type { Review } from "@/lib/constants";
import {
  type OrderItem,
  formatOrderDate,
  getOrderById,
  getStatusLabel,
  markItemReviewed,
  seedOrdersForUserIfEmpty,
} from "@/lib/orders";
import {
  addProductReview,
  formatReviewDate,
  generateReviewId,
  getProductReviews,
} from "@/lib/product-reviews";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  itemId: string;
  productId: string;
  productName: string;
  userId: string;
  userFirstName: string | null;
  userLastName: string | null;
  userImageUrl: string;
  onSubmit: (itemId: string, review: Review) => void;
  onCancel: () => void;
}

function ReviewForm({
  itemId,
  productId,
  productName,
  userId,
  userFirstName,
  userLastName,
  userImageUrl,
  onSubmit,
  onCancel,
}: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!userId || !content.trim()) return;

      setIsSubmitting(true);

      const review: Review = {
        id: generateReviewId(),
        author:
          `${userFirstName ?? ""} ${userLastName ?? ""}`.trim() || "Anonymous",
        avatar:
          userImageUrl ||
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        rating,
        content: content.trim(),
        date: formatReviewDate(new Date()),
        likes: 0,
      };

      addProductReview(productId, review);
      onSubmit(itemId, review);
    },
    [
      userId,
      userFirstName,
      userLastName,
      userImageUrl,
      content,
      rating,
      productId,
      itemId,
      onSubmit,
    ],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-primary/5 border-primary/10 mt-4 rounded-xl border p-4"
    >
      <p className="mb-4 text-sm font-semibold">Review {productName}</p>

      <div className="mb-4">
        <p className="text-muted-foreground mb-2 text-xs font-medium">Rating</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110 focus:outline-none"
            >
              <Star
                className={cn(
                  "h-7 w-7 transition-colors",
                  (hoveredRating || rating) >= star
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-neutral-300",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="review-content"
          className="text-muted-foreground mb-2 block text-xs font-medium"
        >
          Your review
        </label>
        <Textarea
          id="review-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your experience with this product..."
          className="h-24 resize-none rounded-xl text-sm"
          required
        />
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-full"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={isSubmitting || !content.trim()}
          className="rounded-full"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </div>
    </form>
  );
}

interface OrderItemCardProps {
  item: OrderItem;
  canReview: boolean;
  userId: string;
  userFirstName: string | null;
  userLastName: string | null;
  userImageUrl: string;
  onReviewSubmit: (itemId: string, review: Review) => void;
}

function OrderItemCard({
  item,
  canReview,
  userId,
  userFirstName,
  userLastName,
  userImageUrl,
  onReviewSubmit,
}: OrderItemCardProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [submittedReview, setSubmittedReview] = useState<Review | null>(null);

  // Load existing review if item was already reviewed
  const existingReview = useMemo(() => {
    if (!item.reviewed || typeof window === "undefined") return null;

    const reviews = getProductReviews(item.productId);
    const userName =
      `${userFirstName ?? ""} ${userLastName ?? ""}`.trim() || "Anonymous";

    // Find the user's review by matching author name
    return reviews.find((r) => r.author === userName) ?? null;
  }, [item.reviewed, item.productId, userFirstName, userLastName]);

  // Use submitted review (current session) or existing review (from localStorage)
  const displayReview = submittedReview ?? existingReview;

  const handleReviewSubmit = useCallback(
    (itemId: string, review: Review) => {
      setSubmittedReview(review);
      onReviewSubmit(itemId, review);
      setShowReviewForm(false);
    },
    [onReviewSubmit],
  );

  return (
    <div className="shadow-soft rounded-2xl bg-white p-4">
      <div className="flex gap-4">
        <Link href={`/products/${item.productId}`}>
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl transition-transform hover:scale-105">
            <Image
              src={item.productImage}
              alt={item.productName}
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </div>
        </Link>

        <div className="min-w-0 flex-1">
          <Link href={`/products/${item.productId}`}>
            <h3 className="hover:text-primary text-sm font-medium transition-colors">
              {item.productName}
            </h3>
          </Link>
          {item.glazeOption && (
            <p className="text-muted-foreground text-xs">{item.glazeOption}</p>
          )}
          <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
          <p className="text-primary mt-1 text-sm font-bold">
            ₹{(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>

      {canReview && !item.reviewed && !showReviewForm && !displayReview && (
        <Button
          variant="outline"
          size="sm"
          className="mt-4 w-full rounded-full"
          onClick={() => setShowReviewForm(true)}
        >
          <Star className="mr-2 h-4 w-4" />
          Leave a Review
        </Button>
      )}

      {displayReview && (
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium">Your Review</p>
          <ReviewCard
            author={displayReview.author}
            avatar={displayReview.avatar}
            rating={displayReview.rating}
            content={displayReview.content}
            date={displayReview.date}
            likes={displayReview.likes}
            images={displayReview.images}
          />
        </div>
      )}

      {showReviewForm && (
        <ReviewForm
          itemId={item.id}
          productId={item.productId}
          productName={item.productName}
          userId={userId}
          userFirstName={userFirstName}
          userLastName={userLastName}
          userImageUrl={userImageUrl}
          onSubmit={handleReviewSubmit}
          onCancel={() => setShowReviewForm(false)}
        />
      )}
    </div>
  );
}

function OrderDetail() {
  const params = useParams();
  const { user } = useUser();
  const [reviewedItems, setReviewedItems] = useState<Set<string>>(new Set());

  const userId = user?.id;
  const orderId = params.id as string | undefined;

  const order = useMemo(() => {
    if (!userId || !orderId || typeof window === "undefined") return null;
    seedOrdersForUserIfEmpty(userId);
    return getOrderById(userId, orderId);
  }, [userId, orderId]);

  const handleReviewSubmit = useCallback(
    (itemId: string) => {
      if (!userId || !order) return;

      markItemReviewed(userId, order.id, itemId);
      setReviewedItems((prev) => new Set([...prev, itemId]));
    },
    [userId, order],
  );

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
        <p className="text-muted-foreground mt-4 text-sm">Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-primary/10 mb-4 flex h-20 w-20 items-center justify-center rounded-full">
          <Package className="text-primary h-10 w-10" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Order not found</h2>
        <p className="text-muted-foreground mb-6 max-w-sm text-sm">
          We couldn&apos;t find this order. It may have been removed or you may
          not have access to it.
        </p>
        <Link href="/orders">
          <Button className="rounded-full px-6">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const canReview = order.status === "delivered";

  const getItemReviewed = (item: OrderItem) =>
    item.reviewed || reviewedItems.has(item.id);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Left Sidebar - Order Details (Desktop) */}
      <div className="hidden lg:block">
        <div className="shadow-soft sticky top-24 space-y-6 rounded-2xl bg-white p-6">
          {/* Status Badge */}
          <div
            className={cn(
              "flex items-center gap-2 rounded-xl p-3",
              order.status === "delivered" && "bg-green-50",
              order.status === "shipped" && "bg-blue-50",
              order.status === "processing" && "bg-yellow-50",
            )}
          >
            <StatusIcon status={order.status} className="h-5 w-5" />
            <span
              className={cn(
                "font-medium",
                order.status === "delivered" && "text-green-700",
                order.status === "shipped" && "text-blue-700",
                order.status === "processing" && "text-yellow-700",
              )}
            >
              {getStatusLabel(order.status)}
            </span>
          </div>

          {/* Order Info */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Order ID</span>
              <span className="text-xs font-medium">{order.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ordered On</span>
              <span>{formatOrderDate(order.createdAt)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Items</span>
              <span>{order.items.length}</span>
            </div>
          </div>

          <div className="border-border border-t" />

          {/* Order Progress */}
          <OrderProgress
            status={order.status}
            createdAt={order.createdAt}
            shippedAt={order.shippedAt}
            deliveredAt={order.deliveredAt}
          />

          <div className="border-border border-t" />

          {/* Order Summary */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">₹{order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="border-border flex justify-between border-t pt-3">
              <span className="font-semibold">Total</span>
              <span className="text-primary text-xl font-bold">
                ₹{order.total.toFixed(2)}
              </span>
            </div>
          </div>

          {canReview && (
            <>
              <div className="border-border border-t" />
              <div className="bg-primary/10 rounded-xl p-3 text-center">
                <p className="text-primary text-sm font-medium">
                  Leave reviews for your items!
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Content - Items (Desktop) / Full Content (Mobile) */}
      <div className="lg:col-span-2">
        {/* Product Images Hero - Mobile Only */}
        <div className="relative mb-6 lg:hidden">
          <div className="flex gap-2 overflow-hidden rounded-2xl">
            {order.items.slice(0, 2).map((item) => (
              <div
                key={item.id}
                className={cn(
                  "relative aspect-square overflow-hidden",
                  order.items.length === 1 ? "w-full" : "w-1/2",
                )}
              >
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          {/* Status Badge Overlay */}
          <div className="absolute right-3 bottom-3">
            <div
              className={cn(
                "flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-white",
                order.status === "delivered" && "bg-green-600",
                order.status === "shipped" && "bg-blue-600",
                order.status === "processing" && "bg-yellow-600",
              )}
            >
              <StatusIcon
                status={order.status}
                className="h-4 w-4 text-white"
              />
              {getStatusLabel(order.status)}
            </div>
          </div>
        </div>

        {/* Order Title - Mobile Only */}
        <div className="mb-4 lg:hidden">
          <h2 className="text-lg font-bold">Order {order.id}</h2>
          <p className="text-muted-foreground text-sm">
            Ordered on {formatOrderDate(order.createdAt)}
          </p>
        </div>

        {/* Order Progress - Mobile Only */}
        <div className="mb-6 lg:hidden">
          <OrderProgress
            status={order.status}
            createdAt={order.createdAt}
            shippedAt={order.shippedAt}
            deliveredAt={order.deliveredAt}
          />
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="mb-4 text-sm font-semibold lg:text-lg">
            Items ({order.items.length})
          </h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <OrderItemCard
                key={item.id}
                item={{ ...item, reviewed: getItemReviewed(item) }}
                canReview={canReview}
                userId={user.id}
                userFirstName={user.firstName}
                userLastName={user.lastName}
                userImageUrl={user.imageUrl || ""}
                onReviewSubmit={handleReviewSubmit}
              />
            ))}
          </div>
        </div>

        {/* Order Summary - Mobile Only */}
        <div className="shadow-soft mb-6 rounded-2xl bg-white p-4 lg:hidden">
          <h3 className="mb-4 text-sm font-semibold">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">₹{order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="border-border flex justify-between border-t pt-3">
              <span className="font-semibold">Total</span>
              <span className="text-primary text-lg font-bold">
                ₹{order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {canReview && (
          <div className="bg-primary/10 rounded-2xl p-4 text-center lg:hidden">
            <p className="text-primary text-sm font-medium">
              Your order has been delivered! Leave reviews for your items.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function SignedOutCTA() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-primary/10 mb-4 flex h-20 w-20 items-center justify-center rounded-full">
        <Package className="text-primary h-10 w-10" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">Sign in to view this order</h2>
      <p className="text-muted-foreground mb-6 max-w-sm text-sm">
        Sign in to your account to view order details and leave reviews.
      </p>
      <SignInButton mode="modal">
        <Button className="rounded-full px-6">Sign In</Button>
      </SignInButton>
    </div>
  );
}

export default function OrderDetailPage() {
  return (
    <>
      <MobileHeader title="Order Details" showBack backHref="/orders" />

      <main className="pt-14 pb-24 lg:pt-0 lg:pb-12">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          <h1 className="mb-6 hidden text-2xl font-bold lg:block">
            Order Details
          </h1>

          <SignedIn>
            <OrderDetail />
          </SignedIn>

          <SignedOut>
            <SignedOutCTA />
          </SignedOut>
        </div>
      </main>
    </>
  );
}
