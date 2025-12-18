"use client";

import { useEventStore } from "@/store/event.store";
import { Calendar, History, Ticket } from "lucide-react";
import { redirect, usePathname } from "next/navigation";

import { EventsTabs } from "@/components/events";
import { MobileHeader } from "@/components/layout";

interface EventsListLayoutProps {
  children: React.ReactNode;
}

export enum TabType {
  UPCOMING = "upcoming",
  REGISTERED = "registered",
  PAST = "past",
}

export const EVENTS_TABS_MAP = {
  [TabType.REGISTERED]: {
    href: "/events/registrations",
    type: TabType.REGISTERED,
    mobileLabel: "Registered",
    desktopLabel: "My Registrations",
    icon: Ticket,
  },
  [TabType.UPCOMING]: {
    href: "/events/upcoming",
    type: TabType.UPCOMING,
    mobileLabel: "Upcoming",
    desktopLabel: "Upcoming Sessions",
    icon: Calendar,
  },
  [TabType.PAST]: {
    href: "/events/past",
    type: TabType.PAST,
    mobileLabel: "Past",
    desktopLabel: "Past Events",
    icon: History,
  },
};

export const EVENTS_TABS = Object.values(EVENTS_TABS_MAP);

export function EventsListLayout({ children }: EventsListLayoutProps) {
  const pathname = usePathname();
  const registrationCount = useEventStore((state) => state.getCount());

  const activeTab = EVENTS_TABS.find(
    (tab) => pathname === tab.href || pathname.startsWith(`${tab.href}/`),
  )?.type;

  if (!activeTab) {
    return redirect(EVENTS_TABS_MAP[TabType.UPCOMING].href);
  }

  return (
    <>
      <MobileHeader title="Pottery Workshops" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-0 lg:pb-12">
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
