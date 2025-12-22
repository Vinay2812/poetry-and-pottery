"use client";

import { UserRole } from "@/prisma/generated/enums";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";

import { DashboardSkeleton } from "@/components/skeletons";

import { ENVIRONMENT } from "@/lib/env.consts";

interface AdminRouteGuardProviderProps {
  children: ReactNode;
}

export function AdminRouteGuardProvider({
  children,
}: AdminRouteGuardProviderProps) {
  const { isLoaded, isSignedIn, sessionClaims } = useAuth();
  const router = useRouter();
  const hasRefreshed = useRef(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      const returnUrl = encodeURIComponent("/dashboard");
      router.push(`/sign-in?redirect_url=${returnUrl}`);
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (isLoaded && isSignedIn && sessionClaims) {
      const role = sessionClaims.role;
      const environment = sessionClaims.environment;

      // If not admin, redirect to home
      if (role !== UserRole.ADMIN || environment !== ENVIRONMENT) {
        router.push("/");
      }
    }
  }, [isLoaded, isSignedIn, sessionClaims, router]);

  // Refresh when user is signed in on initial mount to ensure fresh data
  useEffect(() => {
    if (isLoaded && isSignedIn && !hasRefreshed.current && sessionClaims) {
      hasRefreshed.current = true;
      router.refresh();
    }
  }, [isLoaded, isSignedIn, router, sessionClaims]);

  // Show loading while checking auth status
  if (!isLoaded) {
    return <DashboardSkeleton />;
  }

  // Show loading while redirecting (not signed in, claims not loaded, or not admin)
  if (!isSignedIn || !sessionClaims || sessionClaims.role !== UserRole.ADMIN) {
    return <DashboardSkeleton />;
  }

  return <>{children}</>;
}
