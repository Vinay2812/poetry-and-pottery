"use client";

import { MobileHeaderContainer } from "@/features/layout";
import { useUIStore } from "@/store";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  Calendar,
  ChevronRight,
  Heart,
  HelpCircle,
  LogOut,
  MessageCircle,
  Package,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useRouteAnimation } from "@/components/providers/route-animation-provider";
import { ListingPageHeader } from "@/components/shared";

import { createDate } from "@/lib/date";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  count?: number;
  onClick?: () => void;
  variant?: "default" | "danger";
}

interface MenuSection {
  title?: string;
  items: MenuItem[];
}

interface ProfileViewModel {
  firstName: string;
  lastName: string;
  fullName: string;
  initials: string;
  email: string;
  imageUrl: string;
  memberSince: string;
  menuSections: MenuSection[];
}

export function ProfileClient() {
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

    // Get initials
    const initials =
      firstName && lastName
        ? `${firstName.charAt(0)}${lastName.charAt(0)}`
        : firstName
          ? firstName.charAt(0)
          : email.charAt(0).toUpperCase();

    // Format member since date
    const createdAt = user?.createdAt;
    const memberSince = createdAt
      ? createDate(createdAt).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "";

    const menuSections: MenuSection[] = [
      {
        items: [
          {
            icon: <Package className="h-5 w-5" />,
            label: "My Orders",
            href: "/orders",
            count: pendingOrdersCount > 0 ? pendingOrdersCount : undefined,
          },
          {
            icon: <Heart className="h-5 w-5" />,
            label: "Wishlist",
            href: "/wishlist",
            count: wishlistCount > 0 ? wishlistCount : undefined,
          },
          {
            icon: <Calendar className="h-5 w-5" />,
            label: "Workshop Registrations",
            href: "/events/registrations",
            count:
              eventRegistrationsCount > 0 ? eventRegistrationsCount : undefined,
          },
        ],
      },
      {
        title: "Settings",
        items: [
          {
            icon: <MessageCircle className="h-5 w-5" />,
            label: "Contact Us",
            href: "/contact",
          },
          {
            icon: <HelpCircle className="h-5 w-5" />,
            label: "Help & Support",
            href: "/faq",
          },
        ],
      },
    ];

    return {
      firstName,
      lastName,
      fullName,
      initials,
      email,
      imageUrl,
      memberSince,
      menuSections,
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
    <>
      <MobileHeaderContainer title="My Profile" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
        <div className="container mx-auto px-4 py-0 lg:px-8">
          {/* Desktop Page Header */}
          <div className="hidden lg:block">
            <ListingPageHeader
              title="My Profile"
              breadcrumbs={[{ label: "Home", href: "/" }, { label: "Profile" }]}
            />
          </div>

          <div className="mx-auto max-w-3xl">
            {/* Profile Card - Horizontal Layout */}
            <div className="shadow-soft mb-4 rounded-2xl bg-white p-4 lg:mb-6 lg:p-5">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full lg:h-[100px] lg:w-[100px]">
                  {viewModel.imageUrl ? (
                    <Image
                      src={viewModel.imageUrl}
                      alt={viewModel.fullName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="from-primary flex h-full w-full items-center justify-center bg-gradient-to-br to-[#6B8F6E] text-2xl font-bold text-white lg:text-4xl">
                      {viewModel.initials}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <h2 className="font-display truncate text-lg font-semibold text-neutral-900 lg:text-xl">
                    {viewModel.fullName}
                  </h2>
                  <p className="text-muted-foreground truncate text-sm">
                    {viewModel.email}
                  </p>
                  {viewModel.memberSince && (
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      Member since {viewModel.memberSince}
                    </p>
                  )}
                </div>

                {/* Edit Button - Desktop/Tablet */}
                <button
                  onClick={handleProfileSettings}
                  className="text-primary hover:bg-primary-lighter hidden items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium transition-colors sm:flex"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden lg:inline">Edit</span>
                </button>
              </div>
            </div>

            {/* Menu Sections */}
            <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
              {/* Account Section */}
              <div className="shadow-soft rounded-2xl bg-white">
                <div className="divide-y divide-neutral-100">
                  {viewModel.menuSections[0].items.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => item.href && handleNavigate(item.href)}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors first:rounded-t-2xl last:rounded-b-2xl hover:bg-neutral-50/80"
                    >
                      <div className="bg-primary-lighter text-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl">
                        {item.icon}
                      </div>
                      <span className="min-w-0 flex-1 font-medium text-neutral-900">
                        {item.label}
                      </span>
                      {item.count !== undefined && (
                        <span className="text-muted-foreground text-sm tabular-nums">
                          {item.count}
                        </span>
                      )}
                      <ChevronRight className="text-muted-foreground h-5 w-5 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Settings Section */}
              <div className="space-y-4">
                {/* Settings Title - Mobile Only */}
                <h3 className="font-display px-1 text-sm font-semibold text-neutral-900 lg:hidden">
                  Settings
                </h3>

                <div className="shadow-soft rounded-2xl bg-white">
                  <div className="divide-y divide-neutral-100">
                    {viewModel.menuSections[1].items.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => item.href && handleNavigate(item.href)}
                        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors first:rounded-t-2xl last:rounded-b-2xl hover:bg-neutral-50/80"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
                          {item.icon}
                        </div>
                        <span className="min-w-0 flex-1 font-medium text-neutral-900">
                          {item.label}
                        </span>
                        <ChevronRight className="text-muted-foreground h-5 w-5 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sign Out Button */}
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3.5 font-medium text-red-600 transition-colors hover:bg-red-100"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
