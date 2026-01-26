"use client";

import { UserRole } from "@/prisma/generated/enums";
import { useUIStore } from "@/store";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useRouteAnimation } from "@/components/providers/route-animation-provider";

import { AccountDropdown } from "../components/account-dropdown";
import type { AccountDropdownViewModel, UserInfo } from "../types";

export function AccountDropdownContainer() {
  const { openUserProfile, signOut } = useClerk();
  const { user } = useUser();
  const { sessionClaims } = useAuth();
  const router = useRouter();
  const { startNavigation } = useRouteAnimation();
  const pendingOrdersCount = useUIStore((state) => state.pendingOrdersCount);

  const viewModel: AccountDropdownViewModel = useMemo(() => {
    const userInfo: UserInfo | null = user
      ? {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.emailAddresses[0]?.emailAddress || null,
          imageUrl: user.imageUrl,
        }
      : null;

    return {
      user: userInfo,
      isAdmin: sessionClaims?.role === UserRole.ADMIN,
      pendingOrdersCount,
    };
  }, [user, sessionClaims?.role, pendingOrdersCount]);

  const handleProfileSettings = useCallback(() => {
    openUserProfile();
  }, [openUserProfile]);

  const handleSignOut = useCallback(() => {
    signOut({ redirectUrl: "/" });
  }, [signOut]);

  const handleNavigate = useCallback(
    (path: string) => {
      startNavigation(() => {
        router.push(path);
      });
    },
    [router, startNavigation],
  );

  return (
    <AccountDropdown
      viewModel={viewModel}
      onProfileSettings={handleProfileSettings}
      onSignOut={handleSignOut}
      onNavigate={handleNavigate}
    />
  );
}
