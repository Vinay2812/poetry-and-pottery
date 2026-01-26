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

function SectionFallback() {
  return (
    <div className="text-muted-foreground rounded-2xl border border-neutral-200 bg-white p-6 text-sm">
      Loading section...
    </div>
  );
}

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
      <Suspense fallback={<SectionFallback />}>
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

      <Suspense fallback={<SectionFallback />}>
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
      <Suspense fallback={<SectionFallback />}>
        <div className="grid gap-12 lg:grid-cols-2">
          <RecentOrdersSection orders={recentOrders} />
          <RecentRegistrationsSection registrations={recentRegistrations} />
        </div>
      </Suspense>

      {/* Inventory & Events */}
      <Suspense fallback={<SectionFallback />}>
        <div className="grid gap-12 lg:grid-cols-2">
          <InventoryAlertsSection products={lowStockProducts} />
          <UpcomingEventsSection events={upcomingEvents} />
        </div>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
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
      <Suspense fallback={<SectionFallback />}>
        <NewsletterSection
          subscribers={newsletterSubscribers}
          totalSubscribers={stats.newsletter.totalSubscribers}
          newThisMonth={stats.newsletter.newThisMonth}
        />
      </Suspense>
    </div>
  );
}
