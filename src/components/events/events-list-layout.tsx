"use client";

import { MobileHeaderContainer } from "@/features/layout";
import { useUIStore } from "@/store";
import { redirect, usePathname } from "next/navigation";

import { ListingPageHeader } from "../shared";
import { SearchInput } from "../shared";
import { EVENTS_TABS, EventsTabs, TabType } from "./events-tabs";

interface EventsListLayoutProps {
  children: React.ReactNode;
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
  searchPlaceholder?: string;
}

export function EventsListLayout({
  children,
  onSearchChange,
  searchQuery,
  searchPlaceholder = "Search events...",
}: EventsListLayoutProps) {
  const pathname = usePathname();
  const registrationCount = useUIStore(
    (state) => state.eventRegistrationsCount,
  );

  // Match paths to determine active tab (check longer paths first)
  const sortedTabs = [...EVENTS_TABS].sort(
    (a, b) => b.href.length - a.href.length,
  );
  const activeTab = sortedTabs.find((tab) => {
    return pathname === tab.href || pathname.startsWith(`${tab.href}/`);
  })?.type;

  if (!activeTab) {
    return redirect("/events");
  }

  return (
    <>
      <MobileHeaderContainer title="Pottery Workshops" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          {/* Header */}
          <ListingPageHeader
            title="Pottery Workshops"
            subtitle="Join our hands-on pottery sessions and create something beautiful."
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "Workshops" }]}
          />

          {/* Tab Navigation */}
          <EventsTabs
            activeTab={activeTab}
            registeredCount={registrationCount}
          />

          {/* Search Bar */}
          {onSearchChange && searchQuery !== undefined && (
            <div className="mb-6 flex justify-center">
              <SearchInput
                value={searchQuery}
                onChange={onSearchChange}
                placeholder={searchPlaceholder}
                className="flex w-full max-w-md items-center justify-center"
              />
            </div>
          )}

          {/* Page Content */}
          {children}
        </div>
      </main>
    </>
  );
}

// Re-export for backward compatibility
export { TabType, EVENTS_TABS };
