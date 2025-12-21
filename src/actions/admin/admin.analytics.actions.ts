"use server";

import { EventRegistrationStatus, OrderStatus } from "@/prisma/generated/enums";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export interface DashboardStats {
  orders: {
    pending: number;
    processing: number;
    total: number;
  };
  registrations: {
    pending: number;
    total: number;
  };
  products: {
    outOfStock: number;
    lowStock: number;
    total: number;
  };
  events: {
    upcoming: number;
    upcomingIn7Days: number;
    total: number;
  };
  users: {
    total: number;
    newThisMonth: number;
  };
  revenue: {
    totalOrders: number;
    totalRegistrations: number;
  };
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await requireAdmin();

  const now = new Date();
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    pendingOrders,
    processingOrders,
    totalOrders,
    pendingRegistrations,
    totalRegistrations,
    outOfStockProducts,
    lowStockProducts,
    totalProducts,
    upcomingEvents,
    upcomingIn7DaysEvents,
    totalEvents,
    totalUsers,
    newUsersThisMonth,
    orderRevenue,
    registrationRevenue,
  ] = await Promise.all([
    // Orders
    prisma.productOrder.count({
      where: { status: OrderStatus.PENDING },
    }),
    prisma.productOrder.count({
      where: { status: OrderStatus.PROCESSING },
    }),
    prisma.productOrder.count(),

    // Registrations
    prisma.eventRegistration.count({
      where: { status: EventRegistrationStatus.PENDING },
    }),
    prisma.eventRegistration.count(),

    // Products
    prisma.product.count({
      where: { available_quantity: 0, is_active: true },
    }),
    prisma.product.count({
      where: {
        available_quantity: { gt: 0, lte: 5 },
        is_active: true,
      },
    }),
    prisma.product.count({ where: { is_active: true } }),

    // Events
    prisma.event.count({
      where: { status: "UPCOMING" },
    }),
    prisma.event.count({
      where: {
        status: "UPCOMING",
        starts_at: { lte: sevenDaysFromNow },
      },
    }),
    prisma.event.count(),

    // Users
    prisma.user.count(),
    prisma.user.count({
      where: { created_at: { gte: startOfMonth } },
    }),

    // Revenue
    prisma.productOrder.aggregate({
      _sum: { total: true },
      where: {
        status: {
          in: [OrderStatus.PAID, OrderStatus.SHIPPED, OrderStatus.DELIVERED],
        },
      },
    }),
    prisma.eventRegistration.aggregate({
      _sum: { price: true },
      where: {
        status: {
          in: [EventRegistrationStatus.PAID, EventRegistrationStatus.CONFIRMED],
        },
      },
    }),
  ]);

  return {
    orders: {
      pending: pendingOrders,
      processing: processingOrders,
      total: totalOrders,
    },
    registrations: {
      pending: pendingRegistrations,
      total: totalRegistrations,
    },
    products: {
      outOfStock: outOfStockProducts,
      lowStock: lowStockProducts,
      total: totalProducts,
    },
    events: {
      upcoming: upcomingEvents,
      upcomingIn7Days: upcomingIn7DaysEvents,
      total: totalEvents,
    },
    users: {
      total: totalUsers,
      newThisMonth: newUsersThisMonth,
    },
    revenue: {
      totalOrders: orderRevenue._sum.total ?? 0,
      totalRegistrations: registrationRevenue._sum.price ?? 0,
    },
  };
}

export interface RecentOrder {
  id: string;
  status: OrderStatus;
  total: number;
  created_at: Date;
  user: {
    name: string | null;
    email: string;
  };
}

export async function getRecentOrders(limit = 5): Promise<RecentOrder[]> {
  await requireAdmin();

  const orders = await prisma.productOrder.findMany({
    take: limit,
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      status: true,
      total: true,
      created_at: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return orders;
}

export interface RecentRegistration {
  id: string;
  status: EventRegistrationStatus;
  price: number;
  seats_reserved: number;
  created_at: Date;
  user: {
    name: string | null;
    email: string;
  };
  event: {
    title: string;
  };
}

export async function getRecentRegistrations(
  limit = 5,
): Promise<RecentRegistration[]> {
  await requireAdmin();

  const registrations = await prisma.eventRegistration.findMany({
    take: limit,
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      status: true,
      price: true,
      seats_reserved: true,
      created_at: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      event: {
        select: {
          title: true,
        },
      },
    },
  });

  return registrations;
}

export interface LowStockProduct {
  id: number;
  name: string;
  slug: string;
  available_quantity: number;
  total_quantity: number;
  price: number;
}

export async function getLowStockProducts(
  limit = 10,
): Promise<LowStockProduct[]> {
  await requireAdmin();

  const products = await prisma.product.findMany({
    where: {
      available_quantity: { lte: 5 },
      is_active: true,
    },
    take: limit,
    orderBy: { available_quantity: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      available_quantity: true,
      total_quantity: true,
      price: true,
    },
  });

  return products;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  slug: string;
  starts_at: Date;
  available_seats: number;
  total_seats: number;
  _count: {
    event_registrations: number;
  };
}

export async function getUpcomingEvents(limit = 5): Promise<UpcomingEvent[]> {
  await requireAdmin();

  const events = await prisma.event.findMany({
    where: {
      status: "UPCOMING",
      starts_at: { gte: new Date() },
    },
    take: limit,
    orderBy: { starts_at: "asc" },
    select: {
      id: true,
      title: true,
      slug: true,
      starts_at: true,
      available_seats: true,
      total_seats: true,
      _count: {
        select: {
          event_registrations: true,
        },
      },
    },
  });

  return events;
}
