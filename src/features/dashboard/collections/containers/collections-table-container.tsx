"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";

import { useAdminDeleteCollectionMutation } from "@/graphql/generated/graphql";

import { CollectionsTable } from "../components/collections-table";
import type { CollectionsTableContainerProps } from "../types";
import { buildCollectionsTableViewModel } from "../types";

export function CollectionsTableContainer({
  data,
}: CollectionsTableContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [deleteCollectionMutation, { loading: deleteLoading }] =
    useAdminDeleteCollectionMutation();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const viewModel = useMemo(
    () =>
      buildCollectionsTableViewModel(
        data,
        search,
        searchParams.get("status") || "ALL",
      ),
    [data, search, searchParams],
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
        router.push(`/dashboard/collections?${params.toString()}`);
      });
    },
    [router, searchParams, startTransition],
  );

  const handleStatusFilter = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "ALL") {
        params.set("status", value);
      } else {
        params.delete("status");
      }
      params.set("page", "1");
      startTransition(() => {
        router.push(`/dashboard/collections?${params.toString()}`);
      });
    },
    [router, searchParams, startTransition],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      startTransition(() => {
        router.push(`/dashboard/collections?${params.toString()}`);
      });
    },
    [router, searchParams, startTransition],
  );

  const handleDelete = useCallback(
    async (collectionId: number) => {
      if (
        !confirm(
          "Are you sure you want to delete this collection? Products will be unassigned from it.",
        )
      ) {
        return;
      }

      try {
        const { data } = await deleteCollectionMutation({
          variables: { id: collectionId },
        });
        const result = data?.adminDeleteCollection;
        if (!result?.success) {
          console.error("Failed to delete collection:", result?.error);
          alert(result?.error || "Failed to delete collection");
        }
      } catch (error) {
        console.error("Failed to delete collection:", error);
      } finally {
        router.refresh();
      }
    },
    [deleteCollectionMutation, router],
  );

  return (
    <CollectionsTable
      viewModel={viewModel}
      isPending={isPending || deleteLoading}
      onSearch={handleSearch}
      onStatusFilter={handleStatusFilter}
      onPageChange={handlePageChange}
      onDelete={handleDelete}
    />
  );
}
