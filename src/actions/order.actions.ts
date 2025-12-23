"use server";

import { DEFAULT_PAGE_SIZE } from "@/consts/performance";
import { OrderStatus } from "@/prisma/generated/client";
import type {
  OrderWithDetails,
  OrderWithItems,
  PaginatedResponse,
} from "@/types";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { getAuthenticatedUserId } from "./auth.action";

export async function getOrders(
  page: number = 1,
  limit: number = DEFAULT_PAGE_SIZE,
  search?: string,
): Promise<
  | { success: true; data: PaginatedResponse<OrderWithItems> }
  | { success: false; error: string }
> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
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
        user: true,
      },
      orderBy: { created_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.productOrder.count({ where }),
  ]);

  return {
    success: true,
    data: {
      data: orders as OrderWithItems[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export type OrderItemWithReviewStatus =
  OrderWithDetails["ordered_products"][number] & {
    hasReviewed: boolean;
  };

export type OrderWithReviewStatus = Omit<
  OrderWithDetails,
  "ordered_products"
> & {
  ordered_products: OrderItemWithReviewStatus[];
};

export async function getOrderById(orderId: string) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false as const, error: "Not authenticated" };
  }

  const order = await prisma.productOrder.findFirst({
    where: {
      id: orderId,
      user_id: userId,
    },
    include: {
      ordered_products: {
        include: {
          product: {
            include: { product_categories: true },
          },
        },
        orderBy: {
          product: { available_quantity: "desc" },
        },
      },
      user: true,
    },
  });

  if (!order) {
    return { success: false as const, error: "Order not found" };
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

  // Add review status to each ordered product
  const orderedProductsWithReviewStatus = order.ordered_products.map(
    (item) => ({
      ...item,
      hasReviewed: reviewedProductIds.has(item.product_id),
    }),
  );

  const orderWithReviewStatus = {
    ...order,
    ordered_products: orderedProductsWithReviewStatus,
  };

  return {
    success: true as const,
    data: orderWithReviewStatus as OrderWithReviewStatus,
  };
}

export async function createOrder(data: {
  shippingFee: number;
  shippingAddress: {
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zip: string;
    contactNumber?: string;
  };
}) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false as const, error: "Not authenticated" };
  }

  try {
    // Get cart items
    const cartItems = await prisma.cart.findMany({
      where: { user_id: userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return { success: false as const, error: "Cart is empty" };
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
          shipping_address: data.shippingAddress,
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
          user: true,
        },
      }),
      prisma.cart.deleteMany({
        where: { user_id: userId },
      }),
    ]);

    revalidatePath("/orders");
    revalidatePath("/cart");

    return { success: true as const, data: order as OrderWithItems };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false as const, error: "Failed to create order" };
  }
}

export async function getPendingOrdersCount(): Promise<number> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return 0;
  }

  const count = await prisma.productOrder.count({
    where: {
      user_id: userId,
      status: {
        notIn: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],
      },
    },
  });

  return count;
}

export async function cancelOrder(orderId: string) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false as const, error: "Not authenticated" };
  }

  try {
    // Verify order belongs to user
    const order = await prisma.productOrder.findFirst({
      where: {
        id: orderId,
        user_id: userId,
      },
    });

    if (!order) {
      return { success: false as const, error: "Order not found" };
    }

    if (order.status !== OrderStatus.PROCESSING) {
      return {
        success: false as const,
        error: "Only processing orders can be cancelled",
      };
    }

    const updated = await prisma.productOrder.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.CANCELLED,
        cancelled_at: new Date(),
      },
      include: {
        ordered_products: {
          include: { product: true },
        },
        user: true,
      },
    });

    revalidatePath("/orders");
    revalidatePath(`/orders/${orderId}`);

    return { success: true as const, data: updated as OrderWithItems };
  } catch (error) {
    console.error("Failed to cancel order:", error);
    return { success: false as const, error: "Failed to cancel order" };
  }
}
