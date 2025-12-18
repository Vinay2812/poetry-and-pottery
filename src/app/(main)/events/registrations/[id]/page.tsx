import { EventService } from "@/services";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { RegistrationDetailClient } from "@/components/events";

interface RegistrationDetailPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Registration Details | Poetry & Pottery",
  description:
    "View your workshop registration details and ticket information.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RegistrationDetailPage({
  params,
}: RegistrationDetailPageProps) {
  const { userId } = await auth();
  const { id } = await params;

  if (!userId) {
    redirect("/sign-in");
  }

  const registration = await EventService.getRegistrationById(id, userId);

  if (!registration) {
    notFound();
  }

  return <RegistrationDetailClient registration={registration} />;
}
