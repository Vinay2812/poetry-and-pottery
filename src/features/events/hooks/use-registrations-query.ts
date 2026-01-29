"use client";

import { DEFAULT_PAGE_SIZE } from "@/consts/performance";
import type { EventRegistration } from "@/data/events/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import {
  useCompletedRegistrationsLazyQuery,
  useUpcomingRegistrationsLazyQuery,
} from "@/graphql/generated/graphql";

import type { PaginationData } from "../types";

interface UseRegistrationsQueryOptions {
  initialUpcomingRegistrations: EventRegistration[];
  initialUpcomingPagination: PaginationData;
  initialCompletedRegistrations: EventRegistration[];
  initialCompletedPagination: PaginationData;
  searchQuery?: string;
}

export function useRegistrationsQuery({
  initialUpcomingRegistrations,
  initialUpcomingPagination,
  initialCompletedRegistrations,
  initialCompletedPagination,
  searchQuery,
}: UseRegistrationsQueryOptions) {
  const [fetchUpcomingGraphQL] = useUpcomingRegistrationsLazyQuery();
  const [fetchCompletedGraphQL] = useCompletedRegistrationsLazyQuery();

  // Upcoming registrations infinite query
  const {
    data: upcomingData,
    fetchNextPage: fetchNextUpcoming,
    hasNextPage: hasNextUpcoming,
    isFetchingNextPage: isFetchingNextUpcoming,
  } = useInfiniteQuery({
    queryKey: ["registrations-upcoming", searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      // GraphQL mode: use Apollo lazy query
      const { data: gqlData } = await fetchUpcomingGraphQL({
        variables: {
          filter: {
            page: pageParam,
            limit: DEFAULT_PAGE_SIZE,
            search: searchQuery,
          },
        },
      });

      const registrations = gqlData?.upcomingRegistrations;
      return {
        data: (registrations?.data ?? []) as EventRegistration[],
        total: registrations?.total ?? 0,
        page: registrations?.page ?? pageParam,
        totalPages: registrations?.total_pages ?? 0,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialData: {
      pages: [
        {
          data: initialUpcomingRegistrations,
          total: initialUpcomingPagination.total,
          page: 1,
          totalPages: initialUpcomingPagination.totalPages,
        },
      ],
      pageParams: [1],
    },
  });

  // Completed registrations infinite query
  const {
    data: completedData,
    fetchNextPage: fetchNextCompleted,
    hasNextPage: hasNextCompleted,
    isFetchingNextPage: isFetchingNextCompleted,
  } = useInfiniteQuery({
    queryKey: ["registrations-completed"],
    queryFn: async ({ pageParam = 1 }) => {
      // GraphQL mode: use Apollo lazy query
      const { data: gqlData } = await fetchCompletedGraphQL({
        variables: {
          filter: {
            page: pageParam,
            limit: DEFAULT_PAGE_SIZE,
          },
        },
      });

      const registrations = gqlData?.completedRegistrations;
      return {
        data: (registrations?.data ?? []) as EventRegistration[],
        total: registrations?.total ?? 0,
        page: registrations?.page ?? pageParam,
        totalPages: registrations?.total_pages ?? 0,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialData: {
      pages: [
        {
          data: initialCompletedRegistrations,
          total: initialCompletedPagination.total,
          page: 1,
          totalPages: initialCompletedPagination.totalPages,
        },
      ],
      pageParams: [1],
    },
  });

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  // Sequential loading: upcoming first, then completed
  useEffect(() => {
    if (inView) {
      if (hasNextUpcoming && !isFetchingNextUpcoming) {
        fetchNextUpcoming();
      } else if (
        !hasNextUpcoming &&
        hasNextCompleted &&
        !isFetchingNextCompleted
      ) {
        fetchNextCompleted();
      }
    }
  }, [
    inView,
    hasNextUpcoming,
    hasNextCompleted,
    isFetchingNextUpcoming,
    isFetchingNextCompleted,
    fetchNextUpcoming,
    fetchNextCompleted,
  ]);

  // Flatten and dedupe upcoming registrations
  const upcomingRegistrations = useMemo(() => {
    const allRegs = upcomingData?.pages.flatMap((page) => page.data) ?? [];
    const seen = new Set<string>();
    return allRegs.filter((reg) => {
      if (seen.has(reg.id)) return false;
      seen.add(reg.id);
      return true;
    });
  }, [upcomingData]);

  // Flatten and dedupe completed registrations
  const completedRegistrations = useMemo(() => {
    const allRegs = completedData?.pages.flatMap((page) => page.data) ?? [];
    const seen = new Set<string>();
    return allRegs.filter((reg) => {
      if (seen.has(reg.id)) return false;
      seen.add(reg.id);
      return true;
    });
  }, [completedData]);

  const hasMore = hasNextUpcoming || hasNextCompleted;
  const isLoading = isFetchingNextUpcoming || isFetchingNextCompleted;

  return {
    upcomingRegistrations,
    completedRegistrations,
    hasMore,
    isLoading,
    loadMoreRef,
  };
}
