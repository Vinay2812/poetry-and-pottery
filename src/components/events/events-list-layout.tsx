"use client";

import { MobileHeaderContainer } from "@/features/layout";
import { useUIStore } from "@/store";
import { Filter, SlidersHorizontal } from "lucide-react";
import { redirect, usePathname } from "next/navigation";

import { ListingPageHeader, SearchInput } from "../shared";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { EVENTS_TABS, EventsTabs, TabType } from "./events-tabs";

export type EventSortOption = "soonest" | "price-low" | "price-high";
export type EventTypeFilter = "all" | "workshop" | "open_mic";

interface EventsListLayoutProps {
  children: React.ReactNode;
  totalEvents?: number;
  sortBy?: EventSortOption;
  onSortChange?: (sort: EventSortOption) => void;
  eventTypeFilter?: EventTypeFilter;
  onEventTypeFilterChange?: (filter: EventTypeFilter) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onFilterClick?: () => void;
  showFilters?: boolean;
  queryString?: string;
}

export function EventsListLayout({
  children,
  totalEvents,
  sortBy = "soonest",
  onSortChange,
  eventTypeFilter = "all",
  onEventTypeFilterChange,
  searchQuery = "",
  onSearchChange,
  onFilterClick,
  showFilters = false,
  queryString = "",
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
      <MobileHeaderContainer title="Events & Workshops" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
        <div className="container mx-auto px-4 py-0 lg:px-8">
          {/* Header - Left aligned */}
          <ListingPageHeader
            title="Events & Workshops"
            subtitle="Discover the art of pottery with our hands-on workshops led by master artisans"
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
          />

          {/* Tab Navigation */}
          <EventsTabs
            activeTab={activeTab}
            registeredCount={registrationCount}
            queryString={queryString}
          />

          {/* Search Bar */}
          {onSearchChange && (
            <div className="mb-4">
              <SearchInput
                value={searchQuery}
                onChange={onSearchChange}
                placeholder="Search events..."
                className="max-w-md"
              />
            </div>
          )}

          {/* Filter Row - Desktop/Tablet only */}
          {(showFilters || onSortChange || onEventTypeFilterChange) && (
            <div className="mb-6 flex items-center justify-between gap-4">
              {/* Event count */}
              {totalEvents !== undefined && (
                <span className="text-muted-foreground text-sm">
                  Showing {totalEvents} {totalEvents === 1 ? "event" : "events"}
                </span>
              )}

              {/* Sort and filter controls */}
              <div className="flex items-center gap-2 sm:ml-auto">
                {/* Event type filter dropdown */}
                {onEventTypeFilterChange && (
                  <Select
                    value={eventTypeFilter}
                    onValueChange={(value) =>
                      onEventTypeFilterChange(value as EventTypeFilter)
                    }
                  >
                    <SelectTrigger className="h-9 w-[130px] text-sm sm:w-[150px]">
                      <SelectValue placeholder="Event Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="workshop">Workshops</SelectItem>
                      <SelectItem value="open_mic">Open Mic</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                {/* Sort dropdown */}
                {onSortChange && (
                  <Select
                    value={sortBy}
                    onValueChange={(value) =>
                      onSortChange(value as EventSortOption)
                    }
                  >
                    <SelectTrigger className="h-9 w-[160px] text-sm sm:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="soonest">Soonest First</SelectItem>
                      <SelectItem value="price-low">Price: Low-High</SelectItem>
                      <SelectItem value="price-high">
                        Price: High-Low
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}

                {/* Filter button - Desktop only */}
                {onFilterClick && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onFilterClick}
                    className="hidden gap-2 sm:flex"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Filter by Level</span>
                  </Button>
                )}

                {/* Filter icon button - Mobile only */}
                {onFilterClick && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onFilterClick}
                    className="h-9 w-9 sm:hidden"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                )}
              </div>
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
