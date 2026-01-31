"use client";

import { useAuthAction } from "@/hooks/use-auth-action";
import { CalendarDays, History, Sparkles, Ticket } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";

import { useRouteAnimation } from "@/components/providers/route-animation-provider";

import { cn } from "@/lib/utils";

export enum TabType {
  ALL = "all",
  UPCOMING = "upcoming",
  PAST = "past",
  REGISTRATIONS = "registrations",
}

export const EVENTS_TABS = [
  {
    type: TabType.ALL,
    href: "/events",
    icon: CalendarDays,
    mobileLabel: "All",
    desktopLabel: "All Events",
  },
  {
    type: TabType.UPCOMING,
    href: "/events/upcoming",
    icon: Sparkles,
    mobileLabel: "Upcoming",
    desktopLabel: "Upcoming",
  },
  {
    type: TabType.PAST,
    href: "/events/past",
    icon: History,
    mobileLabel: "Past",
    desktopLabel: "Past Workshops",
  },
  {
    type: TabType.REGISTRATIONS,
    href: "/events/registrations",
    icon: Ticket,
    mobileLabel: "Registrations",
    desktopLabel: "My Registrations",
  },
];

interface EventsTabsProps {
  activeTab: TabType;
  registeredCount?: number;
  queryString?: string;
}

export function EventsTabs({
  activeTab,
  registeredCount = 0,
  queryString = "",
}: EventsTabsProps) {
  const router = useRouter();
  const { startNavigation } = useRouteAnimation();
  const tabsRef = useRef<HTMLDivElement>(null);

  const { requireAuth } = useAuthAction();

  const getTabHref = useCallback(
    (baseHref: string) => {
      return queryString ? `${baseHref}?${queryString}` : baseHref;
    },
    [queryString],
  );

  const handleTabClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, tab: TabType, href: string) => {
      e.preventDefault();
      const fullHref = getTabHref(href);
      if (tab === TabType.REGISTRATIONS) {
        requireAuth(async () => {
          startNavigation(() => {
            router.push(fullHref);
          });
        });
      } else {
        startNavigation(() => {
          router.push(fullHref);
        });
      }
    },
    [router, requireAuth, startNavigation, getTabHref],
  );

  return (
    <div className="mb-4 lg:mb-6">
      {/* Tabs container with horizontal scroll on mobile */}
      <div
        ref={tabsRef}
        className="scrollbar-hide -mx-4 flex items-center gap-1 overflow-x-auto px-4 sm:mx-0 sm:gap-2 sm:px-0"
      >
        {EVENTS_TABS.map((tab) => {
          const isActive = tab.type === activeTab;
          const showBadge =
            tab.type === TabType.REGISTRATIONS && registeredCount > 0;

          return (
            <Link
              key={tab.type}
              href={getTabHref(tab.href)}
              className={cn(
                "relative flex shrink-0 items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors sm:px-4 sm:py-3",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
              onClick={(e) => handleTabClick(e, tab.type, tab.href)}
            >
              <span className="hidden sm:inline">{tab.desktopLabel}</span>
              <span className="sm:hidden">{tab.mobileLabel}</span>

              {/* Badge for registrations */}
              {showBadge && (
                <span className="bg-primary text-primary-foreground ml-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold">
                  {registeredCount}
                </span>
              )}

              {/* Active underline indicator */}
              {isActive && (
                <span className="bg-primary absolute right-3 bottom-0 left-3 h-0.5 rounded-full sm:right-4 sm:left-4" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom border */}
      <div className="border-border -mx-4 border-b sm:mx-0" />
    </div>
  );
}
