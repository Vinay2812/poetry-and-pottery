"use client";

import Link from "next/link";
import { redirect } from "next/navigation";

import { cn } from "@/lib/utils";

import { EVENTS_TABS, EVENTS_TABS_MAP, TabType } from "./events-list-layout";

interface EventsTabsProps {
  activeTab: TabType;
  registeredCount?: number;
}

export function EventsTabs({
  activeTab,
  registeredCount = 0,
}: EventsTabsProps) {
  const isShowRegistered = registeredCount > 0;

  const TABS = EVENTS_TABS.filter((tab) => {
    if (tab.type === TabType.REGISTERED) {
      return isShowRegistered;
    }
    return true;
  });

  if (!isShowRegistered && activeTab === TabType.REGISTERED) {
    return redirect(EVENTS_TABS_MAP[TabType.UPCOMING].href);
  }

  return (
    <div className="mb-6 flex gap-2">
      {TABS.map((tab) => (
        <Link
          key={tab.type}
          href={tab.href}
          className={cn(
            "flex items-center rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4",
            activeTab === tab.type
              ? "bg-primary text-primary-foreground"
              : "border-border text-foreground hover:bg-muted border bg-white",
          )}
        >
          <span className="hidden sm:inline">{tab.desktopLabel}</span>
          <span className="sm:hidden">{tab.mobileLabel}</span>
          {tab.type === TabType.REGISTERED && (
            <span
              className={cn(
                "ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full text-xs font-bold",
                activeTab !== TabType.REGISTERED
                  ? "bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:bg-muted border bg-white",
              )}
            >
              {registeredCount}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
