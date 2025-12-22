import {
  getDashboardStats,
  getLowStockProducts,
  getRecentOrders,
  getRecentRegistrations,
  getUpcomingEvents,
} from "@/actions/admin";
import {
  HeroStats,
  InventoryAlertsSection,
  QuickActions,
  RecentOrdersSection,
  RecentRegistrationsSection,
  RevenueBreakdownSection,
  UpcomingEventsSection,
} from "@/features/dashboard/home";

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
  const totalTransactions = stats.orders.total + stats.registrations.total;

  return (
    <div className="space-y-12">
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

      <QuickActions
        ordersPending={stats.orders.pending}
        ordersProcessing={stats.orders.processing}
        registrationsPending={stats.registrations.pending}
        productsOutOfStock={stats.products.outOfStock}
        productsLowStock={stats.products.lowStock}
        eventsUpcomingIn7Days={stats.events.upcomingIn7Days}
      />

      {/* Recent Activity */}
      <div className="grid gap-12 lg:grid-cols-2">
        <RecentOrdersSection orders={recentOrders} />
        <RecentRegistrationsSection registrations={recentRegistrations} />
      </div>

      {/* Inventory & Events */}
      <div className="grid gap-12 lg:grid-cols-2">
        <InventoryAlertsSection products={lowStockProducts} />
        <UpcomingEventsSection events={upcomingEvents} />
      </div>

      <RevenueBreakdownSection
        ordersRevenue={stats.revenue.totalOrders}
        registrationsRevenue={stats.revenue.totalRegistrations}
        ordersTotal={stats.orders.total}
        registrationsTotal={stats.registrations.total}
        totalRevenue={totalRevenue}
        totalTransactions={totalTransactions}
      />
    </div>
  );
}
