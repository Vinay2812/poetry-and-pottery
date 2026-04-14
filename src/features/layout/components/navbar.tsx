"use client";

import { NAV_LINKS } from "@/consts/client";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Heart, Search, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { AccountDropdownContainer } from "../containers/account-dropdown-container";
import type { NavbarProps } from "../types";
import { Logo } from "./logo";

interface NavIconLinkProps {
  href: string;
  icon: LucideIcon;
  count: number;
  isActive: boolean;
  activeIconClassName?: string;
}

function NavIconLink({
  href,
  icon: Icon,
  count,
  isActive,
  activeIconClassName,
}: NavIconLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-105",
        isActive ? "bg-primary/10" : "hover:bg-neutral-100",
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 transition-colors",
          isActive
            ? cn("text-primary", activeIconClassName)
            : "text-muted-foreground group-hover:text-foreground",
        )}
      />
      {count > 0 && (
        <span className="bg-primary ring-background absolute top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm ring-2">
          {count}
        </span>
      )}
    </Link>
  );
}

export function Navbar({ viewModel, currentPath, onSearchClick }: NavbarProps) {
  const isActiveRoute = (href: string) => {
    if (href === "/") return currentPath === "/";
    return currentPath.startsWith(href);
  };

  return (
    <header className="fixed top-0 z-50 hidden w-full transition-all duration-300 lg:block">
      <div className="bg-background border-border absolute inset-0 border-b" />
      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between gap-8 py-2">
          {/* Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3 transition-opacity duration-150"
          >
            <Logo />
          </Link>

          {/* Navigation Pills */}
          <nav className="hidden items-center gap-1 rounded-full bg-neutral-100 p-1.5 lg:flex">
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
                      className="bg-card absolute inset-0 rounded-full shadow-sm"
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
            {/* Search Button */}
            <button
              onClick={onSearchClick}
              className="hidden h-10 w-48 items-center gap-2 rounded-full bg-neutral-100 px-4 text-sm transition-colors hover:bg-neutral-200 xl:flex"
            >
              <Search className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground">Search...</span>
            </button>

            {/* Wishlist */}
            <NavIconLink
              href="/wishlist"
              icon={Heart}
              count={viewModel.wishlistCount}
              isActive={isActiveRoute("/wishlist")}
              activeIconClassName="fill-primary/20"
            />

            {/* Cart */}
            <NavIconLink
              href="/cart"
              icon={ShoppingCartIcon}
              count={viewModel.cartCount}
              isActive={isActiveRoute("/cart")}
            />

            <div className="bg-border mx-1 h-6 w-px" />

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
