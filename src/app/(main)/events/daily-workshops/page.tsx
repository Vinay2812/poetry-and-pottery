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

import { absoluteUrl } from "@/lib/seo";

import type { DailyWorkshopConfig } from "@/graphql/generated/types";

export const metadata: Metadata = {
  title: "Daily Workshops | Poetry & Pottery",
  description:
    "Book flexible daily pottery workshop slots between 1 PM and 7 PM. Pick your dates, choose hours, and learn at your own pace.",
  keywords: [
    "daily pottery workshop",
    "flexible pottery booking",
    "hourly pottery classes",
    "pottery studio sessions",
  ],
  alternates: {
    canonical: absoluteUrl("/events/daily-workshops"),
  },
  openGraph: {
    title: "Daily Workshops | Poetry & Pottery",
    description:
      "Flexible pottery workshop booking with hourly slot selection and tiered pricing.",
    type: "website",
    url: absoluteUrl("/events/daily-workshops"),
    images: [
      {
        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Daily pottery workshop booking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Workshops | Poetry & Pottery",
    description:
      "Flexible pottery workshop booking with hourly slot selection and tiered pricing.",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=630&fit=crop",
    ],
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

export default function DailyWorkshopsPage() {
  return (
    <Suspense fallback={<DailyWorkshopsBookingSkeleton />}>
      <DailyWorkshopsContent />
    </Suspense>
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
