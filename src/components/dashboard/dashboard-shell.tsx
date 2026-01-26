"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { HomeIcon, LogOutIcon, MenuIcon, StoreIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { useRouteAnimation } from "@/components/providers/route-animation-provider";
import { OptimizedImage } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { DashboardNav } from "./dashboard-nav";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/users": "Users",
  "/dashboard/products": "Products",
  "/dashboard/categories": "Categories",
  "/dashboard/events": "Events",
  "/dashboard/content": "Content",
  "/dashboard/settings": "Settings",
};

function getPageTitle(pathname: string): string {
  // Check for exact match first
  if (PAGE_TITLES[pathname]) {
    return PAGE_TITLES[pathname];
  }
  // Check for partial match (for nested routes)
  for (const [path, title] of Object.entries(PAGE_TITLES)) {
    if (pathname.startsWith(path) && path !== "/dashboard") {
      return title;
    }
  }
  return "Dashboard";
}

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const { startNavigation } = useRouteAnimation();
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  const handleSignOut = useCallback(() => {
    signOut({ redirectUrl: "/" });
  }, [signOut]);

  const handleGoHome = useCallback(() => {
    startNavigation(() => {
      router.push("/");
    });
  }, [router, startNavigation]);

  return (
    <div className="min-h-screen">
      {/* Desktop Sidebar - Fixed */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/20 bg-white/70 backdrop-blur-xl lg:block dark:border-white/10 dark:bg-black/70">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-white/20 px-6 dark:border-white/10">
            <Link href="/dashboard" className="group flex items-center gap-3">
              <div className="bg-primary shadow-primary/20 flex size-10 items-center justify-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                <span className="text-lg font-bold text-white">P</span>
              </div>
              <span className="text-foreground text-xl font-bold tracking-tight">
                Admin
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <DashboardNav />
          </div>

          {/* Footer */}
          <div className="border-t border-white/20 p-4 dark:border-white/10">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <StoreIcon className="size-5" />
              Back to Shop
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content - with left margin for sidebar on desktop */}
      <div className="flex min-h-screen flex-col lg:ml-64">
        {/* Top Header - Glassmorphism style */}
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between px-4 lg:px-6">
          <div className="absolute inset-0 border-b border-white/20 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-black/70" />

          {/* Left side - Mobile Menu + Page Title */}
          <div className="relative z-10 flex items-center gap-4">
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <MenuIcon className="size-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SheetHeader className="border-b border-white/20 px-6 py-4 dark:border-white/10">
                  <SheetTitle className="flex items-center gap-3">
                    <div className="bg-primary flex size-8 items-center justify-center rounded-lg">
                      <span className="text-sm font-bold text-white">P</span>
                    </div>
                    Admin
                  </SheetTitle>
                </SheetHeader>
                <div className="p-4">
                  <DashboardNav onItemClick={() => setMobileNavOpen(false)} />
                </div>
                <div className="mt-auto border-t border-white/20 p-4 dark:border-white/10">
                  <Link
                    href="/"
                    onClick={() => setMobileNavOpen(false)}
                    className="text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <StoreIcon className="size-5" />
                    Back to Shop
                  </Link>
                </div>
              </SheetContent>
            </Sheet>

            {/* Page Title */}
            <h1 className="text-foreground text-lg font-semibold">
              {pageTitle}
            </h1>
          </div>

          {/* User Menu */}
          <div className="relative z-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus-visible:ring-primary/30 relative flex size-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-105 hover:bg-neutral-100 focus-visible:ring-2 focus-visible:outline-none dark:hover:bg-neutral-800">
                  {user?.imageUrl ? (
                    <div className="relative size-8">
                      <OptimizedImage
                        src={user.imageUrl}
                        alt={user.fullName || "Profile"}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-full">
                      <span className="text-sm font-semibold">
                        {user?.firstName?.[0] ||
                          user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ||
                          "U"}
                      </span>
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="truncate text-sm font-medium">
                    {user?.fullName || user?.emailAddresses?.[0]?.emailAddress}
                  </p>
                  <p className="text-muted-foreground truncate text-xs">
                    {user?.emailAddresses?.[0]?.emailAddress}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleGoHome}
                  className="cursor-pointer"
                >
                  <HomeIcon className="mr-2 size-4" />
                  Go to Home
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOutIcon className="mr-2 size-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-neutral-50/50 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
