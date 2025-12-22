"use client";

import { useAuthAction } from "@/hooks/use-auth-action";
import { motion } from "framer-motion";
import { CalendarDays, Ticket } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { cn } from "@/lib/utils";

export enum TabType {
  ALL = "all",
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
}

export function EventsTabs({
  activeTab,
  registeredCount = 0,
}: EventsTabsProps) {
  const router = useRouter();

  const { requireAuth } = useAuthAction();

  const handleTabClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, tab: TabType, href: string) => {
      e.preventDefault();
      if (tab === TabType.REGISTRATIONS) {
        requireAuth(async () => {
          router.push(href);
        });
      } else {
        router.push(href);
      }
    },
    [router, requireAuth],
  );

  return (
    <div className="mb-6 flex justify-start gap-2 sm:gap-4">
      {EVENTS_TABS.map((tab) => {
        const isActive = tab.type === activeTab;
        const Icon = tab.icon;
        const showBadge =
          tab.type === TabType.REGISTRATIONS && registeredCount > 0;

        return (
          <Link
            key={tab.type}
            href={tab.href}
            className={cn(
              "group relative flex min-w-32 flex-col items-center gap-2 rounded-2xl px-4 py-3 transition-all duration-200 sm:min-w-32 sm:px-6 sm:py-4 lg:min-w-48",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            onClick={(e) => handleTabClick(e, tab.type, tab.href)}
          >
            {/* Icon container */}
            <div className="relative">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              >
                <Icon
                  className={cn(
                    "size-6 transition-colors duration-200 sm:size-7",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </motion.div>

              {/* Badge */}
              {showBadge && (
                <span className="bg-primary text-primary-foreground absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold shadow-sm">
                  {registeredCount}
                </span>
              )}
            </div>

            {/* Label */}
            <span
              className={cn(
                "text-xs font-medium transition-colors duration-200 sm:text-sm",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-foreground",
              )}
            >
              <span className="hidden sm:inline">{tab.desktopLabel}</span>
              <span className="sm:hidden">{tab.mobileLabel}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
