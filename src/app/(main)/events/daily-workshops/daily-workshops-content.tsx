import {
  getDailyWorkshopAvailability,
  getDailyWorkshopPublicConfigs,
} from "@/data/daily-workshops/gateway/server";
import { DailyWorkshopsBookingContainer } from "@/features/daily-workshops";
import { Calendar } from "lucide-react";

import { EventsListLayout } from "@/components/events";
import { EmptyState } from "@/components/sections";

import { absoluteUrl } from "@/lib/seo";

import type { DailyWorkshopConfig } from "@/graphql/generated/types";

export async function DailyWorkshopsContent() {
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildDailyWorkshopStructuredData(availableConfigs),
          ),
        }}
      />
      <DailyWorkshopsBookingContainer
        initialAvailability={availabilityResult.data}
        initialConfigs={availableConfigs}
      />
    </>
  );
}

function buildDailyWorkshopStructuredData(configs: DailyWorkshopConfig[]) {
  const activeTiers = configs
    .flatMap((config) => config.pricing_tiers)
    .filter((tier) => tier.is_active);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Daily Pottery Workshops",
    serviceType: "Flexible Hourly Pottery Workshop",
    provider: {
      "@type": "Organization",
      name: "Poetry & Pottery",
      url: absoluteUrl("/"),
    },
    areaServed: "Sangli, Maharashtra, India",
    url: absoluteUrl("/events/daily-workshops"),
    description:
      "Book flexible daily pottery workshop slots between 1 PM and 7 PM with tiered hourly pricing.",
    offers: activeTiers.map((tier) => ({
      "@type": "Offer",
      priceCurrency: "INR",
      price: tier.price_per_person,
      description: `${tier.hours} hour session, ${tier.pieces_per_person} pieces per person`,
    })),
  };
}
