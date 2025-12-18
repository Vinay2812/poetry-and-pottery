"use client";

import { getCart } from "@/actions/cart.actions";
import { getRegistrationCount } from "@/actions/event.actions";
import { getPendingOrdersCount } from "@/actions/order.actions";
import { getWishlistIds } from "@/actions/wishlist.actions";
import { useCartStore } from "@/store/cart.store";
import { useEventStore } from "@/store/event.store";
import { useOrderStore } from "@/store/order.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const cartStore = useCartStore();
  const wishlistStore = useWishlistStore();
  const eventStore = useEventStore();
  const orderStore = useOrderStore();
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!isLoaded) return;

    // Reset stores when user signs out
    if (!user) {
      if (cartStore.isHydrated) cartStore.reset();
      if (wishlistStore.isHydrated) wishlistStore.reset();
      if (eventStore.isHydrated) eventStore.reset();
      if (orderStore.isHydrated) orderStore.reset();
      hasFetchedRef.current = false;
      return;
    }

    // Fetch data only once when user signs in
    if (user && !hasFetchedRef.current) {
      hasFetchedRef.current = true;

      // Fetch cart items
      getCart().then((result) => {
        if (result.success) {
          cartStore.hydrate(result.data);
        }
      });

      // Fetch wishlist IDs for quick lookup (used in navbar badges)
      getWishlistIds().then((result) => {
        if (result.success) {
          wishlistStore.hydrateIds(result.data);
        }
      });

      // Fetch registration count for event tabs
      getRegistrationCount().then((count) => {
        eventStore.hydrateCount(count);
      });

      // Fetch pending orders count for badge
      getPendingOrdersCount().then((count) => {
        orderStore.hydrateCount(count);
      });
    }
  }, [user, isLoaded, cartStore, wishlistStore, eventStore, orderStore]);

  return <>{children}</>;
}
