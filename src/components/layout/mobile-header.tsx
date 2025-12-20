"use client";

import { useWishlistStore } from "@/store";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowLeft, Heart, Search, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { AccountDropdown } from "@/components/layout/account-dropdown";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
}

export function MobileHeader({ title, showBack, backHref }: MobileHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const wishlistCount = useWishlistStore((state) => state.getCount());
  const isWishlistActive = pathname.startsWith("/wishlist");

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

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 right-0 left-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl lg:hidden dark:border-white/10 dark:bg-black/80"
    >
      <div className="flex h-14 items-center px-4 py-2">
        {/* Left side / Search Input */}
        <div className="flex flex-1 items-center gap-2">
          {showBack ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleBack}
                className="-ml-2 rounded-full p-2 transition-colors hover:bg-black/5 focus:outline-none active:bg-black/10 dark:hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              {title && !isSearchOpen && (
                <motion.h1
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gradient-to-br from-neutral-900 to-neutral-600 bg-clip-text text-base font-bold text-transparent dark:from-white dark:to-neutral-400"
                >
                  {title}
                </motion.h1>
              )}
            </div>
          ) : (
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-xl shadow-sm">
                <span className="text-sm font-bold text-white">P</span>
              </div>
              {!isSearchOpen && (
                <span className="text-base font-bold tracking-tight">
                  Poetry & Pottery
                </span>
              )}
            </Link>
          )}

          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-x-4 top-2 z-20 h-10 w-auto"
              >
                <div className="relative h-full w-full">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    autoFocus
                    type="search"
                    placeholder="Search pottery..."
                    className="focus-visible:ring-primary/20 h-full w-full rounded-full border-none bg-neutral-100 pr-10 pl-9 shadow-inner dark:bg-neutral-800"
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right side - Hidden when search is open */}
        <div
          className={cn(
            "flex items-center gap-0.5 transition-opacity duration-200",
            isSearchOpen ? "pointer-events-none opacity-0" : "opacity-100",
          )}
        >
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 focus:outline-none active:bg-black/10 dark:hover:bg-white/10"
          >
            <Search className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
          </button>

          <Link
            href="/wishlist"
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/10",
              isWishlistActive
                ? "bg-primary/10"
                : "hover:bg-neutral-100 dark:hover:bg-neutral-800",
            )}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors duration-200",
                isWishlistActive
                  ? "text-primary fill-primary/20"
                  : "text-muted-foreground group-hover:text-foreground",
              )}
            />
            {wishlistCount > 0 && (
              <span className="bg-primary absolute top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-black">
                {wishlistCount}
              </span>
            )}
          </Link>

          <SignedIn>
            <AccountDropdown />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 focus:outline-none active:bg-black/10 dark:hover:bg-white/10">
                <User className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </motion.header>
  );
}
