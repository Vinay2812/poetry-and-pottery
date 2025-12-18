"use client";

import { useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton";

interface RouteGuardProviderProps {
  children: ReactNode;
  fallbackUrl?: string;
}

function LoadingSkeleton() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-4">
        <Skeleton className="mx-auto h-12 w-12 rounded-full" />
        <Skeleton className="mx-auto h-4 w-48" />
        <Skeleton className="mx-auto h-4 w-32" />
      </div>
    </div>
  );
}

export function RouteGuardProvider({
  children,
  fallbackUrl = "/sign-in",
}: RouteGuardProviderProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Store intended destination for post-login redirect
      const returnUrl = encodeURIComponent(pathname);
      router.push(`${fallbackUrl}?redirect_url=${returnUrl}`);
    }
  }, [isLoaded, isSignedIn, router, pathname, fallbackUrl]);

  // Show loading while checking auth status
  if (!isLoaded) {
    return <LoadingSkeleton />;
  }

  // Show loading while redirecting
  if (!isSignedIn) {
    return <LoadingSkeleton />;
  }

  return <>{children}</>;
}
