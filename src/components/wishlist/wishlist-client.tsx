"use client";

import { getWishlist } from "@/actions";
import { useWishlist } from "@/hooks";
import type { ProductWithCategories, WishlistWithProduct } from "@/types";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { ProductCard } from "@/components/cards";
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
  const { removeFromWishlist } = useWishlist();
  const queryClient = useQueryClient();

  // Infinite query for wishlist items
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["wishlist"],
      queryFn: async ({ pageParam = 1 }) => {
        const result = await getWishlist(pageParam);
        if (!result.success) {
          throw new Error("Failed to fetch wishlist");
        }
        return result.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      initialData: {
        pages: [
          {
            data: initialWishlistItems,
            total: initialPagination.total,
            page: 1,
            totalPages: initialPagination.totalPages,
          },
        ],
        pageParams: [1],
      },
    });

  // Intersection observer for auto-loading
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  // Auto-fetch next page when scrolling near bottom
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all pages into single array and deduplicate
  const wishlistItems = useMemo(() => {
    const allItems = data?.pages.flatMap((page) => page.data) ?? [];
    const seen = new Set<number>();
    return allItems.filter((item) => {
      if (seen.has(item.product_id)) {
        return false;
      }
      seen.add(item.product_id);
      return true;
    });
  }, [data]);

  const currentTotal = data?.pages[0]?.total ?? initialPagination.total;

  const handleRemove = useCallback(
    async (productId: number) => {
      const success = await removeFromWishlist(productId);
      if (success) {
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      }
    },
    [removeFromWishlist, queryClient],
  );

  const hasRecommendations = recommendations.length > 0;
  const showRecommendations = hasRecommendations && !hasNextPage;

  return (
    <>
      <MobileHeader title="My Wishlist" showBack backHref="/products" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-0">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              {currentTotal} Items saved
            </p>
          </div>

          {/* Wishlist Items */}
          {wishlistItems.length > 0 ? (
            <>
              <div
                className={
                  showRecommendations
                    ? "mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
                    : "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
                }
              >
                <AnimatePresence mode="popLayout">
                  {wishlistItems.map((item) => (
                    <ProductCard
                      key={item.product_id}
                      product={item.product}
                      variant="wishlist"
                      onRemoveFromWishlist={() => handleRemove(item.product_id)}
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
            <div className={showRecommendations ? "mb-8" : ""}>
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
          {showRecommendations && (
            <section>
              <h2 className="mb-4 text-lg font-semibold">
                You might also like
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
