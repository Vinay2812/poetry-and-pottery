"use client";

import { useCartStore, useWishlistStore } from "@/store";
import { usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { Navbar } from "../components/navbar";
import type { NavbarViewModel } from "../types";

export function NavbarContainer() {
  const pathname = usePathname();
  const cartCount = useCartStore((state) => state.getTotalItems());
  const wishlistCount = useWishlistStore((state) => state.getCount());
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const viewModel: NavbarViewModel = useMemo(
    () => ({
      cartCount,
      wishlistCount,
    }),
    [cartCount, wishlistCount],
  );

  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    setIsSearchFocused(false);
  }, []);

  return (
    <Navbar
      viewModel={viewModel}
      currentPath={pathname}
      isSearchFocused={isSearchFocused}
      onSearchFocus={handleSearchFocus}
      onSearchBlur={handleSearchBlur}
    />
  );
}
