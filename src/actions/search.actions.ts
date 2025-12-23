"use server";

import { EventStatus } from "@/prisma/generated/client";
import type {
  EventWithRegistrationCount,
  OrderWithItems,
  ProductWithCategories,
} from "@/types";

import { prisma } from "@/lib/prisma";

import { getAuthenticatedUserId } from "./auth.action";

export interface GlobalSearchResult {
  products: ProductWithCategories[];
  events: EventWithRegistrationCount[];
  orders: OrderWithItems[];
  counts: {
    products: number;
    events: number;
    orders: number;
  };
}

export async function globalSearch(
  query: string,
  limit: number = 5,
): Promise<GlobalSearchResult> {
  const userId = await getAuthenticatedUserId();

  if (!query || query.trim().length === 0) {
    return {
      products: [],
      events: [],
      orders: [],
      counts: { products: 0, events: 0, orders: 0 },
    };
  }

  const searchTerm = query.trim();

  // Search products
  const productsPromise = prisma.product
    .findMany({
      where: {
        is_active: true,
        OR: [{ name: { contains: searchTerm, mode: "insensitive" } }],
      },
      include: {
        product_categories: true,
        _count: { select: { reviews: true } },
        reviews: { select: { rating: true } },
      },
      take: limit,
      orderBy: [{ available_quantity: "desc" }, { created_at: "desc" }],
    })
    .then((products) =>
      products.map((product) => {
        const { reviews, ...rest } = product;
        const averageRating =
          reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : null;
        return { ...rest, averageRating };
      }),
    );

  const productsCountPromise = prisma.product.count({
    where: {
      is_active: true,
      OR: [{ name: { contains: searchTerm, mode: "insensitive" } }],
    },
  });

  // Search events (upcoming and active only)
  const eventsPromise = prisma.event
    .findMany({
      where: {
        status: { in: [EventStatus.UPCOMING, EventStatus.ACTIVE] },
        OR: [{ title: { contains: searchTerm, mode: "insensitive" } }],
      },
      include: {
        _count: { select: { event_registrations: true, reviews: true } },
        reviews: { select: { rating: true } },
      },
      take: limit,
      orderBy: { starts_at: "asc" },
    })
    .then((events) =>
      events.map((event) => {
        const { reviews, ...rest } = event;
        const averageRating =
          reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : null;
        return { ...rest, averageRating };
      }),
    );

  const eventsCountPromise = prisma.event.count({
    where: {
      status: { in: [EventStatus.UPCOMING, EventStatus.ACTIVE] },
      OR: [{ title: { contains: searchTerm, mode: "insensitive" } }],
    },
  });

  // Search orders (only if user is authenticated)
  let ordersPromise: Promise<OrderWithItems[]> = Promise.resolve([]);
  let ordersCountPromise: Promise<number> = Promise.resolve(0);

  if (userId) {
    ordersPromise = prisma.productOrder.findMany({
      where: {
        user_id: userId,
        ordered_products: {
          some: {
            product: {
              name: { contains: searchTerm, mode: "insensitive" },
            },
          },
        },
      },
      include: {
        ordered_products: {
          include: { product: true },
        },
        user: true,
      },
      take: limit,
      orderBy: { created_at: "desc" },
    }) as Promise<OrderWithItems[]>;

    ordersCountPromise = prisma.productOrder.count({
      where: {
        user_id: userId,
        ordered_products: {
          some: {
            product: {
              name: { contains: searchTerm, mode: "insensitive" },
            },
          },
        },
      },
    });
  }

  const [products, productsCount, events, eventsCount, orders, ordersCount] =
    await Promise.all([
      productsPromise,
      productsCountPromise,
      eventsPromise,
      eventsCountPromise,
      ordersPromise,
      ordersCountPromise,
    ]);

  return {
    products: products as ProductWithCategories[],
    events: events as EventWithRegistrationCount[],
    orders,
    counts: {
      products: productsCount,
      events: eventsCount,
      orders: ordersCount,
    },
  };
}
