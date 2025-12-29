"use client";

import { useUIStore } from "@/store/ui.store";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

export function useAuthAction() {
  const { isSignedIn, sessionClaims } = useAuth();
  const pathname = usePathname();
  const { setSignInModalOpen, setSignInRedirectUrl } = useUIStore();

  const requireAuth = useCallback(
    <T>(callback: () => T | Promise<T>): T | Promise<T> | undefined => {
      if (isSignedIn && sessionClaims?.dbUserId) {
        return callback();
      } else {
        setSignInRedirectUrl(pathname);
        setSignInModalOpen(true);
        return undefined;
      }
    },
    [
      isSignedIn,
      sessionClaims?.dbUserId,
      pathname,
      setSignInModalOpen,
      setSignInRedirectUrl,
    ],
  );

  return { isSignedIn, requireAuth, userId: sessionClaims?.dbUserId };
}
