import type { Metadata } from "next";
import { Suspense } from "react";

import { RegistrationsSkeleton } from "@/components/skeletons";

import { RegistrationsContent } from "./registrations-content";

export const metadata: Metadata = {
  title: "My Registrations | Poetry & Pottery",
  description:
    "View your workshop registrations, manage tickets, and track upcoming events.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegistrationsPage() {
  return (
    <Suspense fallback={<RegistrationsSkeleton />}>
      <RegistrationsContent />
    </Suspense>
  );
}
