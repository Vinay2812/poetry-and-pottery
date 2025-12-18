import { EventService } from "@/services";
import type { RegistrationWithEvent } from "@/types";
import { auth } from "@clerk/nextjs/server";
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
  const { userId } = await auth();

  // Fetch registrations if user is authenticated
  let registrations: RegistrationWithEvent[] = [];
  if (userId) {
    try {
      registrations = await EventService.getRegistrationsByAuthId(userId);
    } catch {
      // User not found in DB or other error
      registrations = [];
    }
  }

  return <RegistrationsClient registrations={registrations} />;
}
