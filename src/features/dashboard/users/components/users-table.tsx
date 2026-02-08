"use client";

import {
  AlertCircleIcon,
  ArrowDownUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  ShieldIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

import { OptimizedImage } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createDate } from "@/lib/date";

import { UserRole } from "@/graphql/generated/types";

import type { UserRowViewModel, UsersTableProps } from "../types";

interface UserRowProps {
  user: UserRowViewModel;
  onRoleChange: (userId: number, newRole: UserRole) => void;
  isPending: boolean;
}

function UserCard({ user, onRoleChange, isPending }: UserRowProps) {
  const hasActionsRequired =
    user.pendingOrdersCount > 0 || user.pendingRegistrationsCount > 0;

  return (
    <Link
      href={`/dashboard/users/${user.id}`}
      className="block overflow-hidden rounded-xl border border-neutral-200 bg-white p-4 transition-colors hover:bg-neutral-50/50"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {user.image ? (
            <div className="relative size-12 overflow-hidden rounded-full bg-neutral-100">
              <OptimizedImage
                src={user.image}
                alt={user.name || ""}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
              <UserIcon className="size-6" />
            </div>
          )}
          <div>
            <p className="font-medium text-neutral-900">
              {user.name || "Unnamed User"}
            </p>
            <p className="text-sm text-neutral-500">{user.email}</p>
          </div>
        </div>
        {user.isCurrentUser ? (
          <Badge variant="outline" className="shrink-0 gap-1">
            <ShieldIcon className="size-3" />
            {user.role}
          </Badge>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              disabled={isPending}
              onClick={(e) => e.preventDefault()}
            >
              <button className="shrink-0 focus:outline-none">
                <Badge
                  variant={user.role === UserRole.Admin ? "default" : "outline"}
                  className="cursor-pointer gap-1 transition-opacity hover:opacity-80"
                >
                  {user.role === UserRole.Admin && (
                    <ShieldIcon className="size-3" />
                  )}
                  {user.role}
                </Badge>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  onRoleChange(user.id, UserRole.User);
                }}
                disabled={user.role === UserRole.User}
              >
                <UserIcon className="mr-2 size-4" />
                Set as User
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  onRoleChange(user.id, UserRole.Admin);
                }}
                disabled={user.role === UserRole.Admin}
              >
                <ShieldIcon className="mr-2 size-4" />
                Set as Admin
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Actions Required */}
      {hasActionsRequired && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2">
          <AlertCircleIcon className="size-4 shrink-0 text-amber-600" />
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm font-medium text-amber-800">
              Needs attention:
            </span>
            {user.pendingOrdersCount > 0 && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                {user.pendingOrdersCount} order
                {user.pendingOrdersCount > 1 ? "s" : ""}
              </span>
            )}
            {user.pendingRegistrationsCount > 0 && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                {user.pendingRegistrationsCount} registration
                {user.pendingRegistrationsCount > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-lg bg-neutral-50 px-2 py-1">
          <span className="text-xs text-neutral-500">Orders:</span>
          <span className="text-sm font-medium text-neutral-700">
            {user.ordersCount}
          </span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-neutral-50 px-2 py-1">
          <span className="text-xs text-neutral-500">Registrations:</span>
          <span className="text-sm font-medium text-neutral-700">
            {user.registrationsCount}
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
        <span className="text-xs text-neutral-500" suppressHydrationWarning>
          Joined{" "}
          {createDate(user.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
        <span className="text-sm font-medium text-neutral-600">
          View Details →
        </span>
      </div>
    </Link>
  );
}

function UserRow({ user, onRoleChange, isPending }: UserRowProps) {
  return (
    <tr className="transition-colors hover:bg-neutral-50/50">
      <td className="px-4 py-3">
        <Link
          href={`/dashboard/users/${user.id}`}
          className="flex items-center gap-3"
        >
          {user.image ? (
            <div className="relative size-10 overflow-hidden rounded-full bg-neutral-100">
              <OptimizedImage
                src={user.image}
                alt={user.name || ""}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
              <UserIcon className="size-5" />
            </div>
          )}
          <div>
            <p className="hover:text-primary font-medium text-neutral-900">
              {user.name || "Unnamed User"}
            </p>
            <p className="text-sm text-neutral-500">{user.email}</p>
          </div>
        </Link>
      </td>
      <td className="px-4 py-3">
        {user.isCurrentUser ? (
          <Badge variant="outline" className="gap-1">
            <ShieldIcon className="size-3" />
            {user.role}
            <span className="text-xs text-neutral-400">(you)</span>
          </Badge>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={isPending}>
              <button className="focus:outline-none">
                <Badge
                  variant={user.role === UserRole.Admin ? "default" : "outline"}
                  className="cursor-pointer gap-1 transition-opacity hover:opacity-80"
                >
                  {user.role === UserRole.Admin && (
                    <ShieldIcon className="size-3" />
                  )}
                  {user.role}
                </Badge>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() => onRoleChange(user.id, UserRole.User)}
                disabled={user.role === UserRole.User}
              >
                <UserIcon className="mr-2 size-4" />
                Set as User
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onRoleChange(user.id, UserRole.Admin)}
                disabled={user.role === UserRole.Admin}
              >
                <ShieldIcon className="mr-2 size-4" />
                Set as Admin
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="text-neutral-600">{user.ordersCount}</span>
          {user.pendingOrdersCount > 0 && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700">
              <AlertCircleIcon className="size-3" />
              {user.pendingOrdersCount}
            </span>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="text-neutral-600">{user.registrationsCount}</span>
          {user.pendingRegistrationsCount > 0 && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700">
              <AlertCircleIcon className="size-3" />
              {user.pendingRegistrationsCount}
            </span>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm text-neutral-500" suppressHydrationWarning>
          {createDate(user.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </td>
      <td className="px-4 py-3 text-right">
        <Link href={`/dashboard/users/${user.id}`}>
          <Button variant="ghost" size="sm">
            View
          </Button>
        </Link>
      </td>
    </tr>
  );
}

export function UsersTable({
  viewModel,
  isPending,
  onSearch,
  onRoleFilter,
  onSortChange,
  onPageChange,
  onRoleChange,
}: UsersTableProps) {
  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3">
        <div className="relative w-full">
          <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
          <Input
            placeholder="Search by name, email, or ID..."
            value={viewModel.searchValue}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select value={viewModel.roleFilter} onValueChange={onRoleFilter}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Roles</SelectItem>
              <SelectItem value="ADMIN">Admins</SelectItem>
              <SelectItem value="USER">Users</SelectItem>
            </SelectContent>
          </Select>

          <Select value={viewModel.sortValue} onValueChange={onSortChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <ArrowDownUpIcon className="mr-2 size-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="pending_orders">Pending Orders</SelectItem>
              <SelectItem value="pending_registrations">
                Pending Registrations
              </SelectItem>
              <SelectItem value="most_orders">Most Orders</SelectItem>
              <SelectItem value="most_registrations">
                Most Registrations
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mobile: Cards */}
      <div className="space-y-3 md:hidden">
        {viewModel.users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onRoleChange={onRoleChange}
            isPending={isPending}
          />
        ))}
        {viewModel.users.length === 0 && (
          <div className="rounded-xl border border-neutral-200 bg-white py-12 text-center text-neutral-500">
            No users found
          </div>
        )}
      </div>

      {/* Desktop: Table */}
      <div className="hidden overflow-hidden rounded-xl border border-neutral-200 bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                  User
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                  Orders
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                  Registrations
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                  Joined
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-neutral-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {viewModel.users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onRoleChange={onRoleChange}
                  isPending={isPending}
                />
              ))}
              {viewModel.users.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-neutral-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {viewModel.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            Showing {viewModel.pagination.showingFrom} to{" "}
            {viewModel.pagination.showingTo} of {viewModel.pagination.total}{" "}
            users
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(viewModel.pagination.page - 1)}
              disabled={viewModel.pagination.page <= 1}
            >
              <ChevronLeftIcon className="size-4" />
            </Button>
            <span className="text-sm text-neutral-600">
              Page {viewModel.pagination.page} of{" "}
              {viewModel.pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(viewModel.pagination.page + 1)}
              disabled={
                viewModel.pagination.page >= viewModel.pagination.totalPages
              }
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
