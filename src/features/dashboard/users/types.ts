import type { UserRole } from "@/graphql/generated/types";
import type { AdminUser, AdminUsersResponse } from "@/graphql/generated/types";

// Sort options for users table.
export type UserSortOption =
  | "newest"
  | "oldest"
  | "name_asc"
  | "name_desc"
  | "pending_orders";

// View model for a single user row.
export interface UserRowViewModel {
  id: number;
  name: string | null;
  email: string;
  image: string | null;
  role: UserRole;
  ordersCount: number;
  registrationsCount: number;
  pendingOrdersCount: number;
  pendingRegistrationsCount: number;
  createdAt: Date | string;
  isCurrentUser: boolean;
}

// View model for pagination.
export interface PaginationViewModel {
  page: number;
  totalPages: number;
  limit: number;
  total: number;
  showingFrom: number;
  showingTo: number;
}

// View model for UsersTable.
export interface UsersTableViewModel {
  users: UserRowViewModel[];
  pagination: PaginationViewModel;
  searchValue: string;
  roleFilter: string;
  sortValue: UserSortOption;
}

// Props for the presentational UsersTable component.
export interface UsersTableProps {
  viewModel: UsersTableViewModel;
  isPending: boolean;
  onSearch: (value: string) => void;
  onRoleFilter: (value: string) => void;
  onSortChange: (value: UserSortOption) => void;
  onPageChange: (page: number) => void;
  onRoleChange: (userId: number, newRole: UserRole) => void;
}

// Props for the UsersTableContainer.
export interface UsersTableContainerProps {
  data: AdminUsersResponse;
  currentUserId: number;
}

// Build user row view model from raw data.
export function buildUserRowViewModel(
  user: AdminUser,
  currentUserId: number,
): UserRowViewModel {
  return {
    id: user.id,
    name: user.name ?? null,
    email: user.email,
    image: user.image ?? null,
    role: user.role,
    ordersCount: user._count.product_orders,
    registrationsCount: user._count.event_registrations,
    pendingOrdersCount: user.pendingOrdersCount,
    pendingRegistrationsCount: user.pendingRegistrationsCount,
    createdAt: user.created_at,
    isCurrentUser: user.id === currentUserId,
  };
}

// Build pagination view model from result data.
export function buildPaginationViewModel(
  data: AdminUsersResponse,
): PaginationViewModel {
  return {
    page: data.page,
    totalPages: data.totalPages,
    limit: data.limit,
    total: data.total,
    showingFrom: (data.page - 1) * data.limit + 1,
    showingTo: Math.min(data.page * data.limit, data.total),
  };
}

// Build users table view model.
export function buildUsersTableViewModel(
  data: AdminUsersResponse,
  currentUserId: number,
  searchValue: string,
  roleFilter: string,
  sortValue: UserSortOption,
): UsersTableViewModel {
  return {
    users: data.users.map((user) => buildUserRowViewModel(user, currentUserId)),
    pagination: buildPaginationViewModel(data),
    searchValue,
    roleFilter,
    sortValue,
  };
}
