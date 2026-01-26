"use client";

import { getPastEvents } from "@/data/events/gateway/server";
import type { EventBase } from "@/data/events/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { History, Loader2 } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { PastWorkshopCard } from "@/components/cards";
import { EventsListLayout } from "@/components/events";
import { EmptyState } from "@/components/sections";
import { StaggeredGrid } from "@/components/shared";

interface PastWorkshopsClientProps {
  initialEvents: EventBase[];
  initialPagination: {
    total: number;
    totalPages: number;
  };
}

export function PastWorkshopsClient({
  initialEvents,
  initialPagination,
}: PastWorkshopsClientProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["past-events"],
      queryFn: async ({ pageParam = 1 }) => {
        const result = await getPastEvents({ page: pageParam });
        if (!result.success) {
          throw new Error(result.error);
        }
        return {
          data: result.data.data,
          total: result.data.total,
          page: result.data.page,
          totalPages: result.data.total_pages,
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
            data: initialEvents,
            total: initialPagination.total,
            page: 1,
            totalPages: initialPagination.totalPages,
          },
        ],
        pageParams: [1],
      },
    });

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const events = useMemo(() => {
    const allEvents = data?.pages.flatMap((page) => page.data) ?? [];
    const seen = new Set<string>();
    return allEvents.filter((event) => {
      if (seen.has(event.id)) {
        return false;
      }
      seen.add(event.id);
      return true;
    });
  }, [data]);

  return (
    <EventsListLayout>
      <div className="text-muted-foreground mb-6 flex items-center gap-2">
        <History className="h-5 w-5" />
        <p className="text-sm">
          Explore our previous workshops and the amazing pieces created by our
          community.
        </p>
      </div>
      {events.length > 0 ? (
        <>
          <StaggeredGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {events.map((event) => (
              <PastWorkshopCard key={event.id} event={event} />
            ))}
          </StaggeredGrid>
          {hasNextPage && (
            <div ref={loadMoreRef} className="flex justify-center py-8">
              {isFetchingNextPage && (
                <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
              )}
            </div>
          )}
        </>
      ) : (
        <EmptyState
          icon={History}
          title="No past workshops"
          description="Check back later for gallery highlights from our workshops."
        />
      )}
    </EventsListLayout>
  );
}
