import type { Metadata } from "next";
import { Suspense } from "react";

import { DailyWorkshopsBookingSkeleton } from "@/components/skeletons";

import { absoluteUrl } from "@/lib/seo";

import { DailyWorkshopsContent } from "./daily-workshops-content";

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

export default function DailyWorkshopsPage() {
  return (
    <Suspense fallback={<DailyWorkshopsBookingSkeleton />}>
      <DailyWorkshopsContent />
    </Suspense>
  );
}
