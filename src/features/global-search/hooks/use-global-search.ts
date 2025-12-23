"use client";

import { type GlobalSearchResult, globalSearch } from "@/actions";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useMemo, useState } from "react";

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
  const [results, setResults] = useState<GlobalSearchResult | null>(null);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(async () => {
      try {
        const data = await globalSearch(searchQuery);
        setResults(data);

        // Auto-select first tab with results
        if (data.counts.products > 0) {
          setActiveTab("products");
        } else if (data.counts.events > 0) {
          setActiveTab("events");
        } else if (data.counts.orders > 0 && isSignedIn) {
          setActiveTab("orders");
        }
      } catch (error) {
        console.error("Search error:", error);
        setResults(null);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery, debounceMs, isSignedIn]);

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setResults(null);
      setActiveTab("products");
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
