import { AdminRouteGuardProvider } from "@/providers/admin-route-guard-provider";

import { DashboardShell } from "@/components/dashboard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminRouteGuardProvider>
      <DashboardShell>{children}</DashboardShell>
    </AdminRouteGuardProvider>
  );
}
