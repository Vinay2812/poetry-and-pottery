// Dashboard statistics from the server.
export interface DashboardStats {
  orders: {
    total: number;
    pending: number;
    processing: number;
  };
  registrations: {
    total: number;
    pending: number;
  };
  products: {
    outOfStock: number;
    lowStock: number;
  };
  events: {
    upcomingIn7Days: number;
  };
  users: {
    total: number;
    newThisMonth: number;
  };
  revenue: {
    totalOrders: number;
    totalRegistrations: number;
  };
  newsletter: {
    totalSubscribers: number;
    newThisMonth: number;
  };
}

// Recent order data for display.
export interface RecentOrder {
  id: string;
  status: string;
  total: number;
  created_at: Date | string;
  user: {
    name?: string | null;
    email: string;
  };
}

// Recent registration data for display.
export interface RecentRegistration {
  id: string;
  status: string;
  price: number;
  user: {
    name?: string | null;
    email: string;
  };
  event: {
    title: string;
  };
}

// Low stock product data for display.
export interface LowStockProduct {
  id: number;
  name: string;
  price: number;
  available_quantity: number;
}

// Upcoming event data for display.
export interface UpcomingEvent {
  id: string;
  title: string;
  starts_at: Date | string;
  available_seats: number;
  total_seats: number;
  _count: {
    event_registrations: number;
  };
}

// Props for HeroStats component.
export interface HeroStatsProps {
  totalRevenue: number;
  totalTransactions: number;
  ordersTotal: number;
  ordersPending: number;
  registrationsTotal: number;
  registrationsPending: number;
  usersTotal: number;
  usersNewThisMonth: number;
}

// Props for QuickActions component.
export interface QuickActionsProps {
  ordersPending: number;
  ordersProcessing: number;
  registrationsPending: number;
  productsOutOfStock: number;
  productsLowStock: number;
  eventsUpcomingIn7Days: number;
}

// Props for RecentOrdersSection component.
export interface RecentOrdersSectionProps {
  orders: RecentOrder[];
}

// Props for RecentRegistrationsSection component.
export interface RecentRegistrationsSectionProps {
  registrations: RecentRegistration[];
}

// Props for InventoryAlertsSection component.
export interface InventoryAlertsSectionProps {
  products: LowStockProduct[];
}

// Props for UpcomingEventsSection component.
export interface UpcomingEventsSectionProps {
  events: UpcomingEvent[];
}

// Props for RevenueBreakdownSection component.
export interface RevenueBreakdownSectionProps {
  ordersRevenue: number;
  registrationsRevenue: number;
  ordersTotal: number;
  registrationsTotal: number;
  totalRevenue: number;
  totalTransactions: number;
}

// Newsletter subscriber data for display.
export interface NewsletterSubscriber {
  id: number;
  name?: string | null;
  email: string;
  image?: string | null;
  newsletter_subscribed_at?: Date | string | null;
}

// Props for NewsletterSection component.
export interface NewsletterSectionProps {
  subscribers: NewsletterSubscriber[];
  totalSubscribers: number;
  newThisMonth: number;
}
