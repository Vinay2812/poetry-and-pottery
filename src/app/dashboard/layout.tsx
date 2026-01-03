import { DashboardShell } from "@/components/dashboard";

import { requireAdminAccess } from "@/lib/admin";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminAccess();

  return <DashboardShell>{children}</DashboardShell>;
}
