"use client";

import { getUserCounts } from "@/data/user/gateway/server";
import { getWishlistIds } from "@/data/wishlist/gateway/server";
import { useUIStore } from "@/store";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const setCartCount = useUIStore((state) => state.setCartCount);
  const setEventRegistrationsCount = useUIStore(
    (state) => state.setEventRegistrationsCount,
  );
  const setPendingOrdersCount = useUIStore(
    (state) => state.setPendingOrdersCount,
  );
  const hydrateWishlistIds = useUIStore((state) => state.hydrateWishlistIds);
  const resetWishlist = useUIStore((state) => state.resetWishlist);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!isLoaded) return;

    // Reset counts when user signs out
    if (!user) {
      setCartCount(0);
      resetWishlist();
      setEventRegistrationsCount(0);
      setPendingOrdersCount(0);
      hasFetchedRef.current = false;
      return;
    }

    // Fetch counts only once when user signs in
    if (user && !hasFetchedRef.current) {
      hasFetchedRef.current = true;

      // Fetch user counts and wishlist IDs in parallel
      Promise.all([getUserCounts(), getWishlistIds()]).then(
        ([countsResult, wishlistIds]) => {
          if (countsResult.success) {
            setCartCount(countsResult.data.cartCount);
            setEventRegistrationsCount(
              countsResult.data.eventRegistrationsCount,
            );
            setPendingOrdersCount(countsResult.data.pendingOrdersCount);
          }
          // Hydrate wishlist IDs (this also sets wishlistCount)
          hydrateWishlistIds(wishlistIds);
        },
      );
    }
  }, [
    user,
    isLoaded,
    setCartCount,
    hydrateWishlistIds,
    resetWishlist,
    setEventRegistrationsCount,
    setPendingOrdersCount,
  ]);

  return <>{children}</>;
}
