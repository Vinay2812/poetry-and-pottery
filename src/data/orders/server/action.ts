"use server";

import { getAuthenticatedUserId } from "@/actions/auth.action";
import { OrderStatus } from "@/prisma/generated/client";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import type {
  Order,
  OrderItem,
  OrderMutationResponse,
  OrdersResponse,
} from "@/graphql/generated/types";
import type { ShippingAddress } from "@/data/orders/types";

const DEFAULT_PAGE_SIZE = 10;

// Map product from action to GraphQL ProductBase format
function mapToProductBase(product: {
  id: number;
  slug: string;
  name: string;
  price: number;
  image_urls: string[];
  material: string;
  available_quantity: number;
  total_quantity: number;
  color_code: string;
  color_name: string;
}) {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image_urls: product.image_urls,
    reviews_count: 0,
    avg_rating: 0,
    material: product.material,
    in_wishlist: false,
    available_quantity: product.available_quantity,
    total_quantity: product.total_quantity,
    color_code: product.color_code,
    color_name: product.color_name,
  };
}

// Map action order item to GraphQL OrderItem format
function mapToOrderItem(
  item: {
    id: number;
    order_id: string;
    product_id: number;
    quantity: number;
    discount: number;
    price: number;
    created_at: Date;
    updated_at: Date;
    product: {
      id: number;
      slug: string;
      name: string;
      price: number;
      image_urls: string[];
      material: string;
      available_quantity: number;
      total_quantity: number;
      color_code: string;
      color_name: string;
    };
  },
  hasReviewed: boolean = false,
): OrderItem {
  return {
    id: item.id,
    order_id: item.order_id,
    product_id: item.product_id,
    quantity: item.quantity,
    discount: item.discount,
    price: item.price,
    created_at: item.created_at,
    updated_at: item.updated_at,
    has_reviewed: hasReviewed,
    product: mapToProductBase(item.product),
  };
}

// Map action order to GraphQL Order format
function mapToOrder(
  order: {
    id: string;
    user_id: number;
    user: {
      id: number;
      email: string;
      name: string | null;
    };
    shipping_fee: number;
    subtotal: number;
    discount: number;
    total: number;
    status: string;
    request_at: Date | null;
    approved_at: Date | null;
    paid_at: Date | null;
    shipped_at: Date | null;
    delivered_at: Date | null;
    cancelled_at: Date | null;
    returned_at: Date | null;
    refunded_at: Date | null;
    shipping_address: unknown;
    created_at: Date;
    updated_at: Date;
    ordered_products: {
      id: number;
      order_id: string;
      product_id: number;
      quantity: number;
      discount: number;
      price: number;
      created_at: Date;
      updated_at: Date;
      product: {
        id: number;
        slug: string;
        name: string;
        price: number;
        image_urls: string[];
        material: string;
        available_quantity: number;
        total_quantity: number;
        color_code: string;
        color_name: string;
      };
    }[];
  },
  reviewedProductIds: Set<number> = new Set(),
): Order {
  return {
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
    shipping_address: order.shipping_address,
    created_at: order.created_at,
    updated_at: order.updated_at,
    ordered_products: order.ordered_products.map((item) =>
      mapToOrderItem(item, reviewedProductIds.has(item.product_id)),
    ),
  };
}

