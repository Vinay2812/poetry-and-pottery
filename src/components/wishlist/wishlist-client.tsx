"use client";

import { getWishlist } from "@/actions";
import { useWishlist } from "@/hooks";
import type { ProductWithCategories, WishlistWithProduct } from "@/types";
import { AnimatePresence } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

import { ProductCard, WishlistItemCard } from "@/components/cards";
import { MobileHeader } from "@/components/layout";
import { EmptyState } from "@/components/sections";

interface WishlistClientProps {
  initialWishlistItems: WishlistWithProduct[];
  recommendations: ProductWithCategories[];
  initialPagination: {
    page: number;
    totalPages: number;
    total: number;
  };
}

export function WishlistClient({
  initialWishlistItems,
  recommendations,
  initialPagination,
}: WishlistClientProps) {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [movedToCartIds, setMovedToCartIds] = useState<Set<number>>(new Set());
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoadingMore, startLoadingMore] = useTransition();

  const { removeFromWishlist, moveToCart, isLoading } = useWishlist();

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore) return;
    startLoadingMore(async () => {
      const nextPage = pagination.page + 1;
      const result = await getWishlist(nextPage);
      if (result.success) {
        setWishlistItems((prev) => {
          const existingIds = new Set(prev.map((item) => item.product_id));
          const newItems = result.data.data.filter(
            (item) => !existingIds.has(item.product_id),
          );
          return [...prev, ...newItems];
        });
        setPagination({
          page: result.data.page,
          totalPages: result.data.totalPages,
          total: result.data.total,
        });
      }
    });
  }, [pagination.page, isLoadingMore]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          pagination.page < pagination.totalPages &&
          !isLoadingMore
        ) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 },
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [pagination.page, pagination.totalPages, isLoadingMore, handleLoadMore]);

  const handleRemove = useCallback(
    async (productId: number) => {
      const success = await removeFromWishlist(productId);
      if (success) {
        setWishlistItems((items) =>
          items.filter((item) => item.product_id !== productId),
        );
        setPagination((prev) => ({ ...prev, total: prev.total - 1 }));
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
            items.filter((item) => item.product_id !== productId),
          );
          setMovedToCartIds((prev) => {
            const next = new Set(prev);
            next.delete(productId);
            return next;
          });
          setPagination((prev) => ({ ...prev, total: prev.total - 1 }));
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
              {pagination.total} Items saved
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
                    key={item.product_id}
                    product={item.product}
                    onRemove={() => handleRemove(item.product_id)}
                    onMoveToCart={() => handleMoveToCart(item.product_id)}
                    isRemoving={isLoading(item.product_id)}
                    isMovingToCart={
                      isLoading(item.product_id) &&
                      !movedToCartIds.has(item.product_id)
                    }
                    movedToCart={movedToCartIds.has(item.product_id)}
                  />
                ))}
              </AnimatePresence>

              {/* Infinite scroll trigger */}
              {pagination.page < pagination.totalPages && (
                <div ref={loadMoreRef} className="flex justify-center py-6">
                  {isLoadingMore && (
                    <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
                  )}
                </div>
              )}
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
