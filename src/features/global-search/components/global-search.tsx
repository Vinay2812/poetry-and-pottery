"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

import { SearchInput } from "@/components/shared";

import type { GlobalSearchProps } from "../types";
import { SearchResultsPanel } from "./search-results-panel";

export function GlobalSearch({
  viewModel,
  onQueryChange,
  onTabChange,
  onClose,
  onProductClick,
  onEventClick,
  onOrderClick,
  onViewAllProducts,
  onViewAllEvents,
  onViewAllOrders,
}: GlobalSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (viewModel.isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [viewModel.isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && viewModel.isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [viewModel.isOpen, onClose]);

  if (!viewModel.isOpen) return null;

  return (
    <AnimatePresence>
      {viewModel.isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 lg:top-24"
          >
            <div className="bg-background flex flex-col justify-center overflow-hidden rounded-2xl border border-neutral-200/50 shadow-2xl dark:border-neutral-700/50 dark:bg-neutral-900">
              <div className="relative w-full border-b border-neutral-200 dark:border-neutral-700">
                <SearchInput
                  value={viewModel.searchQuery}
                  onChange={onQueryChange}
                  placeholder="Search products, events, orders..."
                  className="mt-0 border-none ring-0 focus:ring-0"
                  autoFocus={true}
                />
                {viewModel.isLoading ? (
                  <>
                    <Loader2 className="text-muted-foreground absolute top-1/2 right-8 h-5 w-5 -translate-y-1/2 animate-spin" />
                    Searching...
                  </>
                ) : null}
              </div>

              {viewModel.searchQuery && (
                <div className="max-h-[60vh] overflow-y-auto">
                  <SearchResultsPanel
                    viewModel={viewModel}
                    onTabChange={onTabChange}
                    onProductClick={onProductClick}
                    onEventClick={onEventClick}
                    onOrderClick={onOrderClick}
                    onViewAllProducts={onViewAllProducts}
                    onViewAllEvents={onViewAllEvents}
                    onViewAllOrders={onViewAllOrders}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
