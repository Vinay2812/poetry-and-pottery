import { UserRole } from "@/prisma/generated/enums";
import { AdminRouteGuardProvider } from "@/providers/admin-route-guard-provider";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard";

import { ENVIRONMENT } from "@/lib/env.consts";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sessionClaims, isAuthenticated, userId } = await auth();

  // Server-side redirect: not signed in → sign-in page
  if (!isAuthenticated || !userId) {
    const returnUrl = encodeURIComponent("/dashboard");
    redirect(`/sign-in?redirect_url=${returnUrl}`);
  }

  const role = sessionClaims?.role;
  const environment = sessionClaims?.environment;

  // Server-side redirect: environment mismatch or not admin → home page
  if (environment !== ENVIRONMENT || role !== UserRole.ADMIN) {
    redirect("/");
  }

  return (
    <AdminRouteGuardProvider>
      <DashboardShell>{children}</DashboardShell>
    </AdminRouteGuardProvider>
  );
}
