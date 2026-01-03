"use client";

import type { ProductDetail as ProductDetailType } from "@/data/products/types";
import { RecommendedProductsContainer } from "@/features/recommended-products";
import { motion } from "framer-motion";
import { Check, Heart, Loader2, Share2, ShoppingCartIcon } from "lucide-react";

import { ReviewCard } from "@/components/cards";
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

import type { FormattedReview, ProductDetailProps } from "../types";

interface ProductInfoHeaderProps {
  product: ProductDetailType;
  selectedColor: string;
}

function ProductInfoHeader({ product, selectedColor }: ProductInfoHeaderProps) {
  const category = product.categories[0] || product.material || "Pottery";

  return (
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
        {product.reviews_count > 0 && (
          <div className="flex items-center gap-2">
            <Rating
              rating={product.avg_rating}
              reviewCount={product.reviews_count}
              size="sm"
            />
          </div>
        )}
      </div>
    </div>
  );
}

interface StockStatusProps {
  isOutOfStock: boolean;
  isLowStock: boolean;
  availableQuantity: number;
}

function StockStatus({
  isOutOfStock,
  isLowStock,
  availableQuantity,
}: StockStatusProps) {
  if (isOutOfStock) {
    return (
      <div className="mb-4">
        <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-wider text-red-500 uppercase">
          <span className="h-1 w-1 rounded-full bg-red-500"></span>
          Sold Out
        </span>
      </div>
    );
  }

  if (isLowStock) {
    return (
      <div className="mb-4">
        <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-wider text-amber-600 uppercase">
          <span className="h-1 w-1 rounded-full bg-amber-600"></span>
          Only {availableQuantity} left
        </span>
      </div>
    );
  }

  return null;
}

interface ColorSelectorProps {
  colorName: string;
  colorCode: string;
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

function ColorSelector({
  colorName,
  colorCode,
  selectedColor,
  onColorSelect,
}: ColorSelectorProps) {
  return (
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
          onClick={() => onColorSelect(colorName)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 transition-all",
          )}
          style={{
            backgroundColor: colorCode,
            outline:
              selectedColor === colorName ? `2px solid ${colorCode}` : "none",
            outlineOffset: "2px",
          }}
          title={colorName}
        />
      </div>
    </div>
  );
}

interface ReviewsPreviewProps {
  reviews: FormattedReview[];
  averageRating: number;
  totalReviews: number;
  currentUserId?: number | null;
  onReviewLike: (reviewId: string, likes: number, isLiked: boolean) => void;
  onLikeUpdate: (reviewId: string, likes: number, isLiked: boolean) => void;
}

function ReviewsPreview({
  reviews,
  averageRating,
  totalReviews,
  currentUserId,
  onReviewLike,
  onLikeUpdate,
}: ReviewsPreviewProps) {
  if (reviews.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">Recent Reviews</h3>
        <ReviewsSheet
          reviews={reviews}
          averageRating={averageRating}
          totalReviews={totalReviews}
          currentUserId={currentUserId}
          onLikeUpdate={onLikeUpdate}
        >
          <button className="text-primary text-sm hover:underline">
            View All &rarr;
          </button>
        </ReviewsSheet>
      </div>
      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
        {reviews.slice(0, 2).map((review) => (
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
              currentUserId != null && review.authorId === currentUserId
            }
            images={review.images}
            isCompact
            onLike={() =>
              onReviewLike(review.id, review.likes, review.isLikedByCurrentUser)
            }
          />
        ))}
      </div>
    </div>
  );
}

interface MaterialsAccordionProps {
  material: string | null;
  instructions: string[];
}

