"use client";

import { usePathInfo } from "@/hooks/use-path-info";
import { useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";

import { PageSkeleton } from "@/components/skeletons";

interface RouteGuardProviderProps {
  children: ReactNode;
  fallbackUrl?: string;
}

export function RouteGuardProvider({ children }: RouteGuardProviderProps) {
  const { isLoaded, isSignedIn, sessionClaims } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const hasRefreshed = useRef(false);
  const { isAuthRequiredRoute } = usePathInfo();

  useEffect(() => {
    if (!isLoaded || isSignedIn || !isAuthRequiredRoute) return;

    const returnUrl = encodeURIComponent(pathname);
    router.push(`/sign-in?redirect_url=${returnUrl}`);
  }, [isLoaded, isSignedIn, router, pathname, isAuthRequiredRoute]);

  // Refresh when user is signed in on initial mount to ensure fresh data
  // This handles the case where user is redirected back after login
  useEffect(() => {
    if (isLoaded && isSignedIn && !hasRefreshed.current && sessionClaims) {
      hasRefreshed.current = true;
      router.refresh();
    }
  }, [isLoaded, isSignedIn, router, sessionClaims]);

  // Show loading while checking auth status
  if (!isLoaded) {
    return <PageSkeleton />;
  }

  return <>{children}</>;
}
