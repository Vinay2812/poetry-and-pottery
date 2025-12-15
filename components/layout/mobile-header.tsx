"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ArrowLeft, Heart, Search, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
}

export function MobileHeader({ title, showBack, backHref }: MobileHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <header className="border-border fixed top-0 right-0 left-0 z-50 border-b bg-white/95 backdrop-blur-md lg:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {showBack ? (
            <>
              <button
                onClick={handleBack}
                className="hover:bg-muted -ml-2 rounded-full p-2 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              {title && <h1 className="text-base font-semibold">{title}</h1>}
            </>
          ) : (
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-full">
                <span className="text-xs font-bold text-white">E</span>
              </div>
              <span className="text-sm font-semibold">Poetry & Pottery</span>
            </Link>
          )}
        </div>

        {/* Right side */}
        <div className="-mr-1 flex items-center">
          <button className="hover:bg-muted flex h-11 w-11 items-center justify-center rounded-full transition-colors">
            <Search className="text-muted-foreground h-6 w-6" />
          </button>
          <Link
            href="/wishlist"
            className="hover:bg-muted relative flex h-11 w-11 items-center justify-center rounded-full transition-colors"
          >
            <Heart className="text-muted-foreground h-6 w-6" />
            <span className="bg-primary absolute -top-0.5 -right-0.5 flex h-[22px] min-w-[22px] items-center justify-center rounded-full text-xs font-bold text-white">
              3
            </span>
          </Link>
          <SignedIn>
            <div className="flex h-11 w-11 items-center justify-center">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                  },
                }}
              />
            </div>
          </SignedIn>
          <SignedOut>
            <Link
              href="/profile"
              className="hover:bg-muted flex h-11 w-11 items-center justify-center rounded-full transition-colors"
            >
              <User className="text-muted-foreground h-6 w-6" />
            </Link>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
