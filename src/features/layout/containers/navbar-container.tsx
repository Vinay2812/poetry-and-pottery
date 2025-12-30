"use client";

import { GlobalSearchContainer } from "@/features/global-search";
import { useUIStore } from "@/store";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { Navbar } from "../components/navbar";
import type { NavbarViewModel } from "../types";

export function NavbarContainer() {
  const pathname = usePathname();
  const cartCount = useUIStore((state) => state.cartCount);
  const wishlistCount = useUIStore((state) => state.wishlistCount);

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
