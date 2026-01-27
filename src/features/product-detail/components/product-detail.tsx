"use client";

import type { ProductDetail as ProductDetailType } from "@/data/products/types";
import { RecommendedProductsContainer } from "@/features/recommended-products";
import { motion } from "framer-motion";
import { Check, Heart, Loader2, ShoppingCartIcon } from "lucide-react";
import { Suspense } from "react";

import { ReviewCard } from "@/components/cards";
import { ProductImageGallery } from "@/components/products";
import { Rating, ReviewsSheet } from "@/components/shared";
import { ProductCarouselSkeleton } from "@/components/skeletons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import type { FormattedReview, ProductDetailProps } from "../types";

// --- Sub-components ---

interface ProductInfoHeaderProps {
  product: ProductDetailType;
}

function ProductInfoHeader({ product }: ProductInfoHeaderProps) {
  const category = product.categories[0] || product.material || "Pottery";

  return (
    <div className="mb-4 md:mb-6">
      {/* Badge */}
      <Badge variant="primary" size="sm" className="mb-3">
        {category}
      </Badge>

      {/* Title */}
      <h1 className="font-display mb-2 text-xl font-bold tracking-tight text-neutral-900 md:text-2xl lg:text-3xl dark:text-white">
        {product.name}
      </h1>

      {/* Rating */}
      {product.reviews_count > 0 && (
        <div className="mb-3 flex items-center gap-2">
          <Rating
            rating={product.avg_rating}
            reviewCount={product.reviews_count}
            size="sm"
          />
        </div>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold text-neutral-900 md:text-2xl dark:text-white">
          ₹{product.price.toLocaleString()}
        </span>
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
        <span className="text-xs font-medium text-red-500">Sold Out</span>
      </div>
    );
  }

  if (isLowStock) {
    return (
      <div className="mb-4">
        <span className="text-xs font-medium text-amber-600">
          Only {availableQuantity} left in stock
        </span>
      </div>
    );
  }

  return null;
}

interface ProductSpecsProps {
  material: string;
  instructions: string[];
}

function ProductSpecs({ material }: ProductSpecsProps) {
  return (
    <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-3">
      <div>
        <span className="block text-[11px] font-medium text-neutral-400">
          Material
        </span>
        <span className="text-sm font-medium text-neutral-900 dark:text-white">
          {material || "Ceramic"}
        </span>
      </div>
    </div>
  );
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
        <span className="text-[11px] font-medium text-neutral-400">Color</span>
        <span className="text-[11px] font-medium text-neutral-500">
          {selectedColor}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onColorSelect(colorName)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 transition-all"
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
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
          Recent Reviews
        </h3>
        <ReviewsSheet
          reviews={reviews}
          averageRating={averageRating}
          totalReviews={totalReviews}
          currentUserId={currentUserId}
          onLikeUpdate={onLikeUpdate}
        >
          <button className="text-primary text-xs font-medium hover:underline">
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
      className="mb-6 border-t border-neutral-100 dark:border-neutral-800"
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
  onAddToCart,
  onToggleWishlist,
  className,
}: ActionButtonsProps) {
  const isDisabled = isOutOfStock || atMaxQuantity;
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Add to Cart */}
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

      {/* Wishlist */}
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
    </div>
  );
}

// --- Mobile Bottom CTA (Option B style: Total + Cart + Heart) ---

interface MobileBottomCTAProps {
  price: number;
  isOutOfStock: boolean;
  atMaxQuantity: boolean;
  addedToCart: boolean;
  inWishlist: boolean;
  cartLoading: boolean;
  wishlistLoading: boolean;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
}

function MobileBottomCTA({
  price,
  isOutOfStock,
  atMaxQuantity,
  addedToCart,
  inWishlist,
  cartLoading,
  wishlistLoading,
  onAddToCart,
  onToggleWishlist,
}: MobileBottomCTAProps) {
  return (
    <div className="border-border fixed right-0 bottom-16 left-0 z-40 border-t bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-3">
        {/* Price */}
        <div className="shrink-0">
          <span className="block text-[10px] font-medium text-neutral-400">
            Total
          </span>
          <span className="text-lg font-bold text-neutral-900">
            ₹{price.toLocaleString()}
          </span>
        </div>

        {/* Add to Cart */}
        <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
          <Button
            className={cn(
              "h-11 w-full rounded-xl transition-all",
              addedToCart && "bg-green-600 hover:bg-green-700",
            )}
            disabled={isOutOfStock || atMaxQuantity || cartLoading}
            onClick={onAddToCart}
          >
            {cartLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : addedToCart ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mr-2"
              >
                <Check className="h-4 w-4" />
              </motion.div>
            ) : (
              <ShoppingCartIcon className="mr-2 h-4 w-4" />
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

        {/* Wishlist */}
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-11 w-11 shrink-0 rounded-xl",
              inWishlist && "border-red-200 bg-red-50 hover:bg-red-100",
            )}
            onClick={onToggleWishlist}
            disabled={wishlistLoading}
          >
            {wishlistLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Heart
                className={cn(
                  "h-4 w-4",
                  inWishlist && "fill-red-500 text-red-500",
                )}
              />
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

// --- Trust Badges ---

function TrustBadges({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 text-xs text-neutral-500",
        className,
      )}
    >
      <span className="flex items-center gap-1.5">
        <span>🛡</span>
        <span className="hidden md:inline">100% </span>Authentic
      </span>
      <span className="flex items-center gap-1.5">
        <span>📦</span>
        Free <span className="hidden md:inline">Shipping</span>
        <span className="md:hidden">Ship</span>
      </span>
      <span className="flex items-center gap-1.5">
        <span>↩️</span>
        <span className="hidden md:inline">Easy </span>Returns
      </span>
    </div>
  );
}

