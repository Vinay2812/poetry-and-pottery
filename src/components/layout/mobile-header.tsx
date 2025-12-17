"use client";

import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowLeft, Heart, Search, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AccountDropdown } from "@/components/layout/account-dropdown";
import { Input } from "@/components/ui/input";

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
}

export function MobileHeader({ title, showBack, backHref }: MobileHeaderProps) {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <header className="border-border shadow-header fixed top-0 right-0 left-0 z-50 border-b bg-white/95 backdrop-blur-md lg:hidden">
      <div className="flex h-14 items-center px-4">
        {/* Left side / Search Input */}
        <div className="flex flex-1 items-center gap-2">
          {showBack ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleBack}
                className="hover:bg-muted focus-visible:ring-primary/30 -ml-2 rounded-full p-2 transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              {title && !isSearchOpen && (
                <h1 className="animate-in fade-in text-base font-semibold duration-200">
                  {title}
                </h1>
              )}
            </div>
          ) : (
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
                <span className="text-xs font-bold text-white">P</span>
              </div>
              {!isSearchOpen && (
                <span className="animate-in fade-in text-sm font-semibold whitespace-nowrap duration-200">
                  Poetry & Pottery
                </span>
              )}
            </Link>
          )}

          {isSearchOpen && (
            <div className="animate-in fade-in slide-in-from-top-1 relative w-full duration-200">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                autoFocus
                type="search"
                placeholder="Search..."
                className="bg-muted h-9 w-full rounded-full border-0 pl-9"
              />
            </div>
          )}
        </div>

        {/* Right side - Always visible */}
        <div className="-mr-1 flex items-center pl-2">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hover:bg-muted focus-visible:ring-primary/30 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
          >
            {isSearchOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Search className="text-muted-foreground h-6 w-6" />
            )}
          </button>
          <Link
            href="/wishlist"
            className="hover:bg-muted focus-visible:ring-primary/30 relative flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
          >
            <Heart className="text-muted-foreground h-6 w-6" />
            <span className="bg-primary absolute -top-0.5 -right-0.5 flex h-[22px] min-w-[22px] items-center justify-center rounded-full text-xs font-bold text-white">
              3
            </span>
          </Link>
          <SignedIn>
            <AccountDropdown />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="hover:bg-muted focus-visible:ring-primary/30 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none">
                <User className="text-muted-foreground h-6 w-6" />
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
