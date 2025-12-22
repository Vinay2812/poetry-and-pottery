"use client";

import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Heart, Search, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { AccountDropdownContainer } from "../containers/account-dropdown-container";
import type { NavbarProps } from "../types";

export function Navbar({
  viewModel,
  currentPath,
  isSearchFocused,
  onSearchFocus,
  onSearchBlur,
}: NavbarProps) {
  const isActiveRoute = (href: string) => {
    if (href === "/") return currentPath === "/";
    return currentPath.startsWith(href);
  };

  return (
    <header className="fixed top-0 z-50 hidden w-full transition-all duration-300 lg:block">
      <div className="absolute inset-0 border-b border-white/20 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-black/70" />
      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between gap-8 py-2">
          {/* Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3 transition-opacity duration-150"
          >
            <div className="bg-primary shadow-primary/20 flex h-10 w-10 items-center justify-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              <span className="text-lg font-bold text-white">P</span>
            </div>
            <span className="text-foreground text-xl font-bold tracking-tight">
              Poetry & Pottery
            </span>
          </Link>

          {/* Navigation Pills */}
          <nav className="hidden items-center gap-1 rounded-full bg-neutral-100/50 p-1.5 backdrop-blur-sm lg:flex dark:bg-neutral-800/50">
            {NAV_LINKS.map((link) => {
              const isActive = isActiveRoute(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative z-10 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-neutral-700"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div
              className={cn(
                "relative hidden transition-all duration-300 xl:block",
                isSearchFocused ? "w-64" : "w-48",
              )}
            >
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
              <Input
                type="search"
                placeholder="Search..."
                className="focus:border-cancel focus:ring-primary/20 h-10 w-full rounded-full border-transparent bg-neutral-100/50 pl-10 text-sm focus:bg-white dark:bg-neutral-800/50 dark:focus:bg-neutral-800"
                onFocus={onSearchFocus}
                onBlur={onSearchBlur}
              />
            </div>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className={cn(
                "group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-105",
                isActiveRoute("/wishlist")
                  ? "bg-primary/10"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-800",
              )}
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-colors",
                  isActiveRoute("/wishlist")
                    ? "text-primary fill-primary/20"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              {viewModel.wishlistCount > 0 && (
                <span className="bg-primary absolute top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-black">
                  {viewModel.wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className={cn(
                "group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-105",
                isActiveRoute("/cart")
                  ? "bg-primary/10"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-800",
              )}
            >
              <ShoppingCartIcon
                className={cn(
                  "h-5 w-5 transition-colors",
                  isActiveRoute("/cart")
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              {viewModel.cartCount > 0 && (
                <span className="bg-primary absolute top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-black">
                  {viewModel.cartCount}
                </span>
              )}
            </Link>

            <div className="mx-1 h-6 w-px bg-neutral-200 dark:bg-neutral-700" />

            {/* Auth */}
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  size="sm"
                  className="shadow-primary/20 hover:shadow-primary/30 rounded-full px-6 font-medium"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <AccountDropdownContainer />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
