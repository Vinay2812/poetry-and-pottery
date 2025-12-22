"use client";

import { useWishlistStore } from "@/store";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { MobileHeader } from "../components/mobile-header";
import type {
  MobileHeaderContainerProps,
  MobileHeaderViewModel,
} from "../types";

export function MobileHeaderContainer({
  title,
  showBack,
  backHref,
}: MobileHeaderContainerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const wishlistCount = useWishlistStore((state) => state.getCount());

  // Scroll handling for hide/show effect
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const viewModel: MobileHeaderViewModel = useMemo(
    () => ({
      wishlistCount,
      isWishlistActive: pathname.startsWith("/wishlist"),
    }),
    [wishlistCount, pathname],
  );

  const handleBack = useCallback(() => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  }, [backHref, router]);

  const handleSearchOpen = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const handleSearchClose = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  return (
    <MobileHeader
      title={title}
      showBack={showBack}
      backHref={backHref}
      viewModel={viewModel}
      currentPath={pathname}
      isSearchOpen={isSearchOpen}
      isHidden={hidden}
      onBack={handleBack}
      onSearchOpen={handleSearchOpen}
      onSearchClose={handleSearchClose}
    />
  );
}
