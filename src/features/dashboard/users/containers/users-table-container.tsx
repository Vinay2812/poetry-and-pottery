"use client";

import { updateUserRole } from "@/data/admin/users/gateway/server";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";

import type { UserRole } from "@/graphql/generated/types";

import { UsersTable } from "../components/users-table";
import type { UserSortOption } from "../types";
import type { UsersTableContainerProps } from "../types";
import { buildUsersTableViewModel } from "../types";

export function UsersTableContainer({
  data,
  currentUserId,
}: UsersTableContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const sortValue = (searchParams.get("sort") ||
    "pending_orders") as UserSortOption;

  const viewModel = useMemo(
    () =>
      buildUsersTableViewModel(
        data,
        currentUserId,
        search,
        searchParams.get("role") || "ALL",
        sortValue,
      ),
    [data, currentUserId, search, searchParams, sortValue],
  );

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

  const handleSortChange = useCallback(
    (value: UserSortOption) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "pending_orders") {
        params.set("sort", value);
      } else {
        params.delete("sort");
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
    (userId: number, newRole: UserRole) => {
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
    <UsersTable
      viewModel={viewModel}
      isPending={isPending}
      onSearch={handleSearch}
      onRoleFilter={handleRoleFilter}
      onSortChange={handleSortChange}
      onPageChange={handlePageChange}
      onRoleChange={handleRoleChange}
    />
  );
}
