"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import type { EventSortOption, EventTypeFilter } from "@/components/events";

interface EventFilters {
  search: string;
  eventType: EventTypeFilter;
  sort: EventSortOption;
}

interface UseEventFiltersReturn {
  filters: EventFilters;
  setSearch: (search: string) => void;
  setEventType: (eventType: EventTypeFilter) => void;
  setSort: (sort: EventSortOption) => void;
  getQueryString: () => string;
}

export function useEventFilters(): UseEventFiltersReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo<EventFilters>(() => {
    return {
      search: searchParams.get("search") || "",
      eventType: (searchParams.get("type") as EventTypeFilter) || "all",
      sort: (searchParams.get("sort") as EventSortOption) || "soonest",
    };
  }, [searchParams]);

  const updateURL = useCallback(
    (newParams: Partial<EventFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Update search
      if (newParams.search !== undefined) {
        if (newParams.search) {
          params.set("search", newParams.search);
        } else {
          params.delete("search");
        }
      }

      // Update event type
      if (newParams.eventType !== undefined) {
        if (newParams.eventType && newParams.eventType !== "all") {
          params.set("type", newParams.eventType);
        } else {
          params.delete("type");
        }
      }

      // Update sort
      if (newParams.sort !== undefined) {
        if (newParams.sort && newParams.sort !== "soonest") {
          params.set("sort", newParams.sort);
        } else {
          params.delete("sort");
        }
      }

      const queryString = params.toString();
      const newURL = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(newURL, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const setSearch = useCallback(
    (search: string) => {
      updateURL({ search });
    },
    [updateURL],
  );

  const setEventType = useCallback(
    (eventType: EventTypeFilter) => {
      updateURL({ eventType });
    },
    [updateURL],
  );

  const setSort = useCallback(
    (sort: EventSortOption) => {
      updateURL({ sort });
    },
    [updateURL],
  );

  const getQueryString = useCallback(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.eventType !== "all") params.set("type", filters.eventType);
    if (filters.sort !== "soonest") params.set("sort", filters.sort);
    return params.toString();
  }, [filters]);

  return {
    filters,
    setSearch,
    setEventType,
    setSort,
    getQueryString,
  };
}
