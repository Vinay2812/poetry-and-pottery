"use client";

import { useWishlist } from "@/hooks";
import type { ProductWithCategories } from "@/types";
import { AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useCallback, useState } from "react";

import { ProductCard, WishlistItemCard } from "@/components/cards";
import { MobileHeader } from "@/components/layout";
import { EmptyState } from "@/components/sections";

interface WishlistClientProps {
  initialWishlistItems: ProductWithCategories[];
  recommendations: ProductWithCategories[];
}

export function WishlistClient({
  initialWishlistItems,
  recommendations,
}: WishlistClientProps) {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [movedToCartIds, setMovedToCartIds] = useState<Set<number>>(new Set());

  const { removeFromWishlist, moveToCart, isLoading } = useWishlist();

  const handleRemove = useCallback(
    async (productId: number) => {
      const success = await removeFromWishlist(productId);
      if (success) {
        setWishlistItems((items) =>
          items.filter((item) => item.id !== productId),
        );
      }
    },
    [removeFromWishlist],
  );

  const handleMoveToCart = useCallback(
    async (productId: number) => {
      const success = await moveToCart(productId);
      if (success) {
        setMovedToCartIds((prev) => new Set(prev).add(productId));
        setTimeout(() => {
          setWishlistItems((items) =>
            items.filter((item) => item.id !== productId),
          );
          setMovedToCartIds((prev) => {
            const next = new Set(prev);
            next.delete(productId);
            return next;
          });
        }, 1500);
      }
    },
    [moveToCart],
  );

  const hasRecommendations = recommendations.length > 0;

  return (
    <>
      <MobileHeader title="My Wishlist" showBack backHref="/products" />

      <main className="pt-14 pb-24 lg:pt-0 lg:pb-0">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              {wishlistItems.length} Items saved
            </p>
          </div>

          {/* Wishlist Items */}
          {wishlistItems.length > 0 ? (
            <div
              className={hasRecommendations ? "mb-12 space-y-4" : "space-y-4"}
            >
              <AnimatePresence mode="popLayout">
                {wishlistItems.map((item) => (
                  <WishlistItemCard
                    key={item.id}
                    product={item}
                    onRemove={() => handleRemove(item.id)}
                    onMoveToCart={() => handleMoveToCart(item.id)}
                    isRemoving={isLoading(item.id)}
                    isMovingToCart={
                      isLoading(item.id) && !movedToCartIds.has(item.id)
                    }
                    movedToCart={movedToCartIds.has(item.id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="mb-8 flex min-h-[40vh] items-center justify-center lg:min-h-[50vh]">
              <EmptyState
                icon={Heart}
                title="Your wishlist is empty"
                description="Save items you love to your wishlist"
                actionText="Start Shopping"
                actionHref="/products"
              />
            </div>
          )}

          {/* Recommendations */}
          {hasRecommendations && (
            <section>
              <h2 className="mb-4 text-lg font-semibold">
                You might also like
              </h2>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {recommendations.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
