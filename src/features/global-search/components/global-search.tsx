"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Loader2, Package, Search, ShoppingBag } from "lucide-react";
import { useEffect, useRef } from "react";

import { OptimizedImage, SearchInput } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";

import type { GlobalSearchProps, SearchTab } from "../types";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
}

function getStatusColor(status: string): string {
  switch (status) {
    case "DELIVERED":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "SHIPPED":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "PROCESSING":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "CANCELLED":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400";
  }
}

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

  // Focus input when opened
  useEffect(() => {
    if (viewModel.isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [viewModel.isOpen]);

  // Handle escape key
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 lg:top-24"
          >
            <div className="bg-background flex flex-col justify-center overflow-hidden rounded-2xl border border-neutral-200/50 shadow-2xl dark:border-neutral-700/50 dark:bg-neutral-900">
              {/* Search Input */}
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

              {/* Results */}
              {viewModel.searchQuery && (
                <div className="max-h-[60vh] overflow-y-auto">
                  {!viewModel.hasResults && !viewModel.isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Search className="text-muted-foreground mb-3 h-12 w-12" />
                      <p className="text-muted-foreground text-sm">
                        No results found for &quot;{viewModel.searchQuery}&quot;
                      </p>
                    </div>
                  ) : (
                    <Tabs
                      value={viewModel.activeTab}
                      onValueChange={(v) => onTabChange(v as SearchTab)}
                      className="w-full"
                    >
                      <div className="sticky top-0 z-10 border-b border-neutral-200 bg-white px-4 dark:border-neutral-700 dark:bg-neutral-900">
                        <div className="flex gap-6">
                          <button
                            onClick={() => onTabChange("products")}
                            className={cn(
                              "relative flex items-center gap-2 py-3 text-sm font-medium transition-colors",
                              viewModel.activeTab === "products"
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            <span>Products</span>
                            {viewModel.counts.products > 0 && (
                              <span className="bg-primary flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white">
                                {viewModel.counts.products}
                              </span>
                            )}
                            {viewModel.activeTab === "products" && (
                              <span className="bg-primary absolute bottom-0 left-0 h-0.5 w-full" />
                            )}
                          </button>

                          <button
                            onClick={() => onTabChange("events")}
                            className={cn(
                              "relative flex items-center gap-2 py-3 text-sm font-medium transition-colors",
                              viewModel.activeTab === "events"
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            <span>Events</span>
                            {viewModel.counts.events > 0 && (
                              <span className="bg-primary flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white">
                                {viewModel.counts.events}
                              </span>
                            )}
                            {viewModel.activeTab === "events" && (
                              <span className="bg-primary absolute bottom-0 left-0 h-0.5 w-full" />
                            )}
                          </button>

                          {viewModel.isAuthenticated && (
                            <button
                              onClick={() => onTabChange("orders")}
                              className={cn(
                                "relative flex items-center gap-2 py-3 text-sm font-medium transition-colors",
                                viewModel.activeTab === "orders"
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-foreground",
                              )}
                            >
                              <span>Orders</span>
                              {viewModel.counts.orders > 0 && (
                                <span className="bg-primary flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white">
                                  {viewModel.counts.orders}
                                </span>
                              )}
                              {viewModel.activeTab === "orders" && (
                                <span className="bg-primary absolute bottom-0 left-0 h-0.5 w-full" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Products Tab */}
                      <TabsContent value="products" className="mt-0">
                        {viewModel.products.length === 0 ? (
                          <div className="py-8 text-center">
                            <ShoppingBag className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                            <p className="text-muted-foreground text-sm">
                              No products found
                            </p>
                          </div>
                        ) : (
                          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {viewModel.products.map((product) => (
                              <button
                                key={product.id}
                                onClick={() => onProductClick(product.id)}
                                className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                              >
                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[10px] bg-neutral-100 dark:bg-neutral-800">
                                  <OptimizedImage
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                    {product.name}
                                  </p>
                                  {product.isOutOfStock && (
                                    <p className="text-xs text-neutral-500">
                                      Out of stock
                                    </p>
                                  )}
                                </div>
                                <p className="text-primary shrink-0 text-sm font-semibold">
                                  {formatPrice(product.price)}
                                </p>
                              </button>
                            ))}
                            {viewModel.counts.products >
                              viewModel.products.length && (
                              <button
                                onClick={onViewAllProducts}
                                className="text-primary hover:bg-primary/5 w-full py-3 text-center text-sm font-medium transition-colors"
                              >
                                View all {viewModel.counts.products} products →
                              </button>
                            )}
                          </div>
                        )}
                      </TabsContent>

                      {/* Events Tab */}
                      <TabsContent value="events" className="mt-0">
                        {viewModel.events.length === 0 ? (
                          <div className="py-8 text-center">
                            <Calendar className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                            <p className="text-muted-foreground text-sm">
                              No events found
                            </p>
                          </div>
                        ) : (
                          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {viewModel.events.map((event) => (
                              <button
                                key={event.id}
                                onClick={() => onEventClick(event.id)}
                                className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                              >
                                <div className="bg-primary/10 flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-[10px]">
                                  <span className="text-primary text-[10px] leading-none font-bold uppercase">
                                    {event.startsAt.split(" ")[0]}
                                  </span>
                                  <span className="text-primary text-base leading-none font-bold">
                                    {event.startsAt
                                      .split(" ")[1]
                                      ?.replace(",", "")}
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                    {event.title}
                                  </p>
                                  <p className="text-muted-foreground truncate text-xs">
                                    {event.startsAtTime} · {event.location}
                                  </p>
                                </div>
                                <p className="text-primary shrink-0 text-sm font-semibold">
                                  {formatPrice(event.price)}
                                </p>
                              </button>
                            ))}
                            {viewModel.counts.events >
                              viewModel.events.length && (
                              <button
                                onClick={onViewAllEvents}
                                className="text-primary hover:bg-primary/5 w-full py-3 text-center text-sm font-medium transition-colors"
                              >
                                View all {viewModel.counts.events} events →
                              </button>
                            )}
                          </div>
                        )}
                      </TabsContent>

                      {/* Orders Tab */}
                      {viewModel.isAuthenticated && (
                        <TabsContent value="orders" className="mt-0">
                          {viewModel.orders.length === 0 ? (
                            <div className="py-8 text-center">
                              <Package className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                              <p className="text-muted-foreground text-sm">
                                No orders found
                              </p>
                            </div>
                          ) : (
                            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                              {viewModel.orders.map((order) => (
                                <button
                                  key={order.id}
                                  onClick={() => onOrderClick(order.id)}
                                  className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                                >
                                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[10px] bg-neutral-100 dark:bg-neutral-800">
                                    <OptimizedImage
                                      src={order.firstProductImage}
                                      alt={order.firstProductName}
                                      fill
                                      className="object-cover"
                                      sizes="48px"
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                      Order #{order.orderNumber}
                                    </p>
                                    <p className="text-muted-foreground text-xs">
                                      {order.createdAt} · {order.productCount}{" "}
                                      item
                                      {order.productCount > 1 ? "s" : ""}
                                    </p>
                                  </div>
                                  <Badge
                                    className={cn(
                                      "shrink-0 text-[10px]",
                                      getStatusColor(order.status),
                                    )}
                                  >
                                    {order.status}
                                  </Badge>
                                </button>
                              ))}
                              {viewModel.counts.orders >
                                viewModel.orders.length && (
                                <button
                                  onClick={onViewAllOrders}
                                  className="text-primary hover:bg-primary/5 w-full py-3 text-center text-sm font-medium transition-colors"
                                >
                                  View all {viewModel.counts.orders} orders →
                                </button>
                              )}
                            </div>
                          )}
                        </TabsContent>
                      )}
                    </Tabs>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
