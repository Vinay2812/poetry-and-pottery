"use client";

import { getCartCount } from "@/actions/cart.actions";
import { getRegistrationCount } from "@/actions/event.actions";
import { getPendingOrdersCount } from "@/actions/order.actions";
import { getWishlistCount } from "@/actions/wishlist.actions";
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

      // Fetch counts in parallel
      Promise.all([
        getCartCount(),
        getWishlistCount(),
        getRegistrationCount(),
        getPendingOrdersCount(),
      ]).then(([cartCount, wishlistCount, eventCount, pendingOrdersCount]) => {
        setCartCount(cartCount);
        setWishlistCount(wishlistCount);
        setEventRegistrationsCount(eventCount);
        setPendingOrdersCount(pendingOrdersCount);
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
