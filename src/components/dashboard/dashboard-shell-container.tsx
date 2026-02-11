"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { useRouteAnimation } from "@/components/providers/route-animation-provider";

import { DashboardShell } from "./dashboard-shell";
import type { DashboardShellViewModel } from "./dashboard-shell";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/users": "Users",
  "/dashboard/products": "Products",
  "/dashboard/categories": "Categories",
  "/dashboard/events": "Events",
  "/dashboard/daily-workshops": "Daily Workshops",
  "/dashboard/content": "Content",
  "/dashboard/settings": "Settings",
};

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) {
    return PAGE_TITLES[pathname];
  }
  for (const [path, title] of Object.entries(PAGE_TITLES)) {
    if (pathname.startsWith(path) && path !== "/dashboard") {
      return title;
    }
  }
  return "Dashboard";
}

const SIDEBAR_COLLAPSED_KEY = "dashboard-sidebar-collapsed";

interface DashboardShellContainerProps {
  children: React.ReactNode;
}

export function DashboardShellContainer({
  children,
}: DashboardShellContainerProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true",
  );
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const { startNavigation } = useRouteAnimation();
  const pathname = usePathname();

  const handleToggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => {
      const newValue = !prev;
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(newValue));
      return newValue;
    });
  }, []);

  const handleSignOut = useCallback(() => {
    signOut({ redirectUrl: "/" });
  }, [signOut]);

  const handleGoHome = useCallback(() => {
    startNavigation(() => {
      router.push("/");
    });
  }, [router, startNavigation]);

  const handleMobileNavToggle = useCallback((open: boolean) => {
    setMobileNavOpen(open);
  }, []);

  const handleMobileNavClose = useCallback(() => {
    setMobileNavOpen(false);
  }, []);

  const viewModel = useMemo<DashboardShellViewModel>(() => {
    const pageTitle = getPageTitle(pathname);
    const userInitial =
      user?.firstName?.[0] ||
      user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ||
      "U";
    const userDisplayName =
      user?.fullName || user?.emailAddresses?.[0]?.emailAddress || "";
    const userEmail = user?.emailAddresses?.[0]?.emailAddress || "";

    return {
      pageTitle,
      isSidebarCollapsed: isCollapsed,
      isMobileNavOpen: mobileNavOpen,
      userImageUrl: user?.imageUrl || null,
      userInitial,
      userDisplayName,
      userEmail,
    };
  }, [pathname, isCollapsed, mobileNavOpen, user]);

  return (
    <DashboardShell
      viewModel={viewModel}
      onToggleSidebar={handleToggleSidebar}
      onSignOut={handleSignOut}
      onGoHome={handleGoHome}
      onMobileNavToggle={handleMobileNavToggle}
      onMobileNavClose={handleMobileNavClose}
    >
      {children}
    </DashboardShell>
  );
}
