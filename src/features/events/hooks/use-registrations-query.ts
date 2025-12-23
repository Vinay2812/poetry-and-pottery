"use client";

import {
  type RegistrationWithReviewStatus,
  getCompletedRegistrations,
  getUpcomingRegistrations,
} from "@/actions";
import { DEFAULT_PAGE_SIZE } from "@/consts/performance";
import type { RegistrationWithEvent } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import type { PaginationData } from "../types";

interface UseRegistrationsQueryOptions {
  initialUpcomingRegistrations: RegistrationWithEvent[];
  initialUpcomingPagination: PaginationData;
  initialCompletedRegistrations: RegistrationWithReviewStatus[];
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
  // Upcoming registrations infinite query
  const {
    data: upcomingData,
    fetchNextPage: fetchNextUpcoming,
    hasNextPage: hasNextUpcoming,
    isFetchingNextPage: isFetchingNextUpcoming,
  } = useInfiniteQuery({
    queryKey: ["registrations-upcoming", searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getUpcomingRegistrations(
        pageParam,
        DEFAULT_PAGE_SIZE,
        searchQuery,
      );
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
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
      const result = await getCompletedRegistrations(pageParam);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
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
