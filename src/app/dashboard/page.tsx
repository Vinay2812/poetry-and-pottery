import {
  getDashboardStats,
  getLowStockProducts,
  getRecentOrders,
  getRecentRegistrations,
  getUpcomingEvents,
} from "@/actions/admin";
import {
  ArrowRightIcon,
  CalendarIcon,
  PackageIcon,
  TrendingUpIcon,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  const [
    stats,
    recentOrders,
    recentRegistrations,
    lowStockProducts,
    upcomingEvents,
  ] = await Promise.all([
    getDashboardStats(),
    getRecentOrders(5),
    getRecentRegistrations(5),
    getLowStockProducts(5),
    getUpcomingEvents(5),
  ]);

  const totalRevenue =
    stats.revenue.totalOrders + stats.revenue.totalRegistrations;

  const hasAttention =
    stats.orders.pending > 0 ||
    stats.orders.processing > 0 ||
    stats.registrations.pending > 0 ||
    stats.products.outOfStock > 0 ||
    stats.products.lowStock > 0 ||
    stats.events.upcomingIn7Days > 0;

  return (
    <div className="space-y-12">
      {/* Hero Stats */}
      <div className="from-primary/10 via-primary/5 rounded-3xl bg-gradient-to-br to-transparent p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s an overview of your store
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-muted-foreground text-sm font-medium">
              Total Revenue
            </p>
            <p className="text-primary text-3xl font-bold">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </p>
            <p className="text-muted-foreground text-sm">
              from {stats.orders.total + stats.registrations.total} transactions
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-medium">Orders</p>
            <p className="text-3xl font-bold">{stats.orders.total}</p>
            <p className="text-muted-foreground text-sm">
              {stats.orders.pending > 0 && (
                <span className="text-amber-600">
                  {stats.orders.pending} pending
                </span>
              )}
              {stats.orders.pending === 0 && "All processed"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-medium">
              Registrations
            </p>
            <p className="text-3xl font-bold">{stats.registrations.total}</p>
            <p className="text-muted-foreground text-sm">
              {stats.registrations.pending > 0 && (
                <span className="text-amber-600">
                  {stats.registrations.pending} pending
                </span>
              )}
              {stats.registrations.pending === 0 && "All confirmed"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-medium">Users</p>
            <p className="text-3xl font-bold">{stats.users.total}</p>
            <p className="text-muted-foreground text-sm">
              <span className="text-primary">+{stats.users.newThisMonth}</span>{" "}
              this month
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {hasAttention && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.orders.pending > 0 && (
            <Link
              href="/dashboard/users"
              className="group flex items-center gap-3 rounded-2xl bg-amber-50 p-4 transition-colors hover:bg-amber-100"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 group-hover:bg-amber-200">
                <span className="text-lg font-bold">
                  {stats.orders.pending}
                </span>
              </div>
              <div>
                <p className="font-medium text-amber-900">Pending Orders</p>
                <p className="text-sm text-amber-600">Review now →</p>
              </div>
            </Link>
          )}
          {stats.orders.processing > 0 && (
            <Link
              href="/dashboard/users"
              className="group flex items-center gap-3 rounded-2xl bg-blue-50 p-4 transition-colors hover:bg-blue-100"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-200">
                <span className="text-lg font-bold">
                  {stats.orders.processing}
                </span>
              </div>
              <div>
                <p className="font-medium text-blue-900">Processing</p>
                <p className="text-sm text-blue-600">Track status →</p>
              </div>
            </Link>
          )}
          {stats.registrations.pending > 0 && (
            <Link
              href="/dashboard/events"
              className="group flex items-center gap-3 rounded-2xl bg-purple-50 p-4 transition-colors hover:bg-purple-100"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 group-hover:bg-purple-200">
                <span className="text-lg font-bold">
                  {stats.registrations.pending}
                </span>
              </div>
              <div>
                <p className="font-medium text-purple-900">
                  Pending Registrations
                </p>
                <p className="text-sm text-purple-600">Confirm now →</p>
              </div>
            </Link>
          )}
          {stats.products.outOfStock > 0 && (
            <Link
              href="/dashboard/products"
              className="group flex items-center gap-3 rounded-2xl bg-red-50 p-4 transition-colors hover:bg-red-100"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-red-100 text-red-600 group-hover:bg-red-200">
                <span className="text-lg font-bold">
                  {stats.products.outOfStock}
                </span>
              </div>
              <div>
                <p className="font-medium text-red-900">Out of Stock</p>
                <p className="text-sm text-red-600">Restock now →</p>
              </div>
            </Link>
          )}
          {stats.products.lowStock > 0 && (
            <Link
              href="/dashboard/products"
              className="group bg-terracotta/10 hover:bg-terracotta/20 flex items-center gap-3 rounded-2xl p-4 transition-colors"
            >
              <div className="bg-terracotta/20 text-terracotta group-hover:bg-terracotta/30 flex size-10 items-center justify-center rounded-xl">
                <span className="text-lg font-bold">
                  {stats.products.lowStock}
                </span>
              </div>
              <div>
                <p className="text-terracotta font-medium">Low Stock</p>
                <p className="text-terracotta/80 text-sm">Check inventory →</p>
              </div>
            </Link>
          )}
          {stats.events.upcomingIn7Days > 0 && (
            <Link
              href="/dashboard/events"
              className="group flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 transition-colors hover:bg-emerald-100"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200">
                <span className="text-lg font-bold">
                  {stats.events.upcomingIn7Days}
                </span>
              </div>
              <div>
                <p className="font-medium text-emerald-900">Events This Week</p>
                <p className="text-sm text-emerald-600">Starting soon →</p>
              </div>
            </Link>
          )}
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Recent Orders */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link
              href="/dashboard/users"
              className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
            >
              View all <ArrowRightIcon className="size-3" />
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">
              No orders yet
            </p>
          ) : (
            <div className="divide-y">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">
                      {order.user.name || order.user.email.split("@")[0]}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {new Date(order.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ₹{order.total.toLocaleString("en-IN")}
                    </p>
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent Registrations */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Registrations</h2>
            <Link
              href="/dashboard/events"
              className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
            >
              View all <ArrowRightIcon className="size-3" />
            </Link>
          </div>
          {recentRegistrations.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">
              No registrations yet
            </p>
          ) : (
            <div className="divide-y">
              {recentRegistrations.map((reg) => (
                <div
                  key={reg.id}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">
                      {reg.user.name || reg.user.email.split("@")[0]}
                    </p>
                    <p className="text-muted-foreground truncate text-sm">
                      {reg.event.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ₹{reg.price.toLocaleString("en-IN")}
                    </p>
                    <StatusBadge status={reg.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Inventory & Events */}
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Low Stock Products */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PackageIcon className="text-terracotta size-5" />
              <h2 className="text-lg font-semibold">Inventory Alerts</h2>
            </div>
            <Link
              href="/dashboard/products"
              className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
            >
              Manage <ArrowRightIcon className="size-3" />
            </Link>
          </div>
          {lowStockProducts.length === 0 ? (
            <div className="bg-primary/5 rounded-2xl py-8 text-center">
              <p className="text-primary font-medium">
                All products well stocked!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-4 rounded-xl bg-neutral-50 px-4 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{product.name}</p>
                    <p className="text-muted-foreground text-sm">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <Badge
                    variant={
                      product.available_quantity === 0
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {product.available_quantity === 0
                      ? "Out of stock"
                      : `${product.available_quantity} left`}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Upcoming Events */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-5 text-purple-600" />
              <h2 className="text-lg font-semibold">Upcoming Events</h2>
            </div>
            <Link
              href="/dashboard/events"
              className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
            >
              Manage <ArrowRightIcon className="size-3" />
            </Link>
          </div>
          {upcomingEvents.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">
              No upcoming events
            </p>
          ) : (
            <div className="space-y-2">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between gap-4 rounded-xl bg-neutral-50 px-4 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{event.title}</p>
                    <p className="text-muted-foreground text-sm">
                      {new Date(event.starts_at).toLocaleDateString("en-IN", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-medium">
                      {event.available_seats}/{event.total_seats} seats
                    </p>
                    {event._count.event_registrations > 0 && (
                      <p className="text-muted-foreground">
                        {event._count.event_registrations} registered
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Revenue Breakdown */}
      <section className="rounded-3xl bg-neutral-50 p-8">
        <div className="mb-6 flex items-center gap-2">
          <TrendingUpIcon className="text-primary size-5" />
          <h2 className="text-lg font-semibold">Revenue Breakdown</h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-muted-foreground mb-1 text-sm">Product Sales</p>
            <p className="text-2xl font-bold">
              ₹{stats.revenue.totalOrders.toLocaleString("en-IN")}
            </p>
            <p className="text-muted-foreground text-sm">
              {stats.orders.total} orders
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1 text-sm">
              Event Registrations
            </p>
            <p className="text-2xl font-bold">
              ₹{stats.revenue.totalRegistrations.toLocaleString("en-IN")}
            </p>
            <p className="text-muted-foreground text-sm">
              {stats.registrations.total} registrations
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4">
            <p className="text-primary mb-1 text-sm font-medium">
              Total Revenue
            </p>
            <p className="text-primary text-2xl font-bold">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </p>
            <p className="text-muted-foreground text-sm">
              {stats.orders.total + stats.registrations.total} transactions
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    PENDING: { label: "Pending", className: "bg-amber-100 text-amber-700" },
    PROCESSING: { label: "Processing", className: "bg-blue-100 text-blue-700" },
    APPROVED: { label: "Approved", className: "bg-blue-100 text-blue-700" },
    PAID: { label: "Paid", className: "bg-primary/10 text-primary" },
    CONFIRMED: { label: "Confirmed", className: "bg-primary/10 text-primary" },
    SHIPPED: { label: "Shipped", className: "bg-purple-100 text-purple-700" },
    DELIVERED: { label: "Delivered", className: "bg-primary/10 text-primary" },
    CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-700" },
    REJECTED: { label: "Rejected", className: "bg-red-100 text-red-700" },
    RETURNED: { label: "Returned", className: "bg-red-100 text-red-700" },
    REFUNDED: {
      label: "Refunded",
      className: "bg-neutral-100 text-neutral-700",
    },
  };

  const { label, className } = config[status] || {
    label: status,
    className: "bg-neutral-100 text-neutral-700",
  };

  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}
