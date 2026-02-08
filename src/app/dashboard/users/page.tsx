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
