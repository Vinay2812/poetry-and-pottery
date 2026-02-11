"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

interface UseURLFilterHandlersOptions {
  basePath: string;
}

export function useURLFilterHandlers({
  basePath,
}: UseURLFilterHandlersOptions) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const createFilterHandler = useCallback(
    (paramName: string) => {
      return (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== "ALL") {
          params.set(paramName, value);
        } else {
          params.delete(paramName);
        }
        params.set("page", "1");
        startTransition(() => {
          router.push(`${basePath}?${params.toString()}`);
        });
      };
    },
    [router, searchParams, basePath, startTransition],
  );

  const createSearchHandler = useCallback(
    (setSearchState: (value: string) => void) => {
      return (value: string) => {
        setSearchState(value);
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
          params.set("search", value);
        } else {
          params.delete("search");
        }
        params.set("page", "1");
        startTransition(() => {
          router.push(`${basePath}?${params.toString()}`);
        });
      };
    },
    [router, searchParams, basePath, startTransition],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      startTransition(() => {
        router.push(`${basePath}?${params.toString()}`);
      });
    },
    [router, searchParams, basePath, startTransition],
  );

  return {
    createFilterHandler,
    createSearchHandler,
    handlePageChange,
    isPending,
  };
}
