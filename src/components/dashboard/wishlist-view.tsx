"use client";

import { DEFAULT_ROOT_MARGIN } from "@/consts/performance";
import { getUserWishlistPaginated } from "@/data/admin/users/gateway/server";
import { useInfiniteQuery } from "@tanstack/react-query";
import { HeartIcon, Loader2, PackageIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { ImageCarousel } from "@/components/shared/image-carousel";
import { Badge } from "@/components/ui/badge";

import type { AdminUserWishlistItem } from "@/graphql/generated/types";

interface WishlistViewProps {
  userId: number;
  initialData: AdminUserWishlistItem[];
  initialPagination: {
    total: number;
    page: number;
    totalPages: number;
  };
}

export function WishlistView({
  userId,
  initialData,
  initialPagination,
}: WishlistViewProps) {
  // Infinite query for wishlist items
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["admin-user-wishlist", userId],
      queryFn: async ({ pageParam = 1 }) => {
        const result = await getUserWishlistPaginated(userId, pageParam, 12);
        return result;
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
            data: initialData,
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
    rootMargin: DEFAULT_ROOT_MARGIN,
  });

  // Auto-fetch next page when scrolling near bottom
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all pages into single array and deduplicate
  const items = useMemo(() => {
    const allItems = data?.pages.flatMap((page) => page.data) ?? [];
    const seen = new Set<number>();
    return allItems.filter((item) => {
      if (seen.has(item.id)) {
        return false;
      }
      seen.add(item.id);
      return true;
    });
  }, [data]);

  const currentTotal = data?.pages[0]?.total ?? initialPagination.total;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-neutral-50 py-12">
        <HeartIcon className="mb-3 size-12 text-neutral-300" />
        <p className="text-neutral-500">Wishlist is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Items count */}
      <p className="text-sm text-neutral-500">{currentTotal} items saved</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl bg-white p-4 shadow-sm">
            {/* Image Carousel */}
            {item.product.image_urls.length > 0 ? (
              <ImageCarousel
                images={item.product.image_urls}
                alt={item.product.name}
                className="mb-3 rounded-xl"
                showArrows={false}
                showDots={item.product.image_urls.length > 1}
              />
            ) : (
              <div className="mb-3 flex aspect-square items-center justify-center rounded-xl bg-neutral-100">
                <PackageIcon className="size-12 text-neutral-300" />
              </div>
            )}

            {/* Product Info */}
            <div className="space-y-2">
              <p className="line-clamp-2 font-medium text-neutral-900">
                {item.product.name}
              </p>

              <p className="font-mono text-xs text-neutral-400">
                ID: {item.product.id}
              </p>

              <p className="text-primary text-lg font-semibold">
                ₹{item.product.price.toLocaleString("en-IN")}
              </p>

              {item.product.available_quantity === 0 && (
                <Badge variant="destructive">Out of stock</Badge>
              )}

              <p className="text-xs text-neutral-400" suppressHydrationWarning>
                Added{" "}
                {new Date(item.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Infinite scroll trigger */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="flex justify-center py-4">
          {isFetchingNextPage && (
            <div className="flex items-center gap-2 text-neutral-500">
              <Loader2 className="size-5 animate-spin" />
              <span className="text-sm">Loading more...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
