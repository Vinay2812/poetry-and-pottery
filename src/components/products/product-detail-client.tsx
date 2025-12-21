"use client";

import { toggleReviewLike } from "@/actions";
import { useAuthAction, useCart, useShare, useWishlist } from "@/hooks";
import type { ProductWithCategories, ProductWithDetails } from "@/types";
import { motion } from "framer-motion";
import { Check, Heart, Loader2, Share2, ShoppingCartIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { ProductCard, ReviewCard } from "@/components/cards";
import { ProductImageGallery } from "@/components/products";
import { Rating, ReviewsSheet } from "@/components/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface ProductDetailClientProps {
  product: ProductWithDetails;
  relatedProducts: ProductWithCategories[];
  currentUserId?: number | null;
}

export function ProductDetailClient({
  product,
  relatedProducts,
  currentUserId,
}: ProductDetailClientProps) {
  const [selectedColor, setSelectedColor] = useState(product.color_name || "");
  const [addedToCart, setAddedToCart] = useState(false);
  const [reviewLikeUpdates, setReviewLikeUpdates] = useState<
    Record<string, { likes: number; isLiked: boolean }>
  >({});

  const { requireAuth } = useAuthAction();
  const { addToCart, isLoading: isCartLoading } = useCart();
  const {
    toggleWishlist,
    isInWishlist,
    isLoading: isWishlistLoading,
  } = useWishlist();

  const { share } = useShare();

  const inWishlist = isInWishlist(product.id);
  const cartLoading = isCartLoading(product.id);
  const wishlistLoading = isWishlistLoading(product.id);

  const handleShare = useCallback(() => {
    share({
      title: product.name,
      text: `Check out ${product.name} - ₹${product.price.toLocaleString()}`,
      url: window.location.href,
    });
  }, [share, product.name, product.price]);

  const handleAddToCart = useCallback(() => {
    requireAuth(async () => {
      const success = await addToCart(product.id);
      if (success) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
      }
    });
  }, [requireAuth, addToCart, product.id]);

  const handleToggleWishlist = useCallback(() => {
    requireAuth(() => toggleWishlist(product.id));
  }, [requireAuth, toggleWishlist, product.id]);

  const handleLikeUpdate = useCallback(
    (reviewId: string, likes: number, isLiked: boolean) => {
      setReviewLikeUpdates((prev) => ({
        ...prev,
        [reviewId]: { likes, isLiked },
      }));
    },
    [],
  );

  const handleReviewLike = useCallback(
    async (reviewId: string, currentLikes: number, currentIsLiked: boolean) => {
      // Optimistically update UI
      const newIsLiked = !currentIsLiked;
      const newLikes = currentIsLiked ? currentLikes - 1 : currentLikes + 1;
      handleLikeUpdate(reviewId, newLikes, newIsLiked);

      // Call server action
      const result = await toggleReviewLike(Number(reviewId));

      if (!result.success) {
        // Revert on failure
        handleLikeUpdate(reviewId, currentLikes, currentIsLiked);
      } else if (result.likesCount !== undefined) {
        // Sync with server count
        handleLikeUpdate(reviewId, result.likesCount, newIsLiked);
      }
    },
    [handleLikeUpdate],
  );

  // Calculate average rating from reviews
  const averageRating = useMemo(() => {
    if (!product.reviews || product.reviews.length === 0) return 0;
    const sum = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / product.reviews.length;
  }, [product.reviews]);

  const totalReviews = product._count?.reviews || 0;

  // Convert reviews to the format expected by ReviewCard
  const formattedReviews = useMemo(() => {
    return (product.reviews || []).map((review) => {
      const reviewId = String(review.id);
      const likeUpdate = reviewLikeUpdates[reviewId];
      const baseLikes = review.likes?.length || 0;
      const baseIsLiked = currentUserId
        ? (review.likes?.some((like) => like.user_id === currentUserId) ??
          false)
        : false;

      return {
        id: reviewId,
        authorId: review.user_id,
        author: review.user?.name || "Anonymous",
        avatar:
          review.user?.image ||
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        rating: review.rating,
        content: review.review || "",
        date: new Date(review.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        likes: likeUpdate?.likes ?? baseLikes,
        isLikedByCurrentUser: likeUpdate?.isLiked ?? baseIsLiked,
        images: review.image_urls || [],
      };
    });
  }, [product.reviews, currentUserId, reviewLikeUpdates]);

  const images = product.image_urls || [];
  const category =
    product.product_categories[0]?.category || product.material || "Pottery";

  return (
    <>
      <main className="pt-14 pb-40 lg:pt-20 lg:pb-0">
        <div className="container mx-auto px-0 py-0 lg:px-8 lg:py-12">
          <div className="grid gap-0 lg:grid-cols-2 lg:gap-10">
            {/* Image Gallery */}
            <div className="min-w-0 overflow-hidden">
              <ProductImageGallery images={images} productName={product.name} />
            </div>

            {/* Product Info */}
            <div className="flex flex-col px-4 pt-6 lg:px-0 lg:pt-0">
              <div className="mb-6 border-b border-neutral-100 pb-6 dark:border-neutral-800">
                <div className="mb-2">
                  <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
                    {category}
                  </span>
                </div>

                <h1 className="mb-3 text-2xl font-bold tracking-tight text-neutral-900 lg:text-4xl dark:text-white">
                  {product.name}
                  {selectedColor && (
                    <span className="font-medium text-neutral-400">
                      {" "}
                      — {selectedColor}
                    </span>
                  )}
                </h1>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                      Incl. Taxes
                    </span>
                  </div>
                  {totalReviews > 0 && (
                    <div className="flex items-center gap-2">
                      <Rating
                        rating={averageRating}
                        reviewCount={totalReviews}
                        size="sm"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              {product.available_quantity !== undefined &&
                product.available_quantity <= 5 &&
                product.available_quantity > 0 && (
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-wider text-amber-600 uppercase">
                      <span className="h-1 w-1 rounded-full bg-amber-600"></span>
                      Only {product.available_quantity} left
                    </span>
                  </div>
                )}

              {/* Out of Stock */}
              {product.available_quantity === 0 && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-wider text-red-500 uppercase">
                    <span className="h-1 w-1 rounded-full bg-red-500"></span>
                    Sold Out
                  </span>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {product.description}
                </p>
              </div>

              {/* Color Display */}
              {product.color_name && product.color_code && (
                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                      Color
                    </span>
                    <span className="text-[11px] font-medium text-neutral-500">
                      {selectedColor}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedColor(product.color_name)}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 transition-all",
                      )}
                      style={{
                        backgroundColor: product.color_code,
                        outline:
                          selectedColor === product.color_name
                            ? `2px solid ${product.color_code}`
                            : "none",
                        outlineOffset: "2px",
                      }}
                      title={product.color_name}
                    />
                  </div>
                </div>
              )}

              {/* Reviews Preview */}
              {formattedReviews.length > 0 && (
                <div className="mb-6">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold">Recent Reviews</h3>
                    <ReviewsSheet
                      reviews={formattedReviews}
                      averageRating={averageRating}
                      totalReviews={totalReviews}
                      currentUserId={currentUserId}
                      onLikeUpdate={handleLikeUpdate}
                    >
                      <button className="text-primary text-sm hover:underline">
                        View All &rarr;
                      </button>
                    </ReviewsSheet>
                  </div>
                  <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
                    {formattedReviews.slice(0, 2).map((review) => (
                      <ReviewCard
                        key={review.id}
                        author={review.author}
                        avatar={review.avatar}
                        rating={review.rating}
                        content={review.content}
                        date={review.date}
                        likes={review.likes}
                        isLiked={review.isLikedByCurrentUser}
                        isOwnReview={
                          currentUserId != null &&
                          review.authorId === currentUserId
                        }
                        images={review.images}
                        isCompact
                        onLike={() =>
                          requireAuth(() =>
                            handleReviewLike(
                              review.id,
                              review.likes,
                              review.isLikedByCurrentUser,
                            ),
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Accordion sections */}
              <Accordion
                type="single"
                collapsible
                className="mb-8 border-t border-neutral-100 dark:border-neutral-800"
              >
                <AccordionItem
                  value="materials"
                  className="border-b border-neutral-100 dark:border-neutral-800"
                >
                  <AccordionTrigger className="py-4 text-sm font-semibold tracking-wider uppercase hover:no-underline">
                    Materials & Care
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-4 text-xs leading-relaxed text-neutral-500">
                      <li>Made from high-quality {product.material}</li>
                      {product.instructions &&
                      product.instructions.length > 0 ? (
                        product.instructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))
                      ) : (
                        <>
                          <li>Dishwasher and microwave safe</li>
                          <li>Hand wash recommended for longevity</li>
                          <li>Avoid sudden temperature changes</li>
                        </>
                      )}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="shipping"
                  className="border-b border-neutral-100 dark:border-neutral-800"
                >
                  <AccordionTrigger className="py-4 text-sm font-semibold tracking-wider uppercase hover:no-underline">
                    Shipping & Returns
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-4 text-xs leading-relaxed text-neutral-500">
                      <li>Free shipping on orders over ₹2,000</li>
                      <li>Standard delivery 5-7 business days</li>
                      <li>Express delivery 2-3 business days</li>
                      <li>30-day return policy for unused items</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Desktop Add to Cart */}
              <div className="hidden gap-3 lg:flex">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-xl transition-colors"
                    onClick={handleShare}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "h-12 w-12 rounded-xl transition-colors",
                      inWishlist && "border-red-200 bg-red-50 hover:bg-red-100",
                    )}
                    onClick={handleToggleWishlist}
                    disabled={wishlistLoading}
                  >
                    {wishlistLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <motion.div
                        key={inWishlist ? "filled" : "empty"}
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 15,
                        }}
                      >
                        <Heart
                          className={cn(
                            "h-5 w-5",
                            inWishlist && "fill-red-500 text-red-500",
                          )}
                        />
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
                <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
                  <Button
                    className={cn(
                      "h-12 w-full rounded-xl transition-all",
                      addedToCart && "bg-green-600 hover:bg-green-700",
                    )}
                    size="lg"
                    disabled={product.available_quantity === 0 || cartLoading}
                    onClick={handleAddToCart}
                  >
                    {cartLoading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : addedToCart ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mr-2"
                      >
                        <Check className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <ShoppingCartIcon className="mr-2 h-5 w-5" />
                    )}
                    {product.available_quantity === 0
                      ? "Out of Stock"
                      : addedToCart
                        ? "Added!"
                        : "Add to Cart"}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-12 border-t border-neutral-100 px-4 pt-10 lg:mt-20 lg:px-0 lg:pt-16 dark:border-neutral-800">
              <h2 className="mb-6 text-2xl font-bold text-neutral-900 lg:mb-8 dark:text-white">
                You might also like
              </h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Mobile Fixed Bottom CTA */}
      <div className="border-border fixed right-0 bottom-16 left-0 z-40 border-t bg-white/95 p-4 backdrop-blur-md lg:hidden">
        <div className="flex gap-3">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 shrink-0 rounded-xl transition-colors"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-12 w-12 shrink-0 rounded-xl transition-colors",
                inWishlist && "border-red-200 bg-red-50 hover:bg-red-100",
              )}
              onClick={handleToggleWishlist}
              disabled={wishlistLoading}
            >
              {wishlistLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <motion.div
                  key={inWishlist ? "filled" : "empty"}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5",
                      inWishlist && "fill-red-500 text-red-500",
                    )}
                  />
                </motion.div>
              )}
            </Button>
          </motion.div>
          <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
            <Button
              className={cn(
                "h-12 w-full rounded-xl transition-all",
                addedToCart && "bg-green-600 hover:bg-green-700",
              )}
              disabled={product.available_quantity === 0 || cartLoading}
              onClick={handleAddToCart}
            >
              {cartLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : addedToCart ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mr-2"
                >
                  <Check className="h-5 w-5" />
                </motion.div>
              ) : (
                <ShoppingCartIcon className="mr-2 h-5 w-5" />
              )}
              {product.available_quantity === 0
                ? "Out of Stock"
                : addedToCart
                  ? "Added!"
                  : "Add to Cart"}
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