function MaterialsAccordion({
  material,
  instructions,
}: MaterialsAccordionProps) {
  return (
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
            <li>Made from high-quality {material}</li>
            {instructions.length > 0 ? (
              instructions.map((instruction, index) => (
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
  );
}

interface ActionButtonsProps {
  isOutOfStock: boolean;
  atMaxQuantity: boolean;
  addedToCart: boolean;
  inWishlist: boolean;
  cartLoading: boolean;
  wishlistLoading: boolean;
  onShare: () => void;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  className?: string;
}

function ActionButtons({
  isOutOfStock,
  atMaxQuantity,
  addedToCart,
  inWishlist,
  cartLoading,
  wishlistLoading,
  onShare,
  onAddToCart,
  onToggleWishlist,
  className,
}: ActionButtonsProps) {
  const isDisabled = isOutOfStock || atMaxQuantity;
  return (
    <div className={cn("flex gap-3", className)}>
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 shrink-0 rounded-xl transition-colors"
          onClick={onShare}
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
          onClick={onToggleWishlist}
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
          size="lg"
          disabled={isDisabled || cartLoading}
          onClick={onAddToCart}
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
          {isOutOfStock
            ? "Out of Stock"
            : atMaxQuantity
              ? "Max in Cart"
              : addedToCart
                ? "Added!"
                : "Add to Cart"}
        </Button>
      </motion.div>
    </div>
  );
}

export function ProductDetail({
  product,
  formattedReviews,
  selectedColor,
  addedToCart,
  inWishlist,
  cartLoading,
  wishlistLoading,
  atMaxQuantity,
  currentUserId,
  onColorSelect,
  onShare,
  onAddToCart,
  onToggleWishlist,
  onReviewLike,
  onLikeUpdate,
}: ProductDetailProps) {
  const availableQuantity = product.available_quantity ?? 0;
  const isOutOfStock = availableQuantity === 0;
  const isLowStock = availableQuantity > 0 && availableQuantity <= 5;

  return (
    <>
      <main className="pt-14 pb-40 lg:pt-20 lg:pb-0">
        <div className="container mx-auto px-0 py-0 lg:px-8 lg:py-12">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-10">
            {/* Image Gallery */}
            <div className="min-w-0 overflow-hidden">
              <ProductImageGallery
                images={product.image_urls}
                productName={product.name}
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col px-4 pt-6 lg:px-0 lg:pt-0">
              <ProductInfoHeader
                product={product}
                selectedColor={selectedColor}
              />

              <StockStatus
                isOutOfStock={isOutOfStock}
                isLowStock={isLowStock}
                availableQuantity={availableQuantity}
              />

              {/* Description */}
              <div className="mb-6">
                <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {product.description}
                </p>
              </div>

              {/* Color Display */}
              {product.color_name && product.color_code && (
                <ColorSelector
                  colorName={product.color_name}
                  colorCode={product.color_code}
                  selectedColor={selectedColor}
                  onColorSelect={onColorSelect}
                />
              )}

              {/* Reviews Preview */}
              <ReviewsPreview
                reviews={formattedReviews}
                averageRating={product.avg_rating}
                totalReviews={product.reviews_count}
                currentUserId={currentUserId}
                onReviewLike={onReviewLike}
                onLikeUpdate={onLikeUpdate}
              />

              {/* Accordion sections */}
              <MaterialsAccordion
                material={product.material}
                instructions={product.instructions}
              />

              {/* Desktop Add to Cart */}
              <ActionButtons
                isOutOfStock={isOutOfStock}
                atMaxQuantity={atMaxQuantity}
                addedToCart={addedToCart}
                inWishlist={inWishlist}
                cartLoading={cartLoading}
                wishlistLoading={wishlistLoading}
                onShare={onShare}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                className="hidden lg:flex"
              />
            </div>
          </div>

          {/* Recommended Products */}
          <RecommendedProductsContainer
            productId={product.id}
            title="You might also like"
            className="mt-12 border-t border-neutral-100 px-4 pt-10 lg:mt-20 lg:px-0 lg:pt-16 dark:border-neutral-800"
          />
        </div>
      </main>

      {/* Mobile Fixed Bottom CTA */}
      <div className="border-border fixed right-0 bottom-16 left-0 z-40 border-t bg-white/95 p-4 backdrop-blur-md lg:hidden">
        <ActionButtons
          isOutOfStock={isOutOfStock}
          atMaxQuantity={atMaxQuantity}
          addedToCart={addedToCart}
          inWishlist={inWishlist}
          cartLoading={cartLoading}
          wishlistLoading={wishlistLoading}
          onShare={onShare}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
        />
      </div>
    </>
  );
}
