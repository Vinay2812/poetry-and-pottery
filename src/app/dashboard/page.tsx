import {
  getDashboardStats,
  getLowStockProducts,
  getNewsletterSubscribers,
  getRecentOrders,
  getRecentRegistrations,
  getUpcomingEvents,
} from "@/data/admin/analytics/gateway/server";
import {
  HeroStats,
  InventoryAlertsSection,
  NewsletterSection,
  QuickActions,
  RecentOrdersSection,
  RecentRegistrationsSection,
  RevenueBreakdownSection,
  UpcomingEventsSection,
} from "@/features/dashboard/home";
import { Suspense } from "react";

import { DashboardSectionSkeleton } from "@/components/skeletons";

/**
 * Route: /dashboard
 * Page does: Admin analytics home for revenue, operations health, and quick-action monitoring.
 * Key UI operations:
 * - Review KPI cards, recent activity, inventory alerts, upcoming events, and newsletter stats.
 * - Use quick actions to jump into high-priority operational workflows.
 * UI info needed for operations:
 * - Admin authorization and aggregated analytics payloads from orders, registrations, users, products, and events.
 * - Recent-activity datasets and totals required by each dashboard section component.
 */
export default async function DashboardPage() {
  const [
    stats,
    recentOrders,
    recentRegistrations,
    lowStockProducts,
    upcomingEvents,
    newsletterSubscribers,
  ] = await Promise.all([
    getDashboardStats(),
    getRecentOrders(5),
    getRecentRegistrations(5),
    getLowStockProducts(5),
    getUpcomingEvents(5),
    getNewsletterSubscribers(5),
  ]);

  const totalRevenue =
    stats.revenue.totalOrders + stats.revenue.totalRegistrations;
  const totalTransactions = stats.orders.total + stats.registrations.total;

  return (
    <div className="space-y-12">
      <Suspense fallback={<DashboardSectionSkeleton />}>
        <HeroStats
          totalRevenue={totalRevenue}
          totalTransactions={totalTransactions}
          ordersTotal={stats.orders.total}
          ordersPending={stats.orders.pending}
          registrationsTotal={stats.registrations.total}
          registrationsPending={stats.registrations.pending}
          usersTotal={stats.users.total}
          usersNewThisMonth={stats.users.newThisMonth}
        />
      </Suspense>

      <Suspense fallback={<DashboardSectionSkeleton />}>
        <QuickActions
          ordersPending={stats.orders.pending}
          ordersProcessing={stats.orders.processing}
          registrationsPending={stats.registrations.pending}
          productsOutOfStock={stats.products.outOfStock}
          productsLowStock={stats.products.lowStock}
          eventsUpcomingIn7Days={stats.events.upcomingIn7Days}
        />
      </Suspense>

      {/* Recent Activity */}
      <Suspense fallback={<DashboardSectionSkeleton />}>
        <div className="grid gap-12 lg:grid-cols-2">
          <RecentOrdersSection orders={recentOrders} />
          <RecentRegistrationsSection registrations={recentRegistrations} />
        </div>
      </Suspense>

      {/* Inventory & Events */}
      <Suspense fallback={<DashboardSectionSkeleton />}>
        <div className="grid gap-12 lg:grid-cols-2">
          <InventoryAlertsSection products={lowStockProducts} />
          <UpcomingEventsSection events={upcomingEvents} />
        </div>
      </Suspense>

      <Suspense fallback={<DashboardSectionSkeleton />}>
        <RevenueBreakdownSection
          ordersRevenue={stats.revenue.totalOrders}
          registrationsRevenue={stats.revenue.totalRegistrations}
          ordersTotal={stats.orders.total}
          registrationsTotal={stats.registrations.total}
          totalRevenue={totalRevenue}
          totalTransactions={totalTransactions}
        />
      </Suspense>

      {/* Newsletter Subscribers */}
      <Suspense fallback={<DashboardSectionSkeleton />}>
        <NewsletterSection
          subscribers={newsletterSubscribers}
          totalSubscribers={stats.newsletter.totalSubscribers}
          newThisMonth={stats.newsletter.newThisMonth}
        />
      </Suspense>
    </div>
  );
}