export async function getOrders(
  page: number = 1,
  limit: number = DEFAULT_PAGE_SIZE,
  search?: string,
): Promise<OrdersResponse> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { data: [], total: 0, page: 1, total_pages: 0 };
  }

  const where: { user_id: number; ordered_products?: object } = {
    user_id: userId,
  };

  // Search by product name in orders
  if (search) {
    where.ordered_products = {
      some: {
        product: {
          name: { contains: search, mode: "insensitive" },
        },
      },
    };
  }

  const [orders, total] = await Promise.all([
    prisma.productOrder.findMany({
      where,
      include: {
        ordered_products: {
          include: { product: true },
        },
        user: {
          select: { id: true, email: true, name: true },
        },
      },
      orderBy: { created_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.productOrder.count({ where }),
  ]);

  // Get all product IDs from all orders
  const productIds = orders.flatMap((order) =>
    order.ordered_products.map((item) => item.product_id),
  );

  // Check which products the user has reviewed
  const userReviews = await prisma.review.findMany({
    where: {
      user_id: userId,
      product_id: { in: productIds },
    },
    select: { product_id: true },
  });

  const reviewedProductIds = new Set<number>();
  for (const review of userReviews) {
    if (review.product_id) {
      reviewedProductIds.add(review.product_id);
    }
  }

  return {
    data: orders.map((order) => mapToOrder(order, reviewedProductIds)),
    total,
    page,
    total_pages: Math.ceil(total / limit),
  };
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return null;
  }

  const order = await prisma.productOrder.findFirst({
    where: {
      id: orderId,
      user_id: userId,
    },
    include: {
      ordered_products: {
        include: { product: true },
        orderBy: {
          product: { available_quantity: "desc" },
        },
      },
      user: {
        select: { id: true, email: true, name: true },
      },
    },
  });

  if (!order) {
    return null;
  }

  // Get product IDs from order
  const productIds = order.ordered_products.map((item) => item.product_id);

  // Check which products the user has reviewed
  const userReviews = await prisma.review.findMany({
    where: {
      user_id: userId,
      product_id: { in: productIds },
    },
    select: { product_id: true },
  });

  const reviewedProductIds = new Set<number>();
  for (const review of userReviews) {
    if (review.product_id) {
      reviewedProductIds.add(review.product_id);
    }
  }

  return mapToOrder(order, reviewedProductIds);
}

export async function createOrder(data: {
  shippingFee: number;
  shippingAddress: ShippingAddress;
}): Promise<OrderMutationResponse> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return {
      success: false,
      order: null,
      error: "Not authenticated",
    };
  }

  try {
    // Get cart items
    const cartItems = await prisma.cart.findMany({
      where: { user_id: userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return {
        success: false,
        order: null,
        error: "Cart is empty",
      };
    }

    // Calculate totals
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    const total = subtotal + data.shippingFee;

    // Create order and clear cart in transaction
    const [order] = await prisma.$transaction([
      prisma.productOrder.create({
        data: {
          user_id: userId,
          shipping_fee: data.shippingFee,
          subtotal,
          total,
          status: OrderStatus.PENDING,
          request_at: new Date(),
          shipping_address: {
            name: data.shippingAddress.name,
            address_line_1: data.shippingAddress.address_line_1,
            address_line_2: data.shippingAddress.address_line_2 ?? null,
            city: data.shippingAddress.city,
            state: data.shippingAddress.state,
            zip: data.shippingAddress.zip,
            contact_number: data.shippingAddress.contact_number ?? null,
          },
          ordered_products: {
            create: cartItems.map((item) => ({
              product_id: item.product_id,
              quantity: item.quantity,
              price: item.product.price,
            })),
          },
        },
        include: {
          ordered_products: {
            include: { product: true },
          },
          user: {
            select: { id: true, email: true, name: true },
          },
        },
      }),
      prisma.cart.deleteMany({
        where: { user_id: userId },
      }),
    ]);

    revalidatePath("/orders");
    revalidatePath("/cart");

    return {
      success: true,
      order: mapToOrder(order),
      error: null,
    };
  } catch (error) {
    console.error("Failed to create order:", error);
    return {
      success: false,
      order: null,
      error: "Failed to create order",
    };
  }
}

export async function cancelOrder(
  orderId: string,
): Promise<OrderMutationResponse> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return {
      success: false,
      order: null,
      error: "Not authenticated",
    };
  }

  try {
    // Verify order belongs to user
    const existingOrder = await prisma.productOrder.findFirst({
      where: {
        id: orderId,
        user_id: userId,
      },
    });

    if (!existingOrder) {
      return {
        success: false,
        order: null,
        error: "Order not found",
      };
    }

    if (existingOrder.status !== OrderStatus.PROCESSING) {
      return {
        success: false,
        order: null,
        error: "Only processing orders can be cancelled",
      };
    }

    const updatedOrder = await prisma.productOrder.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.CANCELLED,
        cancelled_at: new Date(),
      },
      include: {
        ordered_products: {
          include: { product: true },
        },
        user: {
          select: { id: true, email: true, name: true },
        },
      },
    });

    // Get product IDs from order
    const productIds = updatedOrder.ordered_products.map(
      (item) => item.product_id,
    );

    // Check which products the user has reviewed
    const userReviews = await prisma.review.findMany({
      where: {
        user_id: userId,
        product_id: { in: productIds },
      },
      select: { product_id: true },
    });

    const reviewedProductIds = new Set<number>();
    for (const review of userReviews) {
      if (review.product_id) {
        reviewedProductIds.add(review.product_id);
      }
    }

    revalidatePath("/orders");
    revalidatePath(`/orders/${orderId}`);

    return {
      success: true,
      order: mapToOrder(updatedOrder, reviewedProductIds),
      error: null,
    };
  } catch (error) {
    console.error("Failed to cancel order:", error);
    return {
      success: false,
      order: null,
      error: "Failed to cancel order",
    };
  }
}

// Legacy types for backwards compatibility with existing code
export type OrderItemWithReviewStatus = {
  id: number;
  order_id: string;
  product_id: number;
  quantity: number;
  discount: number;
  price: number;
  created_at: Date;
  updated_at: Date;
  hasReviewed: boolean;
  product: {
    id: number;
    slug: string;
    name: string;
    price: number;
    image_urls: string[];
    material: string;
    available_quantity: number;
    total_quantity: number;
    color_code: string;
    color_name: string;
  };
};

export type OrderWithReviewStatus = {
  id: string;
  user_id: number;
  user: {
    id: number;
    email: string;
    name: string | null;
  };
  shipping_fee: number;
  subtotal: number;
  discount: number;
  total: number;
  status: string;
  request_at: Date | null;
  approved_at: Date | null;
  paid_at: Date | null;
  shipped_at: Date | null;
  delivered_at: Date | null;
  cancelled_at: Date | null;
  returned_at: Date | null;
  refunded_at: Date | null;
  shipping_address: unknown;
  created_at: Date;
  updated_at: Date;
  ordered_products: OrderItemWithReviewStatus[];
};
