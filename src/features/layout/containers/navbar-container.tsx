"use client";

import { GlobalSearchContainer } from "@/features/global-search";
import { useCartStore, useWishlistStore } from "@/store";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { Navbar } from "../components/navbar";
import type { NavbarViewModel } from "../types";

export function NavbarContainer() {
  const pathname = usePathname();
  const cartCount = useCartStore((state) => state.getTotalItems());
  const wishlistCount = useWishlistStore((state) => state.getCount());

  const { handleOpen: handleSearchOpen, GlobalSearchComponent } =
    GlobalSearchContainer();

  const viewModel: NavbarViewModel = useMemo(
    () => ({
      cartCount,
      wishlistCount,
    }),
    [cartCount, wishlistCount],
  );

  return (
    <>
      <Navbar
        viewModel={viewModel}
        currentPath={pathname}
        onSearchClick={handleSearchOpen}
      />
      {GlobalSearchComponent}
    </>
  );
}
