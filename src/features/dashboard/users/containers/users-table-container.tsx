"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";

import { useAdminUpdateUserRoleMutation } from "@/graphql/generated/graphql";
import type { UserRole } from "@/graphql/generated/types";

import { UsersTable } from "../components/users-table";
import type { UserSortOption } from "../types";
import type { UsersTableContainerProps } from "../types";
import { buildUsersTableViewModel } from "../types";
import { UserBookingsAccordionContainer } from "./user-bookings-accordion-container";

export function UsersTableContainer({
  data,
  currentUserId,
}: UsersTableContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [updateUserRoleMutation] = useAdminUpdateUserRoleMutation();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const committedSearch = searchParams.get("search") ?? "";
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);
  const [trackedSearch, setTrackedSearch] = useState<string | null>(null);

  // Auto-expand when a search narrows to exactly one user (e.g. a booking id).
  // Adjusting state during render (instead of an effect) keeps it in sync with
  // the committed search without an extra render pass, and still lets the admin
  // manually toggle rows afterwards.
  if (trackedSearch !== committedSearch) {
    setTrackedSearch(committedSearch);
    setExpandedUserId(
      committedSearch && data.users.length === 1 ? data.users[0].id : null,
    );
  }

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

  const handleToggleExpand = useCallback((userId: number) => {
    setExpandedUserId((current) => (current === userId ? null : userId));
  }, []);

  const renderUserBookings = useCallback(
    (userId: number) => (
      <UserBookingsAccordionContainer
        userId={userId}
        matchQuery={committedSearch}
      />
    ),
    [committedSearch],
  );

  const handleRoleChange = useCallback(
    (userId: number, newRole: UserRole) => {
      startTransition(async () => {
        try {
          const { data } = await updateUserRoleMutation({
            variables: { userId, role: newRole },
          });
          const result = data?.adminUpdateUserRole;
          if (!result?.success) {
            console.error("Failed to update role:", result?.error);
          }
        } catch (error) {
          console.error("Failed to update role:", error);
        }
        router.refresh();
      });
    },
    [router, updateUserRoleMutation],
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
      expandedUserId={expandedUserId}
      onToggleExpand={handleToggleExpand}
      renderUserBookings={renderUserBookings}
    />
  );
}
