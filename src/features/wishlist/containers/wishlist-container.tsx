"use client";

import { isGraphQL } from "@/consts/env";
import { DEFAULT_PAGE_SIZE } from "@/consts/performance";
import type { ProductBase } from "@/data/products/types";
import { getWishlist } from "@/data/wishlist/gateway/server";
import { useRecommendedProductsQuery } from "@/features/recommended-products";
import { useWishlist } from "@/hooks";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Suspense, useCallback, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { ProductCarouselSkeleton } from "@/components/skeletons";

import { useWishlistLazyQuery } from "@/graphql/generated/graphql";
import type { WishlistItem } from "@/graphql/generated/types";

import { Wishlist } from "../components/wishlist";
import type { WishlistContainerProps, WishlistViewModel } from "../types";

function mapToProductBase(wishlistItem: WishlistItem): ProductBase {
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
    avg_rating: wishlistItem.product.avg_rating ?? 0,
    reviews_count: wishlistItem.product.reviews_count ?? 0,
    in_wishlist: true,
    is_active: wishlistItem.product.is_active ?? true,
    collection: wishlistItem.product.collection ?? null,
  };
}

const WISHLIST_PAGE_SIZE = 10;

export function WishlistContainer({
  initialWishlistItems,
  initialPagination,
}: WishlistContainerProps) {
  const { removeFromWishlist } = useWishlist();
  const queryClient = useQueryClient();
  const [fetchGraphQL] = useWishlistLazyQuery();

  // Recommendations fetched client-side
  const { products: recommendations, isLoading: isRecommendationsLoading } =
    useRecommendedProductsQuery({ limit: DEFAULT_PAGE_SIZE });

  // Infinite query for wishlist items
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["wishlist", isGraphQL],
      queryFn: async ({ pageParam = 1 }) => {
        if (isGraphQL) {
          // GraphQL mode: use Apollo lazy query
          const { data: gqlData } = await fetchGraphQL({
            variables: {
              filter: {
                page: pageParam,
                limit: WISHLIST_PAGE_SIZE,
              },
            },
          });

          const wishlist = gqlData?.wishlist;
          return {
            data: (wishlist?.data ?? []) as WishlistItem[],
            total: wishlist?.total ?? 0,
            page: wishlist?.page ?? pageParam,
            total_pages: wishlist?.total_pages ?? 0,
          };
        } else {
          // Server action mode
          const result = await getWishlist(pageParam);
          return result;
        }
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) {
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
            total_pages: initialPagination.totalPages,
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
      // Optimistically update the query cache to remove the item immediately
      queryClient.setQueryData(
        ["wishlist", isGraphQL],
        (oldData: typeof data | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page, index) => ({
              ...page,
              data: page.data.filter((item) => item.product_id !== productId),
              total: index === 0 ? Math.max(0, page.total - 1) : page.total,
            })),
          };
        },
      );

      // Then trigger the actual removal (which also updates zustand store)
      await removeFromWishlist(productId);
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
    <Suspense fallback={<ProductCarouselSkeleton showTitle={false} />}>
      <Wishlist
        viewModel={viewModel}
        recommendations={recommendations}
        recommendationsLoading={isRecommendationsLoading}
        recommendationsSkeleton={<ProductCarouselSkeleton showTitle={false} />}
        loadMoreRef={loadMoreRef}
        onRemoveItem={handleRemove}
      />
    </Suspense>
  );
}
