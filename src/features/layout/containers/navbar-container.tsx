"use client";

import { useGlobalSearchContainer } from "@/features/global-search";
import { useUIStore } from "@/store";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { Navbar } from "../components/navbar";
import type { NavbarViewModel } from "../types";

export function NavbarContainer() {
  const pathname = usePathname();
  const cartCount = useUIStore((state) => state.cartCount);
  const wishlistCount = useUIStore((state) => state.wishlistCount);
  const eventRegistrationCount = useUIStore(
    (state) => state.eventRegistrationsCount,
  );

  const { handleOpen: handleSearchOpen, GlobalSearchComponent } =
    useGlobalSearchContainer();

  const viewModel: NavbarViewModel = useMemo(
    () => ({
      cartCount,
      wishlistCount,
      eventRegistrationCount,
    }),
    [cartCount, wishlistCount, eventRegistrationCount],
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
