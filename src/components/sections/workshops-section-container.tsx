"use client";

import { EventType, useUpcomingEventsQuery } from "@/graphql/generated/graphql";

import { WorkshopsSectionSkeleton } from "@/components/skeletons";

import { WorkshopsSection } from "./workshops-section";

export function WorkshopsSectionContainer() {
  const { data: potteryData, loading: potteryLoading } = useUpcomingEventsQuery(
    {
      variables: {
        filter: { page: 1, limit: 2, event_type: EventType.PotteryWorkshop },
      },
    },
  );

  const { data: poetryData, loading: poetryLoading } = useUpcomingEventsQuery({
    variables: {
      filter: { page: 1, limit: 2, event_type: EventType.OpenMic },
    },
  });

  if (potteryLoading || poetryLoading || !potteryData || !poetryData) {
    return <WorkshopsSectionSkeleton />;
  }

  const potteryEvents = potteryData.upcomingEvents.data;
  const poetryEvents = poetryData.upcomingEvents.data;

  return (
    <WorkshopsSection
      potteryEvents={potteryEvents}
      poetryEvents={poetryEvents}
    />
  );
}
