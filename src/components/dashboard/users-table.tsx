"use client";

import { updateUserRole } from "@/data/admin/users/gateway/server";
import { UserRole } from "@/prisma/generated/enums";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  ShieldIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

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

import type { AdminUser, AdminUsersResponse } from "@/graphql/generated/types";

interface UsersTableProps {
  data: AdminUsersResponse;
  currentUserId: number;
}

export function UsersTable({ data, currentUserId }: UsersTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      startTransition(() => {
        router.push(`/dashboard/users?${params.toString()}`);
      });
    },
    [router, searchParams, startTransition],
  );

  const handleRoleFilter = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "ALL") {
        params.set("role", value);
      } else {
        params.delete("role");
      }
      params.set("page", "1");
      startTransition(() => {
        router.push(`/dashboard/users?${params.toString()}`);
      });
    },
    [router, searchParams, startTransition],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      startTransition(() => {
        router.push(`/dashboard/users?${params.toString()}`);
      });
    },
    [router, searchParams, startTransition],
  );

  const handleRoleChange = useCallback(
    async (userId: number, newRole: UserRole) => {
      startTransition(async () => {
        const result = await updateUserRole(userId, newRole);
        if (!result.success) {
          console.error("Failed to update role:", result.error);
        }
        router.refresh();
      });
    },
    [router],
  );

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
          <Input
            placeholder="Search by name, email, or ID..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select
          value={searchParams.get("role") || "ALL"}
          onValueChange={handleRoleFilter}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Roles</SelectItem>
            <SelectItem value="ADMIN">Admins</SelectItem>
            <SelectItem value="USER">Users</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
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
                <th className="hidden px-4 py-3 text-left text-sm font-semibold text-neutral-600 md:table-cell">
                  Orders
                </th>
                <th className="hidden px-4 py-3 text-left text-sm font-semibold text-neutral-600 md:table-cell">
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
              {data.users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  isCurrentUser={user.id === currentUserId}
                  onRoleChange={handleRoleChange}
                  isPending={isPending}
                />
              ))}
              {data.users.length === 0 && (
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
      {data.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            Showing {(data.page - 1) * data.limit + 1} to{" "}
            {Math.min(data.page * data.limit, data.total)} of {data.total} users
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(data.page - 1)}
              disabled={data.page <= 1}
            >
              <ChevronLeftIcon className="size-4" />
            </Button>
            <span className="text-sm text-neutral-600">
              Page {data.page} of {data.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(data.page + 1)}
              disabled={data.page >= data.totalPages}
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

interface UserRowProps {
  user: AdminUser;
  isCurrentUser: boolean;
  onRoleChange: (userId: number, newRole: UserRole) => Promise<void>;
  isPending: boolean;
}

function UserRow({
  user,
  isCurrentUser,
  onRoleChange,
  isPending,
}: UserRowProps) {
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
        {isCurrentUser ? (
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
                  variant={user.role === UserRole.ADMIN ? "default" : "outline"}
                  className="cursor-pointer gap-1 transition-opacity hover:opacity-80"
                >
                  {user.role === UserRole.ADMIN && (
                    <ShieldIcon className="size-3" />
                  )}
                  {user.role}
                </Badge>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() => onRoleChange(user.id, UserRole.USER)}
                disabled={user.role === UserRole.USER}
              >
                <UserIcon className="mr-2 size-4" />
                Set as User
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onRoleChange(user.id, UserRole.ADMIN)}
                disabled={user.role === UserRole.ADMIN}
              >
                <ShieldIcon className="mr-2 size-4" />
                Set as Admin
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </td>
      <td className="hidden px-4 py-3 md:table-cell">
        <span className="text-neutral-600">{user._count.product_orders}</span>
      </td>
      <td className="hidden px-4 py-3 md:table-cell">
        <span className="text-neutral-600">
          {user._count.event_registrations}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm text-neutral-500" suppressHydrationWarning>
          {new Date(user.created_at).toLocaleDateString("en-IN", {
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
