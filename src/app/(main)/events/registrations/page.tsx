import { getUserRegistrations } from "@/actions";
import type { Metadata } from "next";

import { RegistrationsClient } from "@/components/events";

export const metadata: Metadata = {
  title: "My Registrations | Poetry & Pottery",
  description:
    "View your workshop registrations, manage tickets, and track upcoming events.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RegistrationsPage() {
  const result = await getUserRegistrations();
  const registrations = result.success ? result.data.data : [];

  return <RegistrationsClient registrations={registrations} />;
}
