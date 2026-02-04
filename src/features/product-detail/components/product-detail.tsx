"use client";

import type { ProductDetail as ProductDetailType } from "@/data/products/types";
import { RecommendedProductsContainer } from "@/features/recommended-products";
import { motion } from "framer-motion";
import {
  Archive,
  Check,
  ChevronRight,
  Heart,
  Loader2,
  MessageCircle,
  ShoppingCartIcon,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Suspense, useRef } from "react";

import { ProductImageGallery } from "@/components/products";
import { Rating } from "@/components/shared";
import { ProductCarouselSkeleton } from "@/components/skeletons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import type { ProductAvailabilityStatus, ProductDetailProps } from "../types";
import { ProductTabs } from "./product-tabs";
import { StickyCTA } from "./sticky-cta";
import { TrustBadges } from "./trust-badges";

// --- Sub-components ---

interface CollectionBadgeProps {
  collection: NonNullable<ProductDetailType["collection"]>;
}

function CollectionBadge({ collection }: CollectionBadgeProps) {
  return (
    <Link
      href={`/products?collection_ids=${collection.id}`}
      className="group bg-primary-light/50 hover:bg-primary-light dark:bg-primary/10 dark:hover:bg-primary/20 mb-4 flex items-center gap-2 rounded-xl px-3 py-2.5 transition-colors"
    >
      <div className="bg-primary/10 dark:bg-primary/20 flex h-8 w-8 items-center justify-center rounded-lg">
        <Sparkles className="text-primary h-4 w-4" />
      </div>
      <div className="flex flex-1 flex-col">
        <span className="text-primary/70 text-[10px] font-medium tracking-wider uppercase">
          Part of Collection
        </span>
        <span className="text-primary text-sm font-semibold">
          {collection.name}
        </span>
      </div>
      <ChevronRight className="text-primary/50 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

interface StatusBadgesProps {
  availabilityStatus: ProductAvailabilityStatus;
}

function StatusBadges({ availabilityStatus }: StatusBadgesProps) {
  const { isOutOfStock, isInactive, isCollectionArchived } = availabilityStatus;

  if (isOutOfStock) {
    return (
      <div className="mb-3">
        <span className="bg-terracotta inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white">
          Sold Out
        </span>
      </div>
    );
  }

  if (isInactive || isCollectionArchived) {
    return (
      <div className="mb-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-500 px-3 py-1.5 text-xs font-semibold text-white">
          <Archive className="h-3.5 w-3.5" />
          {isInactive ? "Unavailable" : "Collection Ended"}
        </span>
      </div>
    );
  }

  return null;
}

interface ProductInfoHeaderProps {
  product: ProductDetailType;
  availabilityStatus: ProductAvailabilityStatus;
}

function ProductInfoHeader({
  product,
  availabilityStatus,
}: ProductInfoHeaderProps) {
  const category = product.categories[0] || product.material || "Pottery";

  return (
    <div className="mb-4 md:mb-6">
      {/* Status Badges */}
      <StatusBadges availabilityStatus={availabilityStatus} />

      {/* Category Badge */}
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
        <span
          className={cn(
            "text-xl font-bold md:text-2xl",
            availabilityStatus.isUnavailable
              ? "text-neutral-500 dark:text-neutral-400"
              : "text-neutral-900 dark:text-white",
          )}
        >
          ₹{product.price.toLocaleString()}
        </span>
      </div>

      {/* Description */}
      {product.description && (
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {product.description}
        </p>
      )}
    </div>
  );
}

interface StockStatusProps {
  availabilityStatus: ProductAvailabilityStatus;
  availableQuantity: number;
}

function StockStatus({
  availabilityStatus,
  availableQuantity,
}: StockStatusProps) {
  const { isOutOfStock, isLowStock, isInactive, isCollectionArchived } =
    availabilityStatus;

  // Don't show stock status if product is unavailable for other reasons
  if (isInactive || isCollectionArchived) {
    return null;
  }

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

interface ActionButtonsProps {
  availabilityStatus: ProductAvailabilityStatus;
  atMaxQuantity: boolean;
  addedToCart: boolean;
  inWishlist: boolean;
  cartLoading: boolean;
  wishlistLoading: boolean;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  onRequestProduct: () => void;
  className?: string;
}

function ActionButtons({
  availabilityStatus,
  atMaxQuantity,
  addedToCart,
  inWishlist,
  cartLoading,
  wishlistLoading,
  onAddToCart,
  onToggleWishlist,
  onRequestProduct,
  className,
}: ActionButtonsProps) {
  const { isOutOfStock, isUnavailable } = availabilityStatus;
  const isDisabled = isUnavailable || atMaxQuantity;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Add to Cart or Request Button */}
      <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
        {isUnavailable ? (
          <Button
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10 h-12 w-full rounded-xl transition-all"
            size="lg"
            onClick={onRequestProduct}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Request This Item
          </Button>
        ) : (
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
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Adding to cart...
              </>
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
        )}
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
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Adding to wishlist...
            </>
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
  availabilityStatus,
  onColorSelect,
  onAddToCart,
  onToggleWishlist,
  onRequestProduct,
  onReviewLike,
  onLikeUpdate,
}: ProductDetailProps) {
  const availableQuantity = product.available_quantity ?? 0;
  const mainCtaRef = useRef<HTMLDivElement>(null);

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

              <ProductInfoHeader
                product={product}
                availabilityStatus={availabilityStatus}
              />

              {/* Collection Badge */}
              {product.collection && (
                <CollectionBadge collection={product.collection} />
              )}

              {/* Specs */}
              <ProductSpecs material={product.material} />

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
                availabilityStatus={availabilityStatus}
                availableQuantity={availableQuantity}
              />

              {/* Action Buttons (observed by StickyCTA) */}
              <div ref={mainCtaRef}>
                <ActionButtons
                  availabilityStatus={availabilityStatus}
                  atMaxQuantity={atMaxQuantity}
                  addedToCart={addedToCart}
                  inWishlist={inWishlist}
                  cartLoading={cartLoading}
                  wishlistLoading={wishlistLoading}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  onRequestProduct={onRequestProduct}
                  className="mb-4"
                />
              </div>

              {/* Trust Badges */}
              <TrustBadges className="mb-6" />

              {/* Product Info Tabs (Description, Materials & Care, Reviews) */}
              <ProductTabs
                material={product.material}
                instructions={product.instructions}
                reviews={formattedReviews}
                averageRating={product.avg_rating}
                totalReviews={product.reviews_count}
                currentUserId={currentUserId}
                onReviewLike={onReviewLike}
                onLikeUpdate={onLikeUpdate}
                className="mt-2"
              />
            </div>
          </div>

          {/* Recommended Products */}
          <Suspense
            fallback={
              <ProductCarouselSkeleton
                className="mt-12 lg:mt-20"
                title="You might also like"
                subtitle="Handpicked pieces for your home."
                viewAllHref="/products"
              />
            }
          >
            <RecommendedProductsContainer
              productId={product.id}
              title="You might also like"
              className="mt-12 border-t border-neutral-100 px-4 pt-10 lg:mt-20 lg:px-0 lg:pt-16 dark:border-neutral-800"
            />
          </Suspense>
        </div>
      </main>

      {/* Sticky Mobile CTA */}
      <StickyCTA
        price={product.price}
        availabilityStatus={availabilityStatus}
        atMaxQuantity={atMaxQuantity}
        addedToCart={addedToCart}
        cartLoading={cartLoading}
        onAddToCart={onAddToCart}
        onRequestProduct={onRequestProduct}
        mainCtaRef={mainCtaRef}
      />
    </>
  );
}
