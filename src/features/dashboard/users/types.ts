import type { AdminUser, GetUsersResult } from "@/actions/admin";
import type { UserRole } from "@/prisma/generated/enums";

/**
 * View model for a single user row.
 */
export interface UserRowViewModel {
  id: number;
  name: string | null;
  email: string;
  image: string | null;
  role: UserRole;
  ordersCount: number;
  registrationsCount: number;
  createdAt: Date;
  isCurrentUser: boolean;
}

/**
 * View model for pagination.
 */
export interface PaginationViewModel {
  page: number;
  totalPages: number;
  limit: number;
  total: number;
  showingFrom: number;
  showingTo: number;
}

/**
 * View model for UsersTable.
 */
export interface UsersTableViewModel {
  users: UserRowViewModel[];
  pagination: PaginationViewModel;
  searchValue: string;
  roleFilter: string;
}

/**
 * Props for the presentational UsersTable component.
 */
export interface UsersTableProps {
  viewModel: UsersTableViewModel;
  isPending: boolean;
  onSearch: (value: string) => void;
  onRoleFilter: (value: string) => void;
  onPageChange: (page: number) => void;
  onRoleChange: (userId: number, newRole: UserRole) => void;
}

/**
 * Props for the UsersTableContainer.
 */
export interface UsersTableContainerProps {
  data: GetUsersResult;
  currentUserId: number;
}

/**
 * Build user row view model from raw data.
 */
export function buildUserRowViewModel(
  user: AdminUser,
  currentUserId: number,
): UserRowViewModel {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
    ordersCount: user._count.product_orders,
    registrationsCount: user._count.event_registrations,
    createdAt: user.created_at,
    isCurrentUser: user.id === currentUserId,
  };
}

/**
 * Build pagination view model from result data.
 */
export function buildPaginationViewModel(
  data: GetUsersResult,
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

/**
 * Build users table view model.
 */
export function buildUsersTableViewModel(
  data: GetUsersResult,
  currentUserId: number,
  searchValue: string,
  roleFilter: string,
): UsersTableViewModel {
  return {
    users: data.users.map((user) => buildUserRowViewModel(user, currentUserId)),
    pagination: buildPaginationViewModel(data),
    searchValue,
    roleFilter,
  };
}
