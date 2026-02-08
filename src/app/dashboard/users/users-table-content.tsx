import { getUsers } from "@/data/admin/users/gateway/server";
import { UsersTableContainer } from "@/features/dashboard/users";

import { UserRole } from "@/graphql/generated/types";

export interface DashboardUsersSearchParams {
  search?: string;
  role?: string;
  sort?: string;
  page?: string;
}

interface UsersTableContentProps {
  search?: string;
  role?: string;
  sort?: string;
  page?: string;
  currentUserId: number;
}

export async function UsersTableContent({
  search,
  role,
  sort,
  page,
  currentUserId,
}: UsersTableContentProps) {
  void sort;

  const data = await getUsers({
    search,
    role: role as UserRole | undefined,
    page: page ? parseInt(page) : 1,
    limit: 20,
  });

  return <UsersTableContainer data={data} currentUserId={currentUserId} />;
}
