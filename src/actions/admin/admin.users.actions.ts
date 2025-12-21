"use server";

import { UserRole } from "@/prisma/generated/enums";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { requireAdmin, requireAdminUser } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export interface AdminUser {
  id: number;
  auth_id: string;
  email: string;
  name: string | null;
  image: string | null;
  phone: string | null;
  role: UserRole;
  created_at: Date;
  _count: {
    product_orders: number;
    event_registrations: number;
  };
}

export interface GetUsersParams {
  search?: string;
  role?: UserRole;
  page?: number;
  limit?: number;
}

export interface GetUsersResult {
  users: AdminUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getUsers(
  params: GetUsersParams = {},
): Promise<GetUsersResult> {
  await requireAdmin();

  const { search = "", role, page = 1, limit = 20 } = params;
  const skip = (page - 1) * limit;

  const where = {
    ...(search && {
      OR: [
        { email: { contains: search, mode: "insensitive" as const } },
        { name: { contains: search, mode: "insensitive" as const } },
        { id: !isNaN(parseInt(search)) ? parseInt(search) : undefined },
      ].filter((condition) => {
        if ("id" in condition) return condition.id !== undefined;
        return true;
      }),
    }),
    ...(role && { role }),
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
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

  return {
    users,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export interface UserDetail {
  id: number;
  auth_id: string;
  email: string;
  name: string | null;
  image: string | null;
  phone: string | null;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
  _count: {
    product_orders: number;
    event_registrations: number;
    wishlists: number;
    carts: number;
    reviews: number;
  };
}

export async function getUserById(userId: number): Promise<UserDetail | null> {
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

  return user;
}

export interface UpdateUserRoleResult {
  success: boolean;
  error?: string;
}

export async function updateUserRole(
  userId: number,
  newRole: UserRole,
): Promise<UpdateUserRoleResult> {
  const adminUser = await requireAdminUser();

  // Prevent admin from demoting themselves
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
    return { success: true }; // No change needed
  }

  // Update Prisma user role
  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });

  // Sync with Clerk publicMetadata
  try {
    const clerk = await clerkClient();
    await clerk.users.updateUserMetadata(user.auth_id, {
      publicMetadata: {
        role: newRole,
      },
    });
  } catch (error) {
    // Rollback Prisma update if Clerk sync fails
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

  revalidatePath("/dashboard/users");
  revalidatePath(`/dashboard/users/${userId}`);

  return { success: true };
}

// User orders for Kanban board
export interface UserOrder {
  id: string;
  status: string;
  total: number;
  subtotal: number;
  discount: number;
  shipping_fee: number;
  created_at: Date;
  request_at: Date | null;
  approved_at: Date | null;
  paid_at: Date | null;
  shipped_at: Date | null;
  delivered_at: Date | null;
  cancelled_at: Date | null;
  returned_at: Date | null;
  refunded_at: Date | null;
  ordered_products: {
    id: number;
    quantity: number;
    price: number;
    discount: number;
    product: {
      id: number;
      name: string;
      slug: string;
      image_urls: string[];
    };
  }[];
}

export async function getUserOrders(userId: number): Promise<UserOrder[]> {
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

  return orders;
}

// User registrations for Kanban board
export interface UserRegistration {
  id: string;
  status: string;
  seats_reserved: number;
  price: number;
  discount: number;
  created_at: Date;
  request_at: Date | null;
  approved_at: Date | null;
  paid_at: Date | null;
  confirmed_at: Date | null;
  cancelled_at: Date | null;
  event: {
    id: string;
    title: string;
    slug: string;
    starts_at: Date;
    ends_at: Date;
    location: string;
    image: string;
    price: number;
  };
}

export async function getUserRegistrations(
  userId: number,
): Promise<UserRegistration[]> {
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

  return registrations;
}

// User cart items
export interface UserCartItem {
  id: number;
  quantity: number;
  created_at: Date;
  product: {
    id: number;
    name: string;
    slug: string;
    price: number;
    available_quantity: number;
    image_urls: string[];
  };
}

export async function getUserCart(userId: number): Promise<UserCartItem[]> {
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

  return cartItems;
}

// User wishlist items
export interface UserWishlistItem {
  id: number;
  created_at: Date;
  product: {
    id: number;
    name: string;
    slug: string;
    price: number;
    available_quantity: number;
    image_urls: string[];
  };
}

export async function getUserWishlist(
  userId: number,
): Promise<UserWishlistItem[]> {
  await requireAdmin();

  const wishlistItems = await prisma.wishlist.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
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
  });

  return wishlistItems;
}

// Paginated user wishlist
export interface GetUserWishlistParams {
  userId: number;
  page?: number;
  limit?: number;
}

export interface GetUserWishlistResult {
  data: UserWishlistItem[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getUserWishlistPaginated(
  params: GetUserWishlistParams,
): Promise<GetUserWishlistResult> {
  await requireAdmin();

  const { userId, page = 1, limit = 12 } = params;
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
    data: wishlistItems,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
