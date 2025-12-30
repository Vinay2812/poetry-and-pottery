"use client";

import { getUserCounts } from "@/data/user/gateway/server";
import { useUIStore } from "@/store";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const setCartCount = useUIStore((state) => state.setCartCount);
  const setWishlistCount = useUIStore((state) => state.setWishlistCount);
  const setEventRegistrationsCount = useUIStore(
    (state) => state.setEventRegistrationsCount,
  );
  const setPendingOrdersCount = useUIStore(
    (state) => state.setPendingOrdersCount,
  );
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!isLoaded) return;

    // Reset counts when user signs out
    if (!user) {
      setCartCount(0);
      setWishlistCount(0);
      setEventRegistrationsCount(0);
      setPendingOrdersCount(0);
      hasFetchedRef.current = false;
      return;
    }

    // Fetch counts only once when user signs in
    if (user && !hasFetchedRef.current) {
      hasFetchedRef.current = true;

      getUserCounts().then((result) => {
        if (result.success) {
          setCartCount(result.data.cartCount);
          setWishlistCount(result.data.wishlistCount);
          setEventRegistrationsCount(result.data.eventRegistrationsCount);
          setPendingOrdersCount(result.data.pendingOrdersCount);
        }
      });
    }
  }, [
    user,
    isLoaded,
    setCartCount,
    setWishlistCount,
    setEventRegistrationsCount,
    setPendingOrdersCount,
  ]);

  return <>{children}</>;
}
