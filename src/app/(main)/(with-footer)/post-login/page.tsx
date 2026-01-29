import { ENVIRONMENT } from "@/consts/env";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { FlowChooser } from "@/components/auth";

import { UserRole } from "@/graphql/generated/types";

interface PostLoginPageProps {
  searchParams: Promise<{ redirect_url?: string }>;
}

export default async function PostLoginPage({
  searchParams,
}: PostLoginPageProps) {
  const { sessionClaims, isAuthenticated } = await auth();
  const { redirect_url } = await searchParams;

  // Not authenticated → redirect to sign-in
  if (!isAuthenticated) {
    redirect("/sign-in");
  }

  const role = sessionClaims?.role;
  const environment = sessionClaims?.environment;

  // Environment mismatch → redirect to intended URL or home
  if (environment !== ENVIRONMENT) {
    redirect(redirect_url ? decodeURIComponent(redirect_url) : "/");
  }

  // Non-admin users → redirect immediately to intended URL or home
  if (role !== UserRole.Admin) {
    redirect(redirect_url ? decodeURIComponent(redirect_url) : "/");
  }

  // Admin users → show the flow chooser
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <FlowChooser redirectUrl={redirect_url} />
    </div>
  );
}
