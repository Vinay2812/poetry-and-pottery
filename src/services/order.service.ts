import type {
  OrderWithDetails,
  OrderWithItems,
  PaginatedResponse,
} from "@/types";

import { prisma } from "@/lib/prisma";

export class OrderService {
  /**
   * Get orders for a user by auth ID
   */
  static async getOrdersByAuthId(authId: string): Promise<OrderWithItems[]> {
    const user = await prisma.user.findUnique({
      where: { auth_id: authId },
      select: { id: true },
    });

    if (!user) return [];

    const orders = await prisma.productOrder.findMany({
      where: { user_id: user.id },
      include: {
        ordered_products: {
          include: { product: true },
        },
        user: true,
      },
      orderBy: { created_at: "desc" },
    });

    return orders as OrderWithItems[];
  }

  /**
   * Get single order by ID for a user (by auth ID)
   */
  static async getOrderByIdForAuthUser(
    orderId: string,
    authId: string,
  ): Promise<OrderWithDetails | null> {
    const user = await prisma.user.findUnique({
      where: { auth_id: authId },
      select: { id: true },
    });

    if (!user) return null;

    return prisma.productOrder.findFirst({
      where: {
        id: orderId,
        user_id: user.id,
      },
      include: {
        ordered_products: {
          include: {
            product: {
              include: { product_categories: true },
            },
          },
        },
        user: true,
      },
    }) as Promise<OrderWithDetails | null>;
  }

  /**
   * Get orders for a user with pagination
   */
  static async getOrdersByUserId(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponse<OrderWithItems>> {
    const [orders, total] = await Promise.all([
      prisma.productOrder.findMany({
        where: { user_id: userId },
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
      prisma.productOrder.count({ where: { user_id: userId } }),
    ]);

    return {
      data: orders as OrderWithItems[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Get single order by ID
   */
  static async getOrderById(orderId: string): Promise<OrderWithDetails | null> {
    return prisma.productOrder.findUnique({
      where: { id: orderId },
      include: {
        ordered_products: {
          include: {
            product: {
              include: { product_categories: true },
            },
          },
        },
        user: true,
      },
    }) as Promise<OrderWithDetails | null>;
  }

  /**
   * Get order by ID for a specific user (security check)
   */
  static async getOrderByIdForUser(
    orderId: string,
    userId: number,
  ): Promise<OrderWithDetails | null> {
    return prisma.productOrder.findFirst({
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
        },
        user: true,
      },
    }) as Promise<OrderWithDetails | null>;
  }

  /**
   * Create a new order
   */
  static async createOrder(data: {
    userId: number;
    items: { productId: number; quantity: number; price: number }[];
    shippingFee: number;
    shippingAddress: Record<string, unknown>;
  }): Promise<OrderWithItems> {
    const subtotal = data.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const total = subtotal + data.shippingFee;

    return prisma.productOrder.create({
      data: {
        user_id: data.userId,
        shipping_fee: data.shippingFee,
        subtotal,
        total,
        status: "processing",
        shipping_address: data.shippingAddress,
        ordered_products: {
          create: data.items.map((item) => ({
            product_id: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        ordered_products: {
          include: { product: true },
        },
        user: true,
      },
    }) as Promise<OrderWithItems>;
  }

  /**
   * Update order status
   */
  static async updateOrderStatus(
    orderId: string,
    status: string,
  ): Promise<OrderWithItems> {
    const statusDateMap: Record<string, string> = {
      shipped: "shipped_at",
      delivered: "delivered_at",
      cancelled: "cancelled_at",
      returned: "returned_at",
      refunded: "refunded_at",
    };

    const dateField = statusDateMap[status];
    const updateData: Record<string, unknown> = { status };

    if (dateField) {
      updateData[dateField] = new Date();
    }

    return prisma.productOrder.update({
      where: { id: orderId },
      data: updateData,
      include: {
        ordered_products: {
          include: { product: true },
        },
        user: true,
      },
    }) as Promise<OrderWithItems>;
  }

  /**
   * Get recent orders (for admin dashboard)
   */
  static async getRecentOrders(limit: number = 10): Promise<OrderWithItems[]> {
    return prisma.productOrder.findMany({
      include: {
        ordered_products: {
          include: { product: true },
        },
        user: true,
      },
      orderBy: { created_at: "desc" },
      take: limit,
    }) as Promise<OrderWithItems[]>;
  }

  /**
   * Get orders by status
   */
  static async getOrdersByStatus(
    status: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponse<OrderWithItems>> {
    const [orders, total] = await Promise.all([
      prisma.productOrder.findMany({
        where: { status },
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
      prisma.productOrder.count({ where: { status } }),
    ]);

    return {
      data: orders as OrderWithItems[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
