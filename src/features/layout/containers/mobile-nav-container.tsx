"use client";

import { useUIStore } from "@/store";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { MobileNav } from "../components/mobile-nav";
import type { MobileNavViewModel } from "../types";

export function MobileNavContainer() {
  const pathname = usePathname();
  const cartCount = useUIStore((state) => state.cartCount);
  const eventRegistrationCount = useUIStore(
    (state) => state.eventRegistrationsCount,
  );

  const viewModel: MobileNavViewModel = useMemo(
    () => ({
      cartCount,
      eventRegistrationCount,
    }),
    [cartCount, eventRegistrationCount],
  );

  return <MobileNav viewModel={viewModel} currentPath={pathname} />;
}
