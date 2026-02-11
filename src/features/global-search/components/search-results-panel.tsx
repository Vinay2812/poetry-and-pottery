import { Calendar, Package, Search, ShoppingBag } from "lucide-react";

import { Tabs, TabsContent } from "@/components/ui/tabs";

import type { GlobalSearchProps, SearchTab } from "../types";
import { SearchEventResultItem } from "./search-event-result-item";
import { SearchOrderResultItem } from "./search-order-result-item";
import { SearchProductResultItem } from "./search-product-result-item";
import { SearchResultList } from "./search-result-list";
import { SearchTabButton } from "./search-tab-button";

type SearchResultsPanelProps = Pick<
  GlobalSearchProps,
  | "viewModel"
  | "onTabChange"
  | "onProductClick"
  | "onEventClick"
  | "onOrderClick"
  | "onViewAllProducts"
  | "onViewAllEvents"
  | "onViewAllOrders"
>;

export function SearchResultsPanel({
  viewModel,
  onTabChange,
  onProductClick,
  onEventClick,
  onOrderClick,
  onViewAllProducts,
  onViewAllEvents,
  onViewAllOrders,
}: SearchResultsPanelProps) {
  if (!viewModel.hasResults && !viewModel.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Search className="text-muted-foreground mb-3 h-12 w-12" />
        <p className="text-muted-foreground text-sm">
          No results found for &quot;{viewModel.searchQuery}&quot;
        </p>
      </div>
    );
  }

  return (
    <Tabs
      value={viewModel.activeTab}
      onValueChange={(v) => onTabChange(v as SearchTab)}
      className="w-full"
    >
      <div className="sticky top-0 z-10 border-b border-neutral-200 bg-white px-4 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex gap-6">
          <SearchTabButton
            label="Products"
            count={viewModel.counts.products}
            isActive={viewModel.activeTab === "products"}
            onClick={() => onTabChange("products")}
          />
          <SearchTabButton
            label="Events"
            count={viewModel.counts.events}
            isActive={viewModel.activeTab === "events"}
            onClick={() => onTabChange("events")}
          />
          {viewModel.isAuthenticated && (
            <SearchTabButton
              label="Orders"
              count={viewModel.counts.orders}
              isActive={viewModel.activeTab === "orders"}
              onClick={() => onTabChange("orders")}
            />
          )}
        </div>
      </div>

      <TabsContent value="products" className="mt-0">
        <SearchResultList
          isEmpty={viewModel.products.length === 0}
          emptyIcon={
            <ShoppingBag className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
          }
          emptyMessage="No products found"
          totalCount={viewModel.counts.products}
          visibleCount={viewModel.products.length}
          onViewAll={onViewAllProducts}
          viewAllLabel={`View all ${viewModel.counts.products} products \u2192`}
        >
          {viewModel.products.map((product) => (
            <SearchProductResultItem
              key={product.id}
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
              isOutOfStock={product.isOutOfStock}
              onClick={() => onProductClick(product.id)}
            />
          ))}
        </SearchResultList>
      </TabsContent>

      <TabsContent value="events" className="mt-0">
        <SearchResultList
          isEmpty={viewModel.events.length === 0}
          emptyIcon={
            <Calendar className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
          }
          emptyMessage="No events found"
          totalCount={viewModel.counts.events}
          visibleCount={viewModel.events.length}
          onViewAll={onViewAllEvents}
          viewAllLabel={`View all ${viewModel.counts.events} events \u2192`}
        >
          {viewModel.events.map((event) => (
            <SearchEventResultItem
              key={event.id}
              title={event.title}
              startsAt={event.startsAt}
              startsAtTime={event.startsAtTime}
              location={event.location}
              price={event.price}
              onClick={() => onEventClick(event.id)}
            />
          ))}
        </SearchResultList>
      </TabsContent>

      {viewModel.isAuthenticated && (
        <TabsContent value="orders" className="mt-0">
          <SearchResultList
            isEmpty={viewModel.orders.length === 0}
            emptyIcon={
              <Package className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
            }
            emptyMessage="No orders found"
            totalCount={viewModel.counts.orders}
            visibleCount={viewModel.orders.length}
            onViewAll={onViewAllOrders}
            viewAllLabel={`View all ${viewModel.counts.orders} orders \u2192`}
          >
            {viewModel.orders.map((order) => (
              <SearchOrderResultItem
                key={order.id}
                orderNumber={order.orderNumber}
                createdAt={order.createdAt}
                status={order.status}
                productCount={order.productCount}
                firstProductName={order.firstProductName}
                firstProductImage={order.firstProductImage}
                onClick={() => onOrderClick(order.id)}
              />
            ))}
          </SearchResultList>
        </TabsContent>
      )}
    </Tabs>
  );
}
