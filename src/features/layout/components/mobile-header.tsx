"use client";

import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Search, User } from "lucide-react";
import Link from "next/link";

import { OptimizedImage } from "@/components/shared";

import { cn } from "@/lib/utils";

import { AccountDropdownContainer } from "../containers/account-dropdown-container";
import type { MobileHeaderProps } from "../types";
import { Logo } from "./logo";

export function MobileHeader({
  title,
  showBack,
  viewModel,
  isHidden,
  onBack,
  onSearchClick,
}: MobileHeaderProps) {
  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 right-0 left-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl lg:hidden dark:border-white/10 dark:bg-black/80"
    >
      <div className="flex h-14 items-center px-4 py-2">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {showBack ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onBack}
                className="-ml-2 rounded-full p-2 transition-colors hover:bg-black/5 focus:outline-none active:bg-black/10 dark:hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              {title && (
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
              <Logo />
            </Link>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={onSearchClick}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 focus:outline-none active:bg-black/10 dark:hover:bg-white/10"
          >
            <Search className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
          </button>

          <Link
            href="/wishlist"
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/10",
              viewModel.isWishlistActive
                ? "bg-primary/10"
                : "hover:bg-neutral-100 dark:hover:bg-neutral-800",
            )}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors duration-200",
                viewModel.isWishlistActive
                  ? "text-primary fill-primary/20"
                  : "text-muted-foreground group-hover:text-foreground",
              )}
            />
            {viewModel.wishlistCount > 0 && (
              <span className="bg-primary absolute top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-black">
                {viewModel.wishlistCount}
              </span>
            )}
          </Link>

          <SignedIn>
            <AccountDropdownContainer />
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
