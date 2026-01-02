"use server";

import { UserRole } from "@/prisma/generated/enums";
import { clerkClient } from "@clerk/nextjs/server";

import { requireAdmin, requireAdminUser } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

import type {
  AdminUserCartItem,
  AdminUserDetail,
  AdminUserMutationResponse,
  AdminUserOrder,
  AdminUserRegistration,
  AdminUserWishlistItem,
  AdminUserWishlistResponse,
  AdminUsersResponse,
} from "@/graphql/generated/types";

interface AdminUsersFilterParams {
  search?: string;
  role?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export async function getUsers(
  filter: AdminUsersFilterParams = {},
): Promise<AdminUsersResponse> {
  await requireAdmin();

  const { search = "", role, sort = "newest", page = 1, limit = 20 } = filter;
  const skip = (page - 1) * limit;

  const searchId = parseInt(search);
  const where = {
    AND: [
      search
        ? {
            OR: [
              { email: { contains: search, mode: "insensitive" as const } },
              { name: { contains: search, mode: "insensitive" as const } },
              ...(isNaN(searchId) ? [] : [{ id: searchId }]),
            ],
          }
        : {},
      role ? { role: role as UserRole } : {},
    ],
  };

  const getOrderBy = () => {
    switch (sort) {
      case "oldest":
        return { created_at: "asc" as const };
      case "most_orders":
        return { product_orders: { _count: "desc" as const } };
      case "most_registrations":
        return { event_registrations: { _count: "desc" as const } };
      default:
        return { created_at: "desc" as const };
    }
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: getOrderBy(),
      skip,
      take: limit,
      select: {
        id: true,
        auth_id: true,
        email: true,
        name: true,
        image: true,
        phone: true,
        role: true,
        created_at: true,
        _count: {
          select: {
            product_orders: true,
            event_registrations: true,
          },
        },
      },
    }),
    prisma.user.count({ where }),
  ]);

  const userIds = users.map((u) => u.id);

  const [pendingOrders, pendingRegistrations] = await Promise.all([
    prisma.productOrder.groupBy({
      by: ["user_id"],
      where: {
        user_id: { in: userIds },
        status: { in: ["PENDING", "PROCESSING"] },
      },
      _count: true,
    }),
    prisma.eventRegistration.groupBy({
      by: ["user_id"],
      where: {
        user_id: { in: userIds },
        status: "PENDING",
      },
      _count: true,
    }),
  ]);

  const pendingOrdersMap = new Map(
    pendingOrders.map((p) => [p.user_id, p._count]),
  );
  const pendingRegistrationsMap = new Map(
    pendingRegistrations.map((p) => [p.user_id, p._count]),
  );

  let adminUsers = users.map((user) => ({
    ...user,
    pendingOrdersCount: pendingOrdersMap.get(user.id) ?? 0,
    pendingRegistrationsCount: pendingRegistrationsMap.get(user.id) ?? 0,
  }));

  if (sort === "pending_orders") {
    adminUsers = adminUsers.sort(
      (a, b) => b.pendingOrdersCount - a.pendingOrdersCount,
    );
  } else if (sort === "pending_registrations") {
    adminUsers = adminUsers.sort(
      (a, b) => b.pendingRegistrationsCount - a.pendingRegistrationsCount,
    );
  }

  return {
    users: adminUsers as unknown as AdminUsersResponse["users"],
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getUserById(
  userId: number,
): Promise<AdminUserDetail | null> {
  await requireAdmin();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      auth_id: true,
      email: true,
      name: true,
      image: true,
      phone: true,
      role: true,
      created_at: true,
      updated_at: true,
      _count: {
        select: {
          product_orders: true,
          event_registrations: true,
          wishlists: true,
          carts: true,
          reviews: true,
        },
      },
    },
  });

  return user as AdminUserDetail | null;
}

export async function updateUserRole(
  userId: number,
  newRole: string,
): Promise<AdminUserMutationResponse> {
  const adminUser = await requireAdminUser();

  if (adminUser.id === userId && newRole !== UserRole.ADMIN) {
    return {
      success: false,
      error: "You cannot demote yourself from admin role",
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, auth_id: true, role: true },
  });

  if (!user) {
    return { success: false, error: "User not found" };
  }

  if (user.role === newRole) {
    return { success: true };
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole as UserRole },
  });

  try {
    const clerk = await clerkClient();
    await clerk.users.updateUserMetadata(user.auth_id, {
      publicMetadata: {
        role: newRole,
      },
    });
  } catch (error) {
    await prisma.user.update({
      where: { id: userId },
      data: { role: user.role },
    });

    console.error("Failed to sync role with Clerk:", error);
    return {
      success: false,
      error: "Failed to sync role with Clerk. Please try again.",
    };
  }

  return { success: true };
}

export async function getUserOrders(userId: number): Promise<AdminUserOrder[]> {
  await requireAdmin();

  const orders = await prisma.productOrder.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      status: true,
      total: true,
      subtotal: true,
      discount: true,
      shipping_fee: true,
      created_at: true,
      request_at: true,
      approved_at: true,
      paid_at: true,
      shipped_at: true,
      delivered_at: true,
      cancelled_at: true,
      returned_at: true,
      refunded_at: true,
      ordered_products: {
        select: {
          id: true,
          quantity: true,
          price: true,
          discount: true,
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              image_urls: true,
            },
          },
        },
      },
    },
  });

  return orders as unknown as AdminUserOrder[];
}

export async function getUserRegistrations(
  userId: number,
): Promise<AdminUserRegistration[]> {
  await requireAdmin();

  const registrations = await prisma.eventRegistration.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      status: true,
      seats_reserved: true,
      price: true,
      discount: true,
      created_at: true,
      request_at: true,
      approved_at: true,
      paid_at: true,
      confirmed_at: true,
      cancelled_at: true,
      event: {
        select: {
          id: true,
          title: true,
          slug: true,
          starts_at: true,
          ends_at: true,
          location: true,
          image: true,
          price: true,
        },
      },
    },
  });

  return registrations as unknown as AdminUserRegistration[];
}

export async function getUserCart(
  userId: number,
): Promise<AdminUserCartItem[]> {
  await requireAdmin();

  const cartItems = await prisma.cart.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      quantity: true,
      created_at: true,
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
          price: true,
          available_quantity: true,
          image_urls: true,
        },
      },
    },
  });

  return cartItems as unknown as AdminUserCartItem[];
}

export async function getUserWishlist(
  userId: number,
  page: number = 1,
  limit: number = 12,
): Promise<AdminUserWishlistResponse> {
  await requireAdmin();

  const skip = (page - 1) * limit;

  const [wishlistItems, total] = await Promise.all([
    prisma.wishlist.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        created_at: true,
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            available_quantity: true,
            image_urls: true,
          },
        },
      },
    }),
    prisma.wishlist.count({ where: { user_id: userId } }),
  ]);

  return {
    data: wishlistItems as unknown as AdminUserWishlistItem[],
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
