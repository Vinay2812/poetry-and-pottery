"use client";

import { RecommendedProductsContainer } from "@/features/recommended-products";
import { Suspense, useRef } from "react";

import { ProductImageGallery } from "@/components/products";
import { ProductCarouselSkeleton } from "@/components/skeletons";

import type { ProductDetailProps } from "../types";
import { ActionButtons } from "./action-buttons";
import { CollectionBadge } from "./collection-badge";
import { ColorSelector } from "./color-selector";
import { ProductInfoHeader } from "./product-info-header";
import { ProductSpecs } from "./product-specs";
import { ProductTabs } from "./product-tabs";
import { StickyCTA } from "./sticky-cta";
import { StockStatus } from "./stock-status";
import { TrustBadges } from "./trust-badges";

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
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-10">
            <div
              className="relative min-w-0 overflow-hidden lg:sticky lg:top-24 lg:self-start lg:rounded-2xl"
              style={{ viewTransitionName: `product-image-${product.id}` }}
            >
              <ProductImageGallery
                images={product.image_urls}
                productName={product.name}
              />
            </div>

            <div className="relative -mt-6 rounded-t-3xl bg-white px-5 pt-6 lg:mt-0 lg:rounded-t-none lg:bg-transparent lg:px-0 lg:pt-0 dark:bg-neutral-950 lg:dark:bg-transparent">
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-neutral-200 lg:hidden dark:bg-neutral-700" />

              <ProductInfoHeader
                product={product}
                availabilityStatus={availabilityStatus}
              />

              {product.collection && (
                <CollectionBadge collection={product.collection} />
              )}

              <ProductSpecs material={product.material} />

              {product.color_name && product.color_code && (
                <ColorSelector
                  colorName={product.color_name}
                  colorCode={product.color_code}
                  selectedColor={selectedColor}
                  onColorSelect={onColorSelect}
                />
              )}

              <StockStatus
                availabilityStatus={availabilityStatus}
                availableQuantity={availableQuantity}
              />

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

              <TrustBadges className="mb-6" />

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
