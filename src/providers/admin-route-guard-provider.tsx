"use client";

import { usePathInfo } from "@/hooks/use-path-info";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";

import { useRouteAnimation } from "@/components/providers/route-animation-provider";
import { DashboardSkeleton } from "@/components/skeletons";

import { UserRole } from "@/graphql/generated/types";

interface AdminRouteGuardProviderProps {
  children: ReactNode;
}

export function AdminRouteGuardProvider({
  children,
}: AdminRouteGuardProviderProps) {
  const { isLoaded, isSignedIn, sessionClaims } = useAuth();
  const router = useRouter();
  const { startNavigation } = useRouteAnimation();
  const hasRefreshed = useRef(false);
  const { isAdminRoute } = usePathInfo();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isAdminRoute) return;

    if (!isSignedIn) {
      const returnUrl = encodeURIComponent("/dashboard");
      startNavigation(() => {
        router.push(`/sign-in?redirect_url=${returnUrl}`);
      });
      return;
    }

    const role = sessionClaims?.role;
    if (role !== UserRole.Admin) {
      startNavigation(() => {
        router.push("/");
      });
      return;
    }
  }, [
    isLoaded,
    isSignedIn,
    router,
    isAdminRoute,
    sessionClaims?.role,
    startNavigation,
  ]);

  // Refresh when user is signed in on initial mount to ensure fresh data
  useEffect(() => {
    if (isLoaded && isSignedIn && !hasRefreshed.current && sessionClaims) {
      hasRefreshed.current = true;
      router.refresh();
    }
  }, [isLoaded, isSignedIn, router, sessionClaims]);

  // Show loading only for admin routes
  if (!isLoaded && isAdminRoute) {
    return <DashboardSkeleton />;
  }

  return <>{children}</>;
}
