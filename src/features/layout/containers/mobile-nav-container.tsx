"use client";

import { useCartStore, useEventStore } from "@/store";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { MobileNav } from "../components/mobile-nav";
import type { MobileNavViewModel } from "../types";

export function MobileNavContainer() {
  const pathname = usePathname();
  const cartCount = useCartStore((state) => state.getTotalItems());
  const eventRegistrationCount = useEventStore((state) => state.getCount());

  const viewModel: MobileNavViewModel = useMemo(
    () => ({
      cartCount,
      eventRegistrationCount,
    }),
    [cartCount, eventRegistrationCount],
  );

  return <MobileNav viewModel={viewModel} currentPath={pathname} />;
}
