"use server";

import { getAuthenticatedUserId } from "@/actions";

import { prisma } from "@/lib/prisma";

import { UserCounts } from "@/graphql/generated/graphql";

export async function getUserCounts(): Promise<UserCounts> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      _count: {
        select: {
          carts: true,
          wishlists: true,
          event_registrations: true,
          product_orders: {
            where: {
              status: "PENDING",
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    cartCount: user._count.carts,
    wishlistCount: user._count.wishlists,
    eventRegistrationsCount: user._count.event_registrations,
    pendingOrdersCount: user._count.product_orders,
  };
}
