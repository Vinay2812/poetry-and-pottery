"use client";

import { OrderStatus, type OrderWithDetails } from "@/types";
import { Package, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

import { OrderProgress } from "@/components/orders";
import { StatusIcon } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

// Helper functions for order formatting
function formatOrderDate(dateString: Date | string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getStatusLabel(status: OrderStatus | null): string {
  return status?.toString() || "Processing";
}

interface ReviewFormProps {
  productId: number;
  productName: string;
  onSubmit: () => void;
  onCancel: () => void;
}

function ReviewForm({
  productId,
  productName,
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

      if (!content.trim()) return;

      setIsSubmitting(true);

      // TODO: Implement server action to submit review
      console.log("Submitting review:", { productId, rating, content });

      setTimeout(() => {
        onSubmit();
        setIsSubmitting(false);
      }, 500);
    },
    [content, rating, productId, onSubmit],
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
  item: OrderWithDetails["ordered_products"][number];
  canReview: boolean;
}

function OrderItemCard({ item, canReview }: OrderItemCardProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewed, setReviewed] = useState(false);

  const product = item.product;
  const productImage = product?.image_urls?.[0] || "/placeholder.jpg";
  const productName = product?.name || "Product";
  const productSlug = product?.slug || String(item.product_id);

  const handleReviewSubmit = useCallback(() => {
    setReviewed(true);
    setShowReviewForm(false);
  }, []);

  return (
    <div className="shadow-soft rounded-2xl bg-white p-4">
      <div className="flex gap-4">
        <Link href={`/products/${productSlug}`}>
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl transition-transform hover:scale-105">
            <Image
              src={productImage}
              alt={productName}
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </div>
        </Link>

        <div className="min-w-0 flex-1">
          <Link href={`/products/${productSlug}`}>
            <h3 className="hover:text-primary text-sm font-medium transition-colors">
              {productName}
            </h3>
          </Link>
          {product?.color_name && (
            <p className="text-muted-foreground text-xs">
              {product.color_name}
            </p>
          )}
          <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
          <p className="text-primary mt-1 text-sm font-bold">
            ₹{(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>

      {canReview && !reviewed && !showReviewForm && (
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

      {reviewed && (
        <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
          <Star className="h-4 w-4 fill-green-600" />
          Thank you for your review!
        </div>
      )}

      {showReviewForm && (
        <ReviewForm
          productId={item.product_id}
          productName={productName}
          onSubmit={handleReviewSubmit}
          onCancel={() => setShowReviewForm(false)}
        />
      )}
    </div>
  );
}

interface OrderDetailClientProps {
  order: OrderWithDetails | null;
}

export function OrderDetailClient({ order }: OrderDetailClientProps) {
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

  const canReview = order.status === OrderStatus.DELIVERED;
  const items = order.ordered_products;

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Left Sidebar - Order Details (Desktop) */}
      <div className="hidden lg:block">
        <div className="shadow-soft sticky top-24 space-y-6 rounded-2xl bg-white p-6">
          {/* Status Badge */}
          <div
            className={cn(
              "flex items-center gap-2 rounded-xl p-3",
              order.status === OrderStatus.DELIVERED && "bg-green-50",
              order.status === OrderStatus.SHIPPED && "bg-blue-50",
              order.status === OrderStatus.PROCESSING && "bg-yellow-50",
            )}
          >
            <StatusIcon status={order.status} className="h-5 w-5" />
            <span
              className={cn(
                "font-medium",
                order.status === OrderStatus.DELIVERED && "text-green-700",
                order.status === OrderStatus.SHIPPED && "text-blue-700",
                order.status === OrderStatus.PROCESSING && "text-yellow-700",
              )}
            >
              {getStatusLabel(order.status as OrderStatus)}
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
              <span>{formatOrderDate(order.created_at)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Items</span>
              <span>{items.length}</span>
            </div>
          </div>

          <div className="border-border border-t" />

          {/* Order Progress */}
          <OrderProgress
            status={order.status || OrderStatus.PROCESSING}
            createdAt={order.created_at}
            shippedAt={order.shipped_at}
            deliveredAt={order.delivered_at}
          />

          <div className="border-border border-t" />

          {/* Order Summary */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span
                className={cn(
                  "font-medium",
                  order.shipping_fee === 0 && "text-green-600",
                )}
              >
                {order.shipping_fee === 0
                  ? "Free"
                  : `₹${order.shipping_fee.toFixed(2)}`}
              </span>
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
            {items.slice(0, 2).map((item) => (
              <div
                key={item.id}
                className={cn(
                  "relative aspect-square overflow-hidden",
                  items.length === 1 ? "w-full" : "w-1/2",
                )}
              >
                <Image
                  src={item.product?.image_urls?.[0] || "/placeholder.jpg"}
                  alt={item.product?.name || "Product"}
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
                order.status === OrderStatus.DELIVERED && "bg-green-600",
                order.status === OrderStatus.SHIPPED && "bg-blue-600",
                order.status === OrderStatus.PROCESSING && "bg-yellow-600",
              )}
            >
              <StatusIcon
                status={order.status}
                className="h-4 w-4 text-white"
              />
              {getStatusLabel(order.status as OrderStatus)}
            </div>
          </div>
        </div>

        {/* Order Title - Mobile Only */}
        <div className="mb-4 lg:hidden">
          <h2 className="text-lg font-bold">Order {order.id}</h2>
          <p className="text-muted-foreground text-sm">
            Ordered on {formatOrderDate(order.created_at)}
          </p>
        </div>

        {/* Order Progress - Mobile Only */}
        <div className="mb-6 lg:hidden">
          <OrderProgress
            status={order.status || OrderStatus.PROCESSING}
            createdAt={order.created_at}
            shippedAt={order.shipped_at}
            deliveredAt={order.delivered_at}
          />
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="mb-4 text-sm font-semibold lg:text-lg">
            Items ({items.length})
          </h3>
          <div className="space-y-4">
            {items.map((item) => (
              <OrderItemCard key={item.id} item={item} canReview={canReview} />
            ))}
          </div>
        </div>

        {/* Order Summary - Mobile Only */}
        <div className="shadow-soft mb-6 rounded-2xl bg-white p-4 lg:hidden">
          <h3 className="mb-4 text-sm font-semibold">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span
                className={cn(
                  "font-medium",
                  order.shipping_fee === 0 && "text-green-600",
                )}
              >
                {order.shipping_fee === 0
                  ? "Free"
                  : `₹${order.shipping_fee.toFixed(2)}`}
              </span>
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