// --- Main Component ---

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
      <main className="pt-14 pb-32 lg:pt-20 lg:pb-0">
        <div className="container mx-auto px-0 lg:px-6 lg:py-8">
          {/* Two-column layout on lg+ */}
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-10">
            {/* Image Gallery */}
            <div
              className="relative min-w-0 overflow-hidden lg:sticky lg:top-24 lg:self-start lg:rounded-2xl"
              style={{ viewTransitionName: `product-image-${product.id}` }}
            >
              <ProductImageGallery
                images={product.image_urls}
                productName={product.name}
              />
            </div>

            {/* Product Info - Overlapping card on mobile/tablet, side panel on lg+ */}
            <div className="relative -mt-6 rounded-t-3xl bg-white px-5 pt-6 lg:mt-0 lg:rounded-t-none lg:bg-transparent lg:px-0 lg:pt-0 dark:bg-neutral-950 lg:dark:bg-transparent">
              {/* Drag handle indicator (mobile only) */}
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-neutral-200 lg:hidden dark:bg-neutral-700" />

              <ProductInfoHeader product={product} />

              {/* Description */}
              <div className="mb-4">
                <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {product.description}
                </p>
              </div>

              {/* Specs */}
              <ProductSpecs
                material={product.material}
                instructions={product.instructions}
              />

              {/* Color Display */}
              {product.color_name && product.color_code && (
                <ColorSelector
                  colorName={product.color_name}
                  colorCode={product.color_code}
                  selectedColor={selectedColor}
                  onColorSelect={onColorSelect}
                />
              )}

              {/* Stock Status */}
              <StockStatus
                isOutOfStock={isOutOfStock}
                isLowStock={isLowStock}
                availableQuantity={availableQuantity}
              />

              {/* Desktop/Tablet Action Buttons */}
              <ActionButtons
                isOutOfStock={isOutOfStock}
                atMaxQuantity={atMaxQuantity}
                addedToCart={addedToCart}
                inWishlist={inWishlist}
                cartLoading={cartLoading}
                wishlistLoading={wishlistLoading}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                className="mb-4 hidden lg:flex"
              />

              {/* Trust Badges */}
              <TrustBadges className="mb-6 hidden lg:flex" />

              {/* Accordion sections (mobile + tablet) */}
              <div className="lg:hidden">
                <MaterialsAccordion
                  material={product.material}
                  instructions={product.instructions}
                />
              </div>

              {/* Reviews Preview */}
              <ReviewsPreview
                reviews={formattedReviews}
                averageRating={product.avg_rating}
                totalReviews={product.reviews_count}
                currentUserId={currentUserId}
                onReviewLike={onReviewLike}
                onLikeUpdate={onLikeUpdate}
              />

              {/* Desktop: Accordion for Materials & Shipping */}
              <div className="hidden lg:block">
                <MaterialsAccordion
                  material={product.material}
                  instructions={product.instructions}
                />
              </div>
            </div>
          </div>

          {/* Recommended Products */}
          <Suspense
            fallback={<ProductCarouselSkeleton className="mt-12 lg:mt-20" />}
          >
            <RecommendedProductsContainer
              productId={product.id}
              title="You might also like"
              className="mt-12 border-t border-neutral-100 px-4 pt-10 lg:mt-20 lg:px-0 lg:pt-16 dark:border-neutral-800"
            />
          </Suspense>
        </div>
      </main>

      {/* Mobile Fixed Bottom CTA (Option B style) */}
      <MobileBottomCTA
        price={product.price}
        isOutOfStock={isOutOfStock}
        atMaxQuantity={atMaxQuantity}
        addedToCart={addedToCart}
        inWishlist={inWishlist}
        cartLoading={cartLoading}
        wishlistLoading={wishlistLoading}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
      />
    </>
  );
}
