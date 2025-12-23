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
            className="fixed top-4 right-4 left-4 z-50 mx-auto max-w-2xl lg:top-24"
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
                  <Loader2 className="text-muted-foreground absolute top-1/2 right-8 h-5 w-5 -translate-y-1/2 animate-spin" />
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
                      <div className="sticky top-0 z-10 border-b border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => onTabChange("products")}
                            className={cn(
                              "group relative flex min-w-24 flex-col items-center gap-1.5 rounded-xl px-4 py-2.5 transition-all duration-200",
                              viewModel.activeTab === "products"
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            )}
                          >
                            <div className="relative">
                              <ShoppingBag
                                className={cn(
                                  "h-5 w-5 transition-colors duration-200",
                                  viewModel.activeTab === "products"
                                    ? "text-primary"
                                    : "text-muted-foreground group-hover:text-foreground",
                                )}
                                strokeWidth={
                                  viewModel.activeTab === "products" ? 2.5 : 2
                                }
                              />
                              {viewModel.counts.products > 0 && (
                                <span className="bg-primary text-primary-foreground absolute -top-2 -right-3 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold">
                                  {viewModel.counts.products}
                                </span>
                              )}
                            </div>
                            <span className="text-xs font-medium">
                              Products
                            </span>
                          </button>

                          <button
                            onClick={() => onTabChange("events")}
                            className={cn(
                              "group relative flex min-w-24 flex-col items-center gap-1.5 rounded-xl px-4 py-2.5 transition-all duration-200",
                              viewModel.activeTab === "events"
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            )}
                          >
                            <div className="relative">
                              <Calendar
                                className={cn(
                                  "h-5 w-5 transition-colors duration-200",
                                  viewModel.activeTab === "events"
                                    ? "text-primary"
                                    : "text-muted-foreground group-hover:text-foreground",
                                )}
                                strokeWidth={
                                  viewModel.activeTab === "events" ? 2.5 : 2
                                }
                              />
                              {viewModel.counts.events > 0 && (
                                <span className="bg-primary text-primary-foreground absolute -top-2 -right-3 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold">
                                  {viewModel.counts.events}
                                </span>
                              )}
                            </div>
                            <span className="text-xs font-medium">Events</span>
                          </button>

                          {viewModel.isAuthenticated && (
                            <button
                              onClick={() => onTabChange("orders")}
                              className={cn(
                                "group relative flex min-w-24 flex-col items-center gap-1.5 rounded-xl px-4 py-2.5 transition-all duration-200",
                                viewModel.activeTab === "orders"
                                  ? "bg-primary/10 text-primary"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                              )}
                            >
                              <div className="relative">
                                <Package
                                  className={cn(
                                    "h-5 w-5 transition-colors duration-200",
                                    viewModel.activeTab === "orders"
                                      ? "text-primary"
                                      : "text-muted-foreground group-hover:text-foreground",
                                  )}
                                  strokeWidth={
                                    viewModel.activeTab === "orders" ? 2.5 : 2
                                  }
                                />
                                {viewModel.counts.orders > 0 && (
                                  <span className="bg-primary text-primary-foreground absolute -top-2 -right-3 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold">
                                    {viewModel.counts.orders}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs font-medium">
                                Orders
                              </span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Products Tab */}
                      <TabsContent value="products" className="mt-0 p-4">
                        {viewModel.products.length === 0 ? (
                          <div className="py-8 text-center">
                            <ShoppingBag className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                            <p className="text-muted-foreground text-sm">
                              No products found
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                              {viewModel.products.map((product) => (
                                <button
                                  key={product.id}
                                  onClick={() => onProductClick(product.slug)}
                                  className="group shadow-soft hover:shadow-card overflow-hidden rounded-[2rem] border border-neutral-100 bg-white text-left transition-all dark:border-neutral-800 dark:bg-neutral-900"
                                >
                                  <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                    <OptimizedImage
                                      src={product.imageUrl}
                                      alt={product.name}
                                      fill
                                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                                      sizes="(max-width: 640px) 50vw, 33vw"
                                    />
                                    {product.isOutOfStock && (
                                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                        <Badge variant="secondary">
                                          Out of Stock
                                        </Badge>
                                      </div>
                                    )}
                                  </div>
                                  <div className="p-3">
                                    <p className="line-clamp-2 text-sm font-semibold text-neutral-900 lg:text-base dark:text-neutral-100">
                                      {product.name}
                                    </p>
                                    <p className="text-primary mt-1 text-sm font-bold lg:text-base">
                                      {formatPrice(product.price)}
                                    </p>
                                  </div>
                                </button>
                              ))}
                            </div>
                            {viewModel.counts.products >
                              viewModel.products.length && (
                              <button
                                onClick={onViewAllProducts}
                                className="text-primary hover:text-primary/80 w-full py-2 text-center text-sm font-medium transition-colors"
                              >
                                View all {viewModel.counts.products} products
                              </button>
                            )}
                          </div>
                        )}
                      </TabsContent>

                      {/* Events Tab */}
                      <TabsContent value="events" className="mt-0 p-4">
                        {viewModel.events.length === 0 ? (
                          <div className="py-8 text-center">
                            <Calendar className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                            <p className="text-muted-foreground text-sm">
                              No events found
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                              {viewModel.events.map((event) => (
                                <button
                                  key={event.id}
                                  onClick={() => onEventClick(event.id)}
                                  className="group shadow-soft hover:shadow-card overflow-hidden rounded-[2rem] border border-neutral-100 bg-white text-left transition-all dark:border-neutral-800 dark:bg-neutral-900"
                                >
                                  <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                    <OptimizedImage
                                      src={event.imageUrl}
                                      alt={event.title}
                                      fill
                                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                                      sizes="(max-width: 640px) 50vw, 33vw"
                                    />
                                  </div>
                                  <div className="p-3">
                                    <p className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase lg:text-xs dark:text-neutral-400">
                                      {event.startsAt}
                                    </p>
                                    <p className="mt-1 line-clamp-2 text-sm font-semibold text-neutral-900 lg:text-base dark:text-neutral-100">
                                      {event.title}
                                    </p>
                                    <p className="text-primary mt-1 text-sm font-bold lg:text-base">
                                      {formatPrice(event.price)}
                                    </p>
                                  </div>
                                </button>
                              ))}
                            </div>
                            {viewModel.counts.events >
                              viewModel.events.length && (
                              <button
                                onClick={onViewAllEvents}
                                className="text-primary hover:text-primary/80 w-full py-2 text-center text-sm font-medium transition-colors"
                              >
                                View all {viewModel.counts.events} events
                              </button>
                            )}
                          </div>
                        )}
                      </TabsContent>

                      {/* Orders Tab */}
                      {viewModel.isAuthenticated && (
                        <TabsContent value="orders" className="mt-0 p-4">
                          {viewModel.orders.length === 0 ? (
                            <div className="py-8 text-center">
                              <Package className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                              <p className="text-muted-foreground text-sm">
                                No orders found
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {viewModel.orders.map((order) => (
                                  <button
                                    key={order.id}
                                    onClick={() => onOrderClick(order.id)}
                                    className="group shadow-soft hover:shadow-card overflow-hidden rounded-[2rem] border border-neutral-100 bg-white text-left transition-all dark:border-neutral-800 dark:bg-neutral-900"
                                  >
                                    <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                      <OptimizedImage
                                        src={order.firstProductImage}
                                        alt={order.firstProductName}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 640px) 50vw, 33vw"
                                      />
                                      <div className="absolute top-2 right-2">
                                        <Badge
                                          className={cn(
                                            "text-[10px]",
                                            getStatusColor(order.status),
                                          )}
                                        >
                                          {order.status}
                                        </Badge>
                                      </div>
                                    </div>
                                    <div className="p-3">
                                      <p className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase lg:text-xs dark:text-neutral-400">
                                        {order.createdAt}
                                      </p>
                                      <p className="mt-1 text-sm font-semibold text-neutral-900 lg:text-base dark:text-neutral-100">
                                        Order #{order.orderNumber}
                                      </p>
                                      <p className="text-muted-foreground mt-1 text-[10px] lg:text-xs">
                                        {order.productCount} item
                                        {order.productCount > 1 ? "s" : ""}
                                      </p>
                                    </div>
                                  </button>
                                ))}
                              </div>
                              {viewModel.counts.orders >
                                viewModel.orders.length && (
                                <button
                                  onClick={onViewAllOrders}
                                  className="text-primary hover:text-primary/80 w-full py-2 text-center text-sm font-medium transition-colors"
                                >
                                  View all {viewModel.counts.orders} orders
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
