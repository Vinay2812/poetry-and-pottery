"use client";

import { useUIStore } from "@/store";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useRouteAnimation } from "@/components/providers/route-animation-provider";

import { createDate } from "@/lib/date";

import { ProfileClient } from "./profile-client";
import type { ProfileViewModel } from "./types";

export function ProfileContainer() {
  const { user } = useUser();
  const { openUserProfile, signOut } = useClerk();
  const router = useRouter();
  const { startNavigation } = useRouteAnimation();

  const wishlistCount = useUIStore((state) => state.wishlistCount);
  const pendingOrdersCount = useUIStore((state) => state.pendingOrdersCount);
  const eventRegistrationsCount = useUIStore(
    (state) => state.eventRegistrationsCount,
  );

  const viewModel: ProfileViewModel = useMemo(() => {
    const firstName = user?.firstName || "";
    const lastName = user?.lastName || "";
    const fullName = [firstName, lastName].filter(Boolean).join(" ") || "User";
    const email = user?.emailAddresses[0]?.emailAddress || "";
    const imageUrl = user?.imageUrl || "";

    const initials =
      firstName && lastName
        ? `${firstName.charAt(0)}${lastName.charAt(0)}`
        : firstName
          ? firstName.charAt(0)
          : email.charAt(0).toUpperCase();

    const createdAt = user?.createdAt;
    const memberSince = createdAt
      ? createDate(createdAt).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "";

    return {
      fullName,
      initials,
      email,
      imageUrl,
      memberSince,
      accountItems: [
        {
          icon: "package" as const,
          label: "My Orders",
          href: "/orders",
          count: pendingOrdersCount > 0 ? pendingOrdersCount : undefined,
        },
        {
          icon: "heart" as const,
          label: "Wishlist",
          href: "/wishlist",
          count: wishlistCount > 0 ? wishlistCount : undefined,
        },
        {
          icon: "calendar" as const,
          label: "Workshop Registrations",
          href: "/events/registrations",
          count:
            eventRegistrationsCount > 0 ? eventRegistrationsCount : undefined,
        },
      ],
      settingsItems: [
        {
          icon: "message-circle" as const,
          label: "Contact Us",
          href: "/contact",
        },
        {
          icon: "help-circle" as const,
          label: "Help & Support",
          href: "/faq",
        },
      ],
    };
  }, [user, wishlistCount, pendingOrdersCount, eventRegistrationsCount]);

  const handleNavigate = useCallback(
    (path: string) => {
      startNavigation(() => {
        router.push(path);
      });
    },
    [router, startNavigation],
  );

  const handleProfileSettings = useCallback(() => {
    openUserProfile();
  }, [openUserProfile]);

  const handleSignOut = useCallback(() => {
    signOut({ redirectUrl: "/" });
  }, [signOut]);

  return (
    <ProfileClient
      viewModel={viewModel}
      onNavigate={handleNavigate}
      onProfileSettings={handleProfileSettings}
      onSignOut={handleSignOut}
    />
  );
}
