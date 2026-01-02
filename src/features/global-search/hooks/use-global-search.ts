"use client";

import {
  type GlobalSearchResponse,
  globalSearch,
} from "@/data/search/gateway/server";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

import {
  type GlobalSearchViewModel,
  type SearchTab,
  buildEventSearchItem,
  buildOrderSearchItem,
  buildProductSearchItem,
} from "../types";

interface UseGlobalSearchOptions {
  debounceMs?: number;
}

export function useGlobalSearch(options: UseGlobalSearchOptions = {}) {
  const { debounceMs = 300 } = options;
  const { isSignedIn } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SearchTab>("products");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<GlobalSearchResponse | null>(null);

  const [debouncedSearchQuery] = useDebounce(searchQuery, debounceMs);

  // Debounced search
  useEffect(() => {
    function resetResults() {
      setResults(null);
      setIsLoading(false);
    }

    function setLoading(loading: boolean) {
      setIsLoading(loading);
    }

    if (!debouncedSearchQuery.trim()) {
      resetResults();
      return;
    }

    setLoading(true);

    globalSearch(debouncedSearchQuery)
      .then((data) => {
        setResults(data);
      })
      .catch((error) => {
        console.error("Search error:", error);
        setResults(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [debouncedSearchQuery, debounceMs, isSignedIn]);

  // Reset when closed
  useEffect(() => {
    function resetSearch() {
      setSearchQuery("");
      setResults(null);
      setActiveTab("products");
    }
    if (!isOpen) {
      resetSearch();
    }
  }, [isOpen]);

  const viewModel: GlobalSearchViewModel = useMemo(() => {
    const products = results?.products.map(buildProductSearchItem) ?? [];
    const events = results?.events.map(buildEventSearchItem) ?? [];
    const orders = results?.orders.map(buildOrderSearchItem) ?? [];
    const counts = results?.counts ?? { products: 0, events: 0, orders: 0 };
    const hasResults =
      counts.products > 0 || counts.events > 0 || counts.orders > 0;

    return {
      isOpen,
      isLoading,
      searchQuery,
      activeTab,
      products,
      events,
      orders,
      counts,
      hasResults,
      isAuthenticated: isSignedIn ?? false,
    };
  }, [isOpen, isLoading, searchQuery, activeTab, results, isSignedIn]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleQueryChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleTabChange = useCallback((tab: SearchTab) => {
    setActiveTab(tab);
  }, []);

  return {
    viewModel,
    handleOpen,
    handleClose,
    handleQueryChange,
    handleTabChange,
  };
}
