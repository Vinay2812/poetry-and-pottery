import {
  getDailyWorkshopAvailability,
  getDailyWorkshopPublicConfigs,
} from "@/data/daily-workshops/gateway/server";
import { DailyWorkshopsBookingContainer } from "@/features/daily-workshops";
import { Calendar } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

import { EventsListLayout } from "@/components/events";
import { EmptyState } from "@/components/sections";
import { DailyWorkshopsBookingSkeleton } from "@/components/skeletons";

export const metadata: Metadata = {
  title: "Daily Workshops | Poetry & Pottery",
  description:
    "Book flexible daily pottery workshop slots between 1 PM and 7 PM. Pick your dates, choose hours, and learn at your own pace.",
  openGraph: {
    title: "Daily Workshops | Poetry & Pottery",
    description:
      "Flexible pottery workshop booking with hourly slot selection and tiered pricing.",
    type: "website",
    url: "/events/daily-workshops",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Workshops | Poetry & Pottery",
    description:
      "Flexible pottery workshop booking with hourly slot selection and tiered pricing.",
  },
};

async function DailyWorkshopsContent() {
  const [availabilityResult, configsResult] = await Promise.all([
    getDailyWorkshopAvailability(),
    getDailyWorkshopPublicConfigs(),
  ]);

  if (!availabilityResult.success) {
    return (
      <EventsListLayout>
        <EmptyState
          icon={Calendar}
          title="No workshops available"
          description="There are no daily workshop slots open right now. Please check back soon."
        />
      </EventsListLayout>
    );
  }

  const availableConfigs = configsResult.success
    ? configsResult.data
    : [availabilityResult.data.config];

  const hasAvailableWorkshops = availabilityResult.data.days.some((day) =>
    day.slots.some((slot) => slot.is_available),
  );

  if (!hasAvailableWorkshops && availableConfigs.length <= 1) {
    return (
      <EventsListLayout>
        <EmptyState
          icon={Calendar}
          title="No workshops available"
          description="There are no daily workshop slots open right now. Please check back soon."
        />
      </EventsListLayout>
    );
  }

  return (
    <DailyWorkshopsBookingContainer
      initialAvailability={availabilityResult.data}
      initialConfigs={availableConfigs}
    />
  );
}

export default function DailyWorkshopsPage() {
  return (
    <Suspense fallback={<DailyWorkshopsBookingSkeleton />}>
      <DailyWorkshopsContent />
    </Suspense>
  );
}
