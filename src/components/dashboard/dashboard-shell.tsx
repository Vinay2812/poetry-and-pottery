"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  StoreIcon,
} from "lucide-react";
import Link from "next/link";

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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

import { DashboardNav } from "./dashboard-nav";

export interface DashboardShellViewModel {
  pageTitle: string;
  isSidebarCollapsed: boolean;
  isMobileNavOpen: boolean;
  userImageUrl: string | null;
  userInitial: string;
  userDisplayName: string;
  userEmail: string;
}

interface DashboardShellProps {
  viewModel: DashboardShellViewModel;
  children: React.ReactNode;
  onToggleSidebar: () => void;
  onSignOut: () => void;
  onGoHome: () => void;
  onMobileNavToggle: (open: boolean) => void;
  onMobileNavClose: () => void;
}

export function DashboardShell({
  viewModel,
  children,
  onToggleSidebar,
  onSignOut,
  onGoHome,
  onMobileNavToggle,
  onMobileNavClose,
}: DashboardShellProps) {
  const {
    pageTitle,
    isSidebarCollapsed,
    isMobileNavOpen,
    userImageUrl,
    userInitial,
    userDisplayName,
    userEmail,
  } = viewModel;

  return (
    <div className="min-h-screen">
      {/* Desktop Sidebar - Fixed */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden border-r border-white/20 bg-white/70 backdrop-blur-xl transition-all duration-300 lg:block dark:border-white/10 dark:bg-black/70",
          isSidebarCollapsed ? "w-[72px]" : "w-64",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div
            className={cn(
              "flex h-16 items-center border-b border-white/20 dark:border-white/10",
              isSidebarCollapsed ? "justify-center px-2" : "px-6",
            )}
          >
            <Link
              href="/dashboard"
              className={cn(
                "group flex items-center",
                isSidebarCollapsed ? "justify-center" : "gap-3",
              )}
            >
              <div className="bg-primary shadow-primary/20 flex size-10 shrink-0 items-center justify-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                <span className="text-lg font-bold text-white">P</span>
              </div>
              {!isSidebarCollapsed && (
                <span className="text-foreground text-xl font-bold tracking-tight">
                  Admin
                </span>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <div
            className={cn(
              "flex-1 overflow-y-auto",
              isSidebarCollapsed ? "p-2" : "p-4",
            )}
          >
            <DashboardNav isCollapsed={isSidebarCollapsed} />
          </div>

          {/* Footer */}
          <div
            className={cn(
              "border-t border-white/20 dark:border-white/10",
              isSidebarCollapsed ? "p-2" : "p-4",
            )}
          >
            {isSidebarCollapsed ? (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground flex size-11 items-center justify-center rounded-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <StoreIcon className="size-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Back to Shop</TooltipContent>
              </Tooltip>
            ) : (
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <StoreIcon className="size-5" />
                Back to Shop
              </Link>
            )}
          </div>

          {/* Collapse Toggle Button */}
          <div className="border-t border-white/20 p-2 dark:border-white/10">
            <button
              onClick={onToggleSidebar}
              className="text-muted-foreground hover:text-foreground flex w-full items-center justify-center rounded-lg p-2.5 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label={
                isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
            >
              {isSidebarCollapsed ? (
                <ChevronRightIcon className="size-5" />
              ) : (
                <ChevronLeftIcon className="size-5" />
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content - with left margin for sidebar on desktop */}
      <div
        className={cn(
          "flex min-h-screen flex-col transition-all duration-300",
          isSidebarCollapsed ? "lg:ml-[72px]" : "lg:ml-64",
        )}
      >
        {/* Top Header - Glassmorphism style */}
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between px-4 lg:px-6">
          <div className="absolute inset-0 border-b border-white/20 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-black/70" />

          {/* Left side - Mobile Menu + Page Title */}
          <div className="relative z-10 flex items-center gap-4">
            <Sheet open={isMobileNavOpen} onOpenChange={onMobileNavToggle}>
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
                  <DashboardNav onItemClick={onMobileNavClose} />
                </div>
                <div className="mt-auto border-t border-white/20 p-4 dark:border-white/10">
                  <Link
                    href="/"
                    onClick={onMobileNavClose}
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
                  {userImageUrl ? (
                    <div className="relative size-8">
                      <OptimizedImage
                        src={userImageUrl}
                        alt={userDisplayName || "Profile"}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-full">
                      <span className="text-sm font-semibold">
                        {userInitial}
                      </span>
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="truncate text-sm font-medium">
                    {userDisplayName}
                  </p>
                  <p className="text-muted-foreground truncate text-xs">
                    {userEmail}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onGoHome} className="cursor-pointer">
                  <HomeIcon className="mr-2 size-4" />
                  Go to Home
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onSignOut}
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
