"use client";

import { useCartStore, useWishlistStore } from "@/store";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Heart, Search, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AccountDropdown } from "@/components/layout/account-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const cartCount = useCartStore((state) => state.getTotalItems());
  const wishlistCount = useWishlistStore((state) => state.getCount());

  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="border-border/50 sticky top-0 z-50 hidden border-b bg-white/95 backdrop-blur-md lg:block">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 transition-opacity duration-150 hover:opacity-80"
          >
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
              <span className="text-sm font-bold text-white">P</span>
            </div>
            <span className="text-lg font-semibold">Poetry & Pottery</span>
          </Link>

          {/* Navigation Pills */}
          <nav className="bg-muted/80 flex items-center gap-1 rounded-full px-1.5 py-1.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-150",
                  isActiveRoute(link.href)
                    ? "text-foreground bg-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/50",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                type="search"
                placeholder="Search..."
                className="bg-muted h-9 w-40 rounded-full border-0 pl-9 text-sm xl:w-48"
              />
            </div>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hover:bg-muted relative flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-150"
            >
              <Heart className="text-muted-foreground h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="bg-primary absolute -top-0.5 -right-0.5 flex h-[22px] min-w-[22px] items-center justify-center rounded-full text-xs font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="hover:bg-muted relative flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-150"
            >
              <ShoppingCartIcon className="text-muted-foreground h-6 w-6" />
              {cartCount > 0 && (
                <span className="bg-primary absolute -top-0.5 -right-0.5 flex h-[22px] min-w-[22px] items-center justify-center rounded-full text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="sm">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <AccountDropdown />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
