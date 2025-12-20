"use client";

import { useEventStore } from "@/store/event.store";
import { Calendar, Ticket } from "lucide-react";
import { redirect, usePathname } from "next/navigation";

import { EventsTabs } from "@/components/events";
import { MobileHeader } from "@/components/layout";

interface EventsListLayoutProps {
  children: React.ReactNode;
}

export enum TabType {
  EVENTS = "events",
  REGISTRATIONS = "registrations",
}

export const EVENTS_TABS_MAP = {
  [TabType.EVENTS]: {
    href: "/events",
    type: TabType.EVENTS,
    mobileLabel: "All Workshops",
    desktopLabel: "All Workshops",
    icon: Calendar,
  },
  [TabType.REGISTRATIONS]: {
    href: "/events/registrations",
    type: TabType.REGISTRATIONS,
    mobileLabel: "My Registrations",
    desktopLabel: "My Registrations",
    icon: Ticket,
  },
};

export const EVENTS_TABS = Object.values(EVENTS_TABS_MAP);

export function EventsListLayout({ children }: EventsListLayoutProps) {
  const pathname = usePathname();
  const registrationCount = useEventStore((state) => state.getCount());

  // Match exact paths or paths starting with the tab href (but not for /events which is exact match only)
  const activeTab = EVENTS_TABS.find((tab) => {
    if (tab.type === TabType.EVENTS) {
      // For events tab, only match exact /events path
      return pathname === tab.href;
    }
    return pathname === tab.href || pathname.startsWith(`${tab.href}/`);
  })?.type;

  if (!activeTab) {
    return redirect(EVENTS_TABS_MAP[TabType.EVENTS].href);
  }

  return (
    <>
      <MobileHeader title="Pottery Workshops" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 hidden lg:block">
            <h1 className="mb-2 text-2xl font-bold lg:text-3xl">
              Pottery Workshops
            </h1>
            <p className="text-muted-foreground">
              Join our hands-on pottery sessions and create something beautiful.
            </p>
          </div>

          {/* Tab Navigation */}
          <EventsTabs
            activeTab={activeTab}
            registeredCount={registrationCount}
          />

          {/* Page Content */}
          {children}
        </div>
      </main>
    </>
  );
}
