"use client";

import type { ProductBase } from "@/data/products/types";
import { MobileHeaderContainer } from "@/features/layout";
import { AnimatePresence } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";

import { ProductCard } from "@/components/cards";
import { EmptyState } from "@/components/sections";

import type { WishlistProps } from "../types";

interface RecommendationsSectionProps {
  recommendations: ProductBase[];
}

function RecommendationsSection({
  recommendations,
}: RecommendationsSectionProps) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">You might also like</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export function Wishlist({
  viewModel,
  recommendations,
  loadMoreRef,
  onRemoveItem,
}: WishlistProps) {
  const {
    items,
    totalItems,
    hasNextPage,
    isFetchingNextPage,
    showRecommendations,
  } = viewModel;

  const hasRecommendations = recommendations.length > 0;
  const displayRecommendations = showRecommendations && hasRecommendations;

  return (
    <>
      <MobileHeaderContainer
        title="My Wishlist"
        showBack
        backHref="/products"
      />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-0">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              {totalItems} Items saved
            </p>
          </div>

          {/* Wishlist Items */}
          {items.length > 0 ? (
            <>
              <div
                className={
                  displayRecommendations
                    ? "mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
                    : "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
                }
              >
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <ProductCard
                      key={item.productId}
                      product={item.product}
                      variant="wishlist"
                      onRemoveFromWishlist={() => onRemoveItem(item.productId)}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Infinite scroll trigger */}
              {hasNextPage && (
                <div ref={loadMoreRef} className="mt-8 flex justify-center">
                  {isFetchingNextPage && (
                    <div className="text-muted-foreground flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="text-sm">Loading more...</span>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className={displayRecommendations ? "mb-8" : ""}>
              <div className="flex min-h-[40vh] items-center justify-center lg:min-h-[50vh]">
                <EmptyState
                  icon={Heart}
                  title="Your wishlist is empty"
                  description="Save items you love to your wishlist"
                  actionText="Start Shopping"
                  actionHref="/products"
                />
              </div>
            </div>
          )}

          {/* Recommendations - only show when all items are loaded */}
          {displayRecommendations && (
            <RecommendationsSection recommendations={recommendations} />
          )}
        </div>
      </main>
    </>
  );
}
