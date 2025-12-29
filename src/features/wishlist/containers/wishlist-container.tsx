"use client";

import { getWishlist } from "@/actions";
import type { ProductBase } from "@/data/products/types";
import { useWishlist } from "@/hooks";
import type { WishlistWithProduct } from "@/types";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { Wishlist } from "../components/wishlist";
import type { WishlistContainerProps, WishlistViewModel } from "../types";

function mapToProductBase(
  wishlistItem: WishlistWithProduct
): ProductBase {
  return {
    id: wishlistItem.product.id,
    slug: wishlistItem.product.slug,
    name: wishlistItem.product.name,
    price: wishlistItem.product.price,
    image_urls: wishlistItem.product.image_urls,
    material: wishlistItem.product.material,
    available_quantity: wishlistItem.product.available_quantity,
    total_quantity: wishlistItem.product.total_quantity,
    color_code: wishlistItem.product.color_code,
    color_name: wishlistItem.product.color_name,
    avg_rating: 0,
    reviews_count: 0,
    in_wishlist: true,
  };
}

export function WishlistContainer({
  initialWishlistItems,
  recommendations,
  initialPagination,
}: WishlistContainerProps) {
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

  // Build view model
  const viewModel: WishlistViewModel = useMemo(
    () => ({
      items: wishlistItems.map((item) => ({
        productId: item.product_id,
        product: mapToProductBase(item),
      })),
      totalItems: currentTotal,
      hasNextPage: hasNextPage ?? false,
      isFetchingNextPage,
      showRecommendations: !hasNextPage,
    }),
    [wishlistItems, currentTotal, hasNextPage, isFetchingNextPage],
  );

  return (
    <Wishlist
      viewModel={viewModel}
      recommendations={recommendations}
      loadMoreRef={loadMoreRef}
      onRemoveItem={handleRemove}
    />
  );
}
