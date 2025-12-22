"use client";

import { UserRole } from "@/prisma/generated/enums";
import { useOrderStore } from "@/store";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { AccountDropdown } from "../components/account-dropdown";
import type { AccountDropdownViewModel, UserInfo } from "../types";

export function AccountDropdownContainer() {
  const { openUserProfile, signOut } = useClerk();
  const { user } = useUser();
  const { sessionClaims } = useAuth();
  const router = useRouter();
  const pendingOrdersCount = useOrderStore((state) => state.getPendingCount());

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
      router.push(path);
    },
    [router],
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
