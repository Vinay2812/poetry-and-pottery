import { getUsers } from "@/actions/admin";
import { UsersTableContainer } from "@/features/dashboard/users";
import { UserRole } from "@/prisma/generated/enums";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { requireAdminUser } from "@/lib/admin";

interface UsersPageProps {
  searchParams: Promise<{
    search?: string;
    role?: string;
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
  page,
  currentUserId,
}: {
  search?: string;
  role?: string;
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

function UsersTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-full max-w-md" />
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <div className="border-b border-neutral-100 bg-neutral-50/50 px-4 py-3">
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-4 w-20" />
            ))}
          </div>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-neutral-100 px-4 py-3"
          >
            <Skeleton className="size-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
