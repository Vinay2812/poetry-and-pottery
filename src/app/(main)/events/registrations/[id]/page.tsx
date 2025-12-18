import { getRegistrationById } from "@/actions";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
  const { id } = await params;

  const registration = await getRegistrationById(id);

  if (!registration) {
    notFound();
  }

  return <RegistrationDetailClient registration={registration} />;
}
