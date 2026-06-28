import type { ReactNode } from "react";

import { createDate } from "@/lib/date";

import type {
  AdminUserDailyWorkshopRegistrationsForUserQuery,
  AdminUserOrdersQuery,
  AdminUserRegistrationsQuery,
} from "@/graphql/generated/graphql";
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
  expandedUserId: number | null;
  onToggleExpand: (userId: number) => void;
  renderUserBookings: (userId: number) => ReactNode;
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

// ---------------------------------------------------------------------------
// User bookings accordion (orders / event registrations / daily workshops)
// ---------------------------------------------------------------------------

export type BookingTone =
  | "pending"
  | "approved"
  | "paid"
  | "confirmed"
  | "cancelled"
  | "neutral";

export type BookingKind = "order" | "registration" | "daily-workshop";

export interface BookingStatusOption {
  value: string;
  label: string;
}

// Status choices an admin can switch a row to (mirrors the kanban columns).
export const ORDER_STATUS_OPTIONS: BookingStatusOption[] = [
  { value: "PENDING", label: "Pending" },
  { value: "PROCESSING", label: "Processing" },
  { value: "PAID", label: "Paid" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
];

export const REGISTRATION_STATUS_OPTIONS: BookingStatusOption[] = [
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "PAID", label: "Paid" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "REJECTED", label: "Rejected" },
  { value: "CANCELLED", label: "Cancelled" },
];

export const DAILY_WORKSHOP_STATUS_OPTIONS: BookingStatusOption[] = [
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "PAID", label: "Paid" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "REJECTED", label: "Rejected" },
  { value: "CANCELLED", label: "Cancelled" },
];

// A single order / registration / workshop row rendered inside the accordion.
export interface BookingRowViewModel {
  id: string;
  kind: BookingKind;
  status: string;
  statusOptions: BookingStatusOption[];
  title: string;
  statusLabel: string;
  tone: BookingTone;
  amountLabel: string;
  dateLabel: string;
  isMatched: boolean;
}

export interface UserBookingsAccordionViewModel {
  orders: BookingRowViewModel[];
  registrations: BookingRowViewModel[];
  dailyWorkshops: BookingRowViewModel[];
  ordersCount: number;
  registrationsCount: number;
  dailyWorkshopsCount: number;
  isLoading: boolean;
  hasError: boolean;
}

export interface UserBookingsAccordionProps {
  viewModel: UserBookingsAccordionViewModel;
  updatingId: string | null;
  onStatusChange: (row: BookingRowViewModel, nextStatus: string) => void;
}

export interface UserBookingsAccordionContainerProps {
  userId: number;
  // The committed search query, used to highlight the matched booking row.
  matchQuery: string;
}

type OrderRow = AdminUserOrdersQuery["adminUserOrders"][number];
type RegistrationRow =
  AdminUserRegistrationsQuery["adminUserRegistrations"][number];
type DailyWorkshopRow =
  AdminUserDailyWorkshopRegistrationsForUserQuery["adminUserDailyWorkshopRegistrations"][number];

// Only highlight on reasonably specific queries so short name searches don't
// spuriously light up id substrings.
const MATCH_MIN_LENGTH = 4;

function isIdMatched(id: string, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (normalized.length < MATCH_MIN_LENGTH) {
    return false;
  }
  return id.toLowerCase().includes(normalized);
}

function statusTone(status: string): BookingTone {
  switch (status.toUpperCase()) {
    case "PENDING":
      return "pending";
    case "APPROVED":
    case "PROCESSING":
    case "SHIPPED":
      return "approved";
    case "PAID":
      return "paid";
    case "CONFIRMED":
    case "DELIVERED":
      return "confirmed";
    case "CANCELLED":
    case "REJECTED":
    case "RETURNED":
    case "REFUNDED":
      return "cancelled";
    default:
      return "neutral";
  }
}

function formatStatusLabel(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

function formatBookingAmount(amount: number, currency = "INR"): string {
  const symbol = currency.toUpperCase() === "INR" ? "₹" : `${currency} `;
  return `${symbol}${Math.round(amount).toLocaleString("en-IN")}`;
}

function formatBookingDate(date: Date | string): string {
  return createDate(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function buildOrderBookingRows(
  orders: OrderRow[],
  matchQuery: string,
): BookingRowViewModel[] {
  return orders.map((order) => {
    const firstProduct = order.ordered_products[0]?.product?.name ?? "Order";
    const extra = order.ordered_products.length - 1;
    return {
      id: order.id,
      kind: "order",
      status: order.status,
      statusOptions: ORDER_STATUS_OPTIONS,
      title: extra > 0 ? `${firstProduct} +${extra} more` : firstProduct,
      statusLabel: formatStatusLabel(order.status),
      tone: statusTone(order.status),
      amountLabel: formatBookingAmount(order.total),
      dateLabel: formatBookingDate(order.created_at),
      isMatched: isIdMatched(order.id, matchQuery),
    };
  });
}

export function buildRegistrationBookingRows(
  registrations: RegistrationRow[],
  matchQuery: string,
): BookingRowViewModel[] {
  return registrations.map((registration) => {
    const net =
      registration.price * registration.seats_reserved - registration.discount;
    return {
      id: registration.id,
      kind: "registration",
      status: registration.status,
      statusOptions: REGISTRATION_STATUS_OPTIONS,
      title: registration.event.title,
      statusLabel: formatStatusLabel(registration.status),
      tone: statusTone(registration.status),
      amountLabel: formatBookingAmount(net),
      dateLabel: formatBookingDate(registration.event.starts_at),
      isMatched: isIdMatched(registration.id, matchQuery),
    };
  });
}

export function buildDailyWorkshopBookingRows(
  workshops: DailyWorkshopRow[],
  matchQuery: string,
): BookingRowViewModel[] {
  return workshops.map((workshop) => {
    const firstSlot = [...workshop.slots]
      .map((slot) => slot.slot_start_at)
      .sort((a, b) => createDate(a).getTime() - createDate(b).getTime())[0];
    const participantsLabel = `${workshop.participants} participant${
      workshop.participants > 1 ? "s" : ""
    }`;
    return {
      id: workshop.id,
      kind: "daily-workshop",
      status: workshop.status,
      statusOptions: DAILY_WORKSHOP_STATUS_OPTIONS,
      title: `Daily Workshop · ${participantsLabel}`,
      statusLabel: formatStatusLabel(workshop.status),
      tone: statusTone(workshop.status),
      amountLabel: formatBookingAmount(
        workshop.final_amount,
        workshop.currency,
      ),
      dateLabel: formatBookingDate(firstSlot ?? workshop.created_at),
      isMatched: isIdMatched(workshop.id, matchQuery),
    };
  });
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
