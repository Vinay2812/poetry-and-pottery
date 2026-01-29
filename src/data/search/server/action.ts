"use server";

import { getAuthenticatedUserId } from "@/actions/auth.action";
import { EventStatus } from "@/prisma/generated/client";

import { prisma } from "@/lib/prisma";

import type {
  EventBase,
  GlobalSearchResponse,
  Order,
  ProductBase,
} from "@/graphql/generated/types";

function mapProductBase(product: {
  id: number;
  slug: string;
  name: string;
  image_urls: string[];
  price: number;
  material: string;
  total_quantity: number;
  available_quantity: number;
  color_code: string;
  color_name: string;
  is_active?: boolean;
  reviews?: { rating: number }[];
}): ProductBase {
  const reviews = product.reviews ?? [];
  const reviewsCount = reviews.length;
  const avgRating =
    reviewsCount > 0
      ? Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviewsCount)
      : 0;

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    image_urls: product.image_urls,
    price: product.price,
    material: product.material,
    total_quantity: product.total_quantity,
    available_quantity: product.available_quantity,
    color_code: product.color_code,
    color_name: product.color_name,
    reviews_count: reviewsCount,
    avg_rating: avgRating,
    in_wishlist: false,
    is_active: product.is_active ?? true,
  };
}

function mapEventBase(event: {
  id: string;
  slug: string;
  title: string;
  description: string;
  starts_at: Date;
  ends_at: Date;
  location: string;
  full_location: string;
  total_seats: number;
  available_seats: number;
  instructor: string;
  includes: string[];
  price: number;
  image: string;
  highlights: string[];
  gallery: string[];
  status: string;
  level: string;
  created_at: Date;
  updated_at: Date;
  _count: { event_registrations: number; reviews: number };
  reviews?: { rating: number }[];
}): EventBase {
  const reviews = event.reviews ?? [];
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : null;

  return {
    id: event.id,
    slug: event.slug,
    title: event.title,
    description: event.description,
    starts_at: event.starts_at,
    ends_at: event.ends_at,
    location: event.location,
    full_location: event.full_location,
    total_seats: event.total_seats,
    available_seats: event.available_seats,
    instructor: event.instructor,
    includes: event.includes,
    price: event.price,
    image: event.image,
    highlights: event.highlights,
    gallery: event.gallery,
    status: event.status as EventBase["status"],
    level: event.level as EventBase["level"],
    created_at: event.created_at,
    updated_at: event.updated_at,
    registrations_count: event._count.event_registrations,
    reviews_count: event._count.reviews,
    avg_rating: avgRating,
  };
}

export async function globalSearch(
  query: string,
  limit: number = 5,
): Promise<GlobalSearchResponse> {
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
        reviews: { select: { rating: true } },
      },
      take: limit,
      orderBy: [{ available_quantity: "desc" }, { created_at: "desc" }],
    })
    .then((products) => products.map(mapProductBase));

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
    .then((events) => events.map(mapEventBase));

  const eventsCountPromise = prisma.event.count({
    where: {
      status: { in: [EventStatus.UPCOMING, EventStatus.ACTIVE] },
      OR: [{ title: { contains: searchTerm, mode: "insensitive" } }],
    },
  });

  // Search orders (only if user is authenticated)
  let ordersPromise: Promise<Order[]> = Promise.resolve([]);
  let ordersCountPromise: Promise<number> = Promise.resolve(0);

  if (userId) {
    ordersPromise = prisma.productOrder
      .findMany({
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
          user: {
            select: { id: true, email: true, name: true },
          },
          ordered_products: {
            include: {
              product: {
                include: {
                  reviews: { select: { rating: true } },
                },
              },
            },
          },
        },
        take: limit,
        orderBy: { created_at: "desc" },
      })
      .then((orders) =>
        orders.map((order) => ({
          id: order.id,
          user_id: order.user_id,
          user: {
            id: order.user.id,
            email: order.user.email,
            name: order.user.name,
          },
          shipping_fee: order.shipping_fee,
          subtotal: order.subtotal,
          discount: order.discount,
          total: order.total,
          status: order.status as Order["status"],
          request_at: order.request_at,
          approved_at: order.approved_at,
          paid_at: order.paid_at,
          shipped_at: order.shipped_at,
          delivered_at: order.delivered_at,
          cancelled_at: order.cancelled_at,
          returned_at: order.returned_at,
          refunded_at: order.refunded_at,
          shipping_address: order.shipping_address as Order["shipping_address"],
          created_at: order.created_at,
          updated_at: order.updated_at,
          ordered_products: order.ordered_products.map((item) => ({
            id: item.id,
            order_id: item.order_id,
            product_id: item.product_id,
            quantity: item.quantity,
            discount: item.discount,
            price: item.price,
            created_at: item.created_at,
            updated_at: item.updated_at,
            has_reviewed: false,
            product: mapProductBase(item.product),
          })),
        })),
      );

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
    products,
    events,
    orders,
    counts: {
      products: productsCount,
      events: eventsCount,
      orders: ordersCount,
    },
  };
}
