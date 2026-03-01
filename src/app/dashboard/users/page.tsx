import { Suspense } from "react";

import { UsersTableSkeleton } from "@/components/skeletons";

import { requireAdminUser } from "@/lib/admin";

import {
  type DashboardUsersSearchParams,
  UsersTableContent,
} from "./users-table-content";

interface UsersPageProps {
  searchParams: Promise<DashboardUsersSearchParams>;
}

/**
 * Route: /dashboard/users
 * Page does: Admin user directory page with role-aware filtering and sorting.
 * Key UI operations:
 * - Search users, filter by role, sort results, and paginate table data.
 * - Open a specific user record for deeper account-level analysis.
 * UI info needed for operations:
 * - Query params: `search`, `role`, `sort`, and `page` controlling table state.
 * - Current admin user id and user list payload used for row-level actions/permissions.
 */
export default async function UsersPage({ searchParams }: UsersPageProps) {
  const currentUser = await requireAdminUser();
  const params = await searchParams;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          Manage users, their roles, orders, and event registrations.
        </p>
      </div>

      <Suspense fallback={<UsersTableSkeleton />}>
        <UsersTableContent
          search={params.search}
          role={params.role}
          sort={params.sort}
          page={params.page}
          currentUserId={currentUser.id}
        />
      </Suspense>
    </div>
  );
}
