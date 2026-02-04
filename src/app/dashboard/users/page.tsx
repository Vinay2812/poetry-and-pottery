import { getUsers } from "@/data/admin/users/gateway/server";
import { UsersTableContainer } from "@/features/dashboard/users";
import { Suspense } from "react";

import { UsersTableSkeleton } from "@/components/skeletons";

import { requireAdminUser } from "@/lib/admin";

import { UserRole } from "@/graphql/generated/types";

interface UsersPageProps {
  searchParams: Promise<{
    search?: string;
    role?: string;
    sort?: string;
    page?: string;
  }>;
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

async function UsersTableContent({
  search,
  role,
  sort,
  page,
  currentUserId,
}: {
  search?: string;
  role?: string;
  sort?: string;
  page?: string;
  currentUserId: number;
}) {
  const data = await getUsers({
    search,
    role: role as UserRole | undefined,
    page: page ? parseInt(page) : 1,
    limit: 20,
  });

  return <UsersTableContainer data={data} currentUserId={currentUserId} />;
}
