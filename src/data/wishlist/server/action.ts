"use server";

import { getAuthenticatedUserId } from "@/actions/auth.action";
import { DEFAULT_PAGE_SIZE } from "@/consts/performance";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import type {
  ToggleWishlistResponse,
  WishlistItem,
  WishlistMutationResponse,
  WishlistResponse,
} from "@/graphql/generated/types";
import { ToggleAction } from "@/graphql/generated/types";

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
  reviews?: { rating: number }[];
}) {
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
    price: product.price,
    image_urls: product.image_urls,
    reviews_count: reviewsCount,
    avg_rating: avgRating,
    material: product.material,
    in_wishlist: true,
    available_quantity: product.available_quantity,
    total_quantity: product.total_quantity,
    color_code: product.color_code,
    color_name: product.color_name,
  };
}

function mapToWishlistItem(item: {
  id: number;
  user_id: number;
  product_id: number;
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
}): WishlistItem {
  return {
    id: item.id,
    user_id: item.user_id,
    product_id: item.product_id,
    created_at: item.created_at,
    updated_at: item.updated_at,
    product: mapToProductBase(item.product),
  };
}

export async function getWishlist(
  page: number = 1,
  limit: number = DEFAULT_PAGE_SIZE,
): Promise<WishlistResponse> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { data: [], total: 0, page: 1, total_pages: 0 };
  }

  const [items, total] = await Promise.all([
    prisma.wishlist.findMany({
      where: { user_id: userId },
      include: {
        product: {
          include: { product_categories: true },
        },
      },
      orderBy: [
        { product: { available_quantity: "desc" } },
        { created_at: "desc" },
      ],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.wishlist.count({ where: { user_id: userId } }),
  ]);

  return {
    data: items.map(mapToWishlistItem),
    total,
    page,
    total_pages: Math.ceil(total / limit),
  };
}

export async function getWishlistIds(): Promise<number[]> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return [];
  }

  const wishlists = await prisma.wishlist.findMany({
    where: { user_id: userId },
    select: { product_id: true },
  });

  return wishlists.map((w) => w.product_id);
}

export async function getWishlistCount(): Promise<number> {
  const userId = await getAuthenticatedUserId();
  if (!userId) return 0;

  return prisma.wishlist.count({ where: { user_id: userId } });
}

export async function addToWishlist(
  productId: number,
): Promise<WishlistMutationResponse> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, item: null };
  }

  try {
    const item = await prisma.wishlist.create({
      data: { user_id: userId, product_id: productId },
      include: {
        product: {
          include: { product_categories: true },
        },
      },
    });

    revalidatePath("/wishlist");
    revalidatePath("/products");
    return {
      success: true,
      item: mapToWishlistItem(item),
    };
  } catch (error) {
    console.error("Failed to add to wishlist:", error);
    return { success: false, item: null };
  }
}

export async function removeFromWishlist(productId: number): Promise<boolean> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return false;
  }

  try {
    await prisma.wishlist.delete({
      where: { user_id_product_id: { user_id: userId, product_id: productId } },
    });
    revalidatePath("/wishlist");
    revalidatePath("/products");
    return true;
  } catch (error) {
    console.error("Failed to remove from wishlist:", error);
    return false;
  }
}

export async function toggleWishlist(
  productId: number,
): Promise<ToggleWishlistResponse> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, action: ToggleAction.Removed, item: null };
  }

  try {
    const existing = await prisma.wishlist.findUnique({
      where: { user_id_product_id: { user_id: userId, product_id: productId } },
    });

    if (existing) {
      await prisma.wishlist.delete({ where: { id: existing.id } });
      revalidatePath("/wishlist");
      revalidatePath("/products");
      return { success: true, action: ToggleAction.Removed, item: null };
    }

    await prisma.wishlist.create({
      data: { user_id: userId, product_id: productId },
    });
    revalidatePath("/wishlist");
    revalidatePath("/products");
    return { success: true, action: ToggleAction.Added, item: null };
  } catch (error) {
    console.error("Failed to toggle wishlist:", error);
    return { success: false, action: ToggleAction.Removed, item: null };
  }
}

export async function moveToCart(productId: number): Promise<boolean> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return false;
  }

  try {
    await prisma.$transaction([
      prisma.cart.upsert({
        where: {
          user_id_product_id: { user_id: userId, product_id: productId },
        },
        update: { quantity: { increment: 1 } },
        create: { user_id: userId, product_id: productId, quantity: 1 },
      }),
      prisma.wishlist.delete({
        where: {
          user_id_product_id: { user_id: userId, product_id: productId },
        },
      }),
    ]);
    revalidatePath("/wishlist");
    revalidatePath("/cart");
    return true;
  } catch (error) {
    console.error("Failed to move to cart:", error);
    return false;
  }
}
